import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const KAVYALENS_SYSTEM_INSTRUCTION = `You are KāvyaLens, an evidence-oriented research assistant specializing in Sanskrit Kāvya, Sanskrit literary criticism, and classical Indian poetics (Kāvyashāstra).

YOUR MISSION:
Analyze any Sanskrit poetic passage supplied by the user within 3-5 seconds. Distinguish textual facts, plausible interpretations, traditional theory, and uncertainty.

CRITICAL RULES:
1. Never invent quotations, references, authors, verse numbers, or source verification. If the author or text is uncertain, state it as "indeterminate" or "unverified".
2. Do not force a rasa or alaṅkāra label onto every verse. If the verse is gnomic (nīti), descriptive (svabhāvokti), or fragmentary, explicitly state that rasa is latent, not realized, or not applicable.
3. Distinguish explicit text from inference. Clearly separate what is verbally uttered (vācya) from secondary implication (lakṣya) or suggested resonance (vyaṅgya).
4. State uncertainty and missing context honestly.
5. Provide concise, high-density academic analysis without verbose conversational preamble.
6. Support 3 output languages strictly as requested: 'sa' (Sanskrit), 'hi' (Hindi), 'en' (English).

CONFIDENCE LEVELS:
Use ONLY these qualitative labels: "strongly supported", "plausible", "tentative", "indeterminate".`;

// Robust Gemini Content Generator with Exponential Backoff & Model Fallback
async function generateWithRetry(options: { contents: string; config?: any }, maxRetries = 2) {
  const models = ['gemini-3.8-flash', 'gemini-flash-latest'];
  let lastError: any = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: options.contents,
          config: options.config,
        });
        return response;
      } catch (err: any) {
        lastError = err;
        const msg = String(err?.message || '');
        const isTransient = msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('429') || msg.includes('high demand');
        console.warn(`[Gemini Request] Attempt ${attempt} on model ${model} failed:`, msg);

        if (isTransient && attempt < maxRetries) {
          await new Promise((r) => setTimeout(r, 800 * attempt));
        } else {
          break; // try next fallback model
        }
      }
    }
  }
  throw lastError;
}

// API Endpoint: Analyze Sanskrit Passage
app.post('/api/analyze-verse', async (req: Request, res: Response) => {
  try {
    const { text, language = 'en', traditionFocus, meterHint, metadata } = req.body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return res.status(400).json({ error: 'Sanskrit passage text is required.' });
    }

    let langDirective = 'Output all analytical prose, explanations, translations, and summaries in scholarly, precise English.';
    if (language === 'hi') {
      langDirective = 'Output all analytical prose, explanations, translations, and summaries in clear, scholarly Hindi (शास्त्रीय हिन्दी).';
    } else if (language === 'sa') {
      langDirective = 'Output all analytical prose, explanations, translations, and summaries in classical Sanskrit (शुद्ध-शास्त्रीय-संस्कृतभाषा). Keep explanations clear, elegant, and traditional (टीका-शैली).';
    }

    const traditionDirective = traditionFocus 
      ? `Pay special attention to theoretical views from the ${traditionFocus} tradition.` 
      : 'Present balanced views from foundational authorities (Dhvanyāloka, Kāvyaprakāśa, Sāhityadarpaṇa, Rasagaṅgādhara).';

    const metadataDirective = metadata && (metadata.work || metadata.author)
      ? `User provided locus metadata: Work: ${metadata.work || 'N/A'}, Author: ${metadata.author || 'N/A'}, Canto: ${metadata.canto || 'N/A'}, Verse: ${metadata.verseNumber || 'N/A'}, Edition: ${metadata.sourceEdition || 'N/A'}. Verify if consistent.`
      : '';

    const meterDirective = meterHint ? `Meter hint provided: ${meterHint}. Verify against syllables.` : '';

    const prompt = `Analyze the following Sanskrit passage according to the KāvyaLens scholarly protocol:

PASSAGE:
"""
${text.trim()}
"""

DIRECTIVES:
- ${langDirective}
- ${traditionDirective}
- ${metadataDirective}
- ${meterDirective}
- Apply qualitative confidence labels ("strongly supported", "plausible", "tentative", "indeterminate").
- If the passage is didactic or non-sentimental, DO NOT FORCE A RASA. Explicitly note why rasa is latent or not applicable.
- Return exclusively valid JSON conforming to the requested schema.`;

    const response = await generateWithRetry({
      contents: prompt,
      config: {
        systemInstruction: KAVYALENS_SYSTEM_INSTRUCTION,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            inputSanskrit: { type: Type.STRING },
            transliterationIAST: { type: Type.STRING },
            meterAnalysis: {
              type: Type.OBJECT,
              properties: {
                identifiedMeter: { type: Type.STRING },
                meterFamily: { type: Type.STRING },
                syllableCountPerPada: { type: Type.STRING },
                laghuGuruPattern: { type: Type.STRING },
                ganaBreakdown: { type: Type.STRING },
                yantiOrCaesuraNotes: { type: Type.STRING },
                confidence: { 
                  type: Type.STRING,
                  description: "Must be 'strongly supported', 'plausible', 'tentative', or 'indeterminate'"
                }
              },
              required: ["identifiedMeter", "syllableCountPerPada", "confidence"]
            },
            grammaticalObservations: {
              type: Type.OBJECT,
              properties: {
                padaccheda: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                anvaya: { type: Type.STRING },
                compounds: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      compound: { type: Type.STRING },
                      vigraha: { type: Type.STRING },
                      type: { type: Type.STRING },
                      meaning: { type: Type.STRING }
                    },
                    required: ["compound", "vigraha", "type", "meaning"]
                  }
                },
                grammaticalUnits: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      token: { type: Type.STRING },
                      padaccheda: { type: Type.STRING },
                      grammaticalAnalysis: { type: Type.STRING },
                      meaning: { type: Type.STRING }
                    },
                    required: ["token", "padaccheda", "grammaticalAnalysis", "meaning"]
                  }
                },
                syntaxNotes: { type: Type.STRING }
              },
              required: ["padaccheda", "anvaya", "compounds", "grammaticalUnits", "syntaxNotes"]
            },
            literalMeaning: {
              type: Type.OBJECT,
              properties: {
                wordByWordSummary: { type: Type.STRING },
                padartha: { type: Type.STRING }
              },
              required: ["wordByWordSummary", "padartha"]
            },
            interpretiveMeaning: {
              type: Type.OBJECT,
              properties: {
                bhavartha: { type: Type.STRING },
                poeticResonance: { type: Type.STRING }
              },
              required: ["bhavartha", "poeticResonance"]
            },
            alankaraCandidates: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  nameSanskrit: { type: Type.STRING },
                  shastraReference: { type: Type.STRING },
                  textualEvidence: { type: Type.STRING },
                  reasoning: { type: Type.STRING },
                  counterArgumentsOrAlternatives: { type: Type.STRING },
                  confidence: { type: Type.STRING }
                },
                required: ["name", "nameSanskrit", "textualEvidence", "reasoning", "counterArgumentsOrAlternatives", "confidence"]
              }
            },
            rasaAnalysis: {
              type: Type.OBJECT,
              properties: {
                primaryRasa: { type: Type.STRING },
                sthayibhava: { type: Type.STRING },
                realizationStatus: { 
                  type: Type.STRING,
                  description: "One of 'depicted emotion', 'aesthetic realization (rasa)', 'latent / indeterminate', 'not applicable (didactic / descriptive)'"
                },
                vibhava: {
                  type: Type.OBJECT,
                  properties: {
                    alambana: { type: Type.STRING },
                    uddipana: { type: Type.STRING }
                  },
                  required: ["alambana", "uddipana"]
                },
                anubhava: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                vyabhicaribhava: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                rasaDhvaniPresent: { type: Type.BOOLEAN },
                justificationAndCaution: { type: Type.STRING },
                confidence: { type: Type.STRING }
              },
              required: ["primaryRasa", "sthayibhava", "realizationStatus", "vibhava", "anubhava", "vyabhicaribhava", "rasaDhvaniPresent", "justificationAndCaution", "confidence"]
            },
            dhvaniFeature: {
              type: Type.OBJECT,
              properties: {
                category: { type: Type.STRING },
                vacyartha: { type: Type.STRING },
                vyangyartha: { type: Type.STRING },
                mechanism: { type: Type.STRING },
                scholasticDispute: { type: Type.STRING },
                confidence: { type: Type.STRING }
              },
              required: ["category", "vacyartha", "vyangyartha", "mechanism", "confidence"]
            },
            poeticDimension: {
              type: Type.OBJECT,
              properties: {
                guna: { type: Type.STRING },
                riti: { type: Type.STRING },
                vakroktiAspect: { type: Type.STRING },
                aucityaCompliance: { type: Type.STRING },
                doshaEvaluation: { type: Type.STRING }
              },
              required: ["guna", "riti"]
            },
            alternativeReadings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  variantText: { type: Type.STRING },
                  variantType: { type: Type.STRING },
                  readingExplanation: { type: Type.STRING },
                  traditionOrCommentators: { type: Type.STRING }
                },
                required: ["variantType", "readingExplanation", "traditionOrCommentators"]
              }
            },
            sourceVerification: {
              type: Type.OBJECT,
              properties: {
                status: { type: Type.STRING },
                workIdentified: { type: Type.STRING },
                author: { type: Type.STRING },
                cantoOrActAndVerse: { type: Type.STRING },
                sourceCertaintyNotes: { type: Type.STRING },
                isCanonicallyConfirmed: { type: Type.BOOLEAN }
              },
              required: ["status", "workIdentified", "author", "sourceCertaintyNotes", "isCanonicallyConfirmed"]
            },
            researchSummary: {
              type: Type.OBJECT,
              properties: {
                strongestInterpretation: { type: Type.STRING },
                mostUncertainClaim: { type: Type.STRING },
                furtherResearchQuestion: { type: Type.STRING },
                claimsRequiringExpertReview: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              },
              required: ["strongestInterpretation", "mostUncertainClaim", "furtherResearchQuestion", "claimsRequiringExpertReview"]
            },
            evidenceItems: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  claim: { type: Type.STRING },
                  exactTextSpan: { type: Type.STRING },
                  connectionExplanation: { type: Type.STRING },
                  supportingSource: { type: Type.STRING },
                  isVerifiedSource: { type: Type.BOOLEAN },
                  alternativeInterpretation: { type: Type.STRING },
                  confidence: { type: Type.STRING },
                  humanReviewStatus: { type: Type.STRING }
                },
                required: ["id", "claim", "exactTextSpan", "connectionExplanation", "confidence", "humanReviewStatus"]
              }
            },
            epistemicAudit: {
              type: Type.OBJECT,
              properties: {
                unverifiedRecallFlag: { type: Type.BOOLEAN },
                avoidedForcedLabels: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                explicitVersusInferredDistinction: { type: Type.STRING }
              },
              required: ["unverifiedRecallFlag", "avoidedForcedLabels", "explicitVersusInferredDistinction"]
            },
            multilingualPacks: {
              type: Type.OBJECT,
              properties: {
                sa: {
                  type: Type.OBJECT,
                  properties: {
                    padartha: { type: Type.STRING },
                    bhavartha: { type: Type.STRING },
                    poeticResonance: { type: Type.STRING },
                    strongestInterpretation: { type: Type.STRING }
                  },
                  required: ["padartha", "bhavartha"]
                },
                hi: {
                  type: Type.OBJECT,
                  properties: {
                    padartha: { type: Type.STRING },
                    bhavartha: { type: Type.STRING },
                    poeticResonance: { type: Type.STRING },
                    strongestInterpretation: { type: Type.STRING }
                  },
                  required: ["padartha", "bhavartha"]
                },
                en: {
                  type: Type.OBJECT,
                  properties: {
                    padartha: { type: Type.STRING },
                    bhavartha: { type: Type.STRING },
                    poeticResonance: { type: Type.STRING },
                    strongestInterpretation: { type: Type.STRING }
                  },
                  required: ["padartha", "bhavartha"]
                }
              },
              required: ["sa", "hi", "en"]
            }
          },
          required: [
            "inputSanskrit",
            "transliterationIAST",
            "meterAnalysis",
            "grammaticalObservations",
            "literalMeaning",
            "interpretiveMeaning",
            "alankaraCandidates",
            "rasaAnalysis",
            "dhvaniFeature",
            "poeticDimension",
            "alternativeReadings",
            "sourceVerification",
            "researchSummary",
            "epistemicAudit"
          ]
        }
      }
    });

    let textOutput = response.text || '';
    if (!textOutput) {
      throw new Error('Empty response from model.');
    }

    textOutput = textOutput.replace(/```(?:json)?\s*/gi, '').replace(/```\s*$/gi, '').trim();
    const firstBrace = textOutput.indexOf('{');
    const lastBrace = textOutput.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      textOutput = textOutput.substring(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(textOutput);
    parsed.id = 'kavya-' + Date.now();
    parsed.timestamp = Date.now();
    parsed.language = language;

    // Helper to generate a language clone for instant switching
    function createLanguageVariant(base: any, targetLang: 'sa' | 'hi' | 'en') {
      const pack = base.multilingualPacks?.[targetLang];
      const clone = JSON.parse(JSON.stringify(base));
      clone.language = targetLang;
      if (pack) {
        if (pack.padartha) clone.literalMeaning.padartha = pack.padartha;
        if (pack.bhavartha) clone.interpretiveMeaning.bhavartha = pack.bhavartha;
        if (pack.poeticResonance) clone.interpretiveMeaning.poeticResonance = pack.poeticResonance;
        if (pack.strongestInterpretation) clone.researchSummary.strongestInterpretation = pack.strongestInterpretation;
      }
      return clone;
    }

    const store: Record<string, any> = {
      sa: createLanguageVariant(parsed, 'sa'),
      hi: createLanguageVariant(parsed, 'hi'),
      en: createLanguageVariant(parsed, 'en'),
    };

    store.sa.multilingualStore = store;
    store.hi.multilingualStore = store;
    store.en.multilingualStore = store;
    parsed.multilingualStore = store;

    return res.json(parsed);
  } catch (error: any) {
    console.error('Error during KāvyaLens analysis:', error);
    return res.status(500).json({
      error: 'Failed to complete Sanskrit poetics analysis.',
      details: 'शास्त्रीय विश्लेषण प्रक्रिया में बाधा उत्पन्न हुई। कृपया पुनः प्रयास करें।'
    });
  }
});

// API Endpoint: Follow-up Scholarly Inquiry
app.post('/api/scholarly-inquiry', async (req: Request, res: Response) => {
  try {
    const { verseText, currentAnalysis, question, language = 'en' } = req.body;

    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Question is required.' });
    }

    let langInstruction = 'Respond in clear, scholarly English.';
    if (language === 'hi') {
      langInstruction = 'Respond in clear, scholarly Hindi (शास्त्रीय हिन्दी).';
    } else if (language === 'sa') {
      langInstruction = 'Respond in classical Sanskrit (शुद्ध-शास्त्रीय-संस्कृतभाषा).';
    }

    const prompt = `You are KāvyaLens, an evidence-oriented classical Sanskrit literary critic.
A researcher is inquiring about the following verse and current analysis:

VERSE:
"""
${verseText || currentAnalysis?.inputSanskrit || ''}
"""

CURRENT RESEARCH CONTEXT:
Meter: ${currentAnalysis?.meterAnalysis?.identifiedMeter || 'Not specified'}
Source: ${currentAnalysis?.sourceVerification?.workIdentified || 'Unknown'} (${currentAnalysis?.sourceVerification?.author || 'Unknown'})
Rasa Realization: ${currentAnalysis?.rasaAnalysis?.primaryRasa || 'N/A'} (${currentAnalysis?.rasaAnalysis?.realizationStatus || 'N/A'})
Strongest Interpretation: ${currentAnalysis?.researchSummary?.strongestInterpretation || 'N/A'}

SCHOLAR QUESTION:
"""
${question.trim()}
"""

RULES:
1. Address the specific question directly using Kāvyashāstra methodology (Kāvyaprakāśa, Dhvanyāloka, Sāhityadarpaṇa, Vyākaraṇa).
2. Distinguish explicit grammatical text from interpretive inference.
3. If an attribution or commentary reference cannot be verified, state uncertainty clearly.
4. Use qualitative confidence labels where appropriate (strongly supported, plausible, tentative, indeterminate).
5. ${langInstruction}`;

    const response = await generateWithRetry({
      contents: prompt,
      config: {
        systemInstruction: KAVYALENS_SYSTEM_INSTRUCTION,
      }
    });

    const answer = response.text || 'No answer generated.';
    return res.json({ answer });
  } catch (error: any) {
    console.error('Error in scholarly inquiry:', error);
    return res.status(500).json({
      error: 'Failed to process inquiry.',
      details: error?.message || 'Unknown server error.'
    });
  }
});

// API Endpoint: Extract Sanskrit Shloka from Uploaded Image (OCR)
app.post('/api/extract-verse-image', async (req: Request, res: Response) => {
  try {
    const { imageBase64, mimeType = 'image/jpeg' } = req.body;

    if (!imageBase64 || typeof imageBase64 !== 'string') {
      return res.status(400).json({ error: 'Image base64 data is required.' });
    }

    // Strip data URL prefix if present
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');

    const prompt = `You are an expert Sanskrit epigraphist, pandit, and scholar of Sanskrit poetics (Kāvyashāstra).
Carefully inspect this image and extract any Sanskrit shloka (verse), mantra, or passage present in it.
Transcribe it into clear, pristine Devanagari script.

RULES:
1. Ensure precise Devanagari characters, including anusvara (ं), visarga (ः), conjunct consonants (संयुक्ताक्षर), halanta/virama (्), and danda (। / ॥).
2. If the text in the image is in Roman/IAST, Grantha, Bengali, or printed/handwritten script, transcribe it accurately into classical Devanagari Sanskrit.
3. If there is surrounding text, chapter headings, or commentary, isolate and extract the primary Sanskrit verse/shloka.
4. Format into appropriate 2-line or 4-line verse structure with line breaks.
5. Return ONLY a valid JSON object matching this schema:
{
  "extractedText": "The transcribed Sanskrit shloka in Devanagari",
  "transliterationIAST": "IAST Roman transliteration",
  "estimatedMeter": "Probable Sanskrit meter (e.g., Anuṣṭup, Indravajrā, Vasantatilakā, etc.)",
  "confidence": "strongly supported | plausible | tentative | indeterminate",
  "notes": "Short note about transcription fidelity or clarity"
}`;

    const models = ['gemini-3.8-flash', 'gemini-flash-latest'];
    let lastError: any = null;
    let response: any = null;

    for (const model of models) {
      try {
        response = await ai.models.generateContent({
          model,
          contents: [
            {
              inlineData: {
                data: cleanBase64,
                mimeType: mimeType || 'image/jpeg',
              },
            },
            {
              text: prompt,
            },
          ],
          config: {
            responseMimeType: 'application/json',
          },
        });
        if (response?.text) break;
      } catch (err: any) {
        lastError = err;
        console.warn(`[OCR Extraction] Model ${model} failed:`, err?.message);
      }
    }

    if (!response?.text) {
      throw lastError || new Error('No response from vision model.');
    }

    let textOutput = response.text.replace(/```(?:json)?\s*/gi, '').replace(/```\s*$/gi, '').trim();
    const firstBrace = textOutput.indexOf('{');
    const lastBrace = textOutput.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1) {
      textOutput = textOutput.substring(firstBrace, lastBrace + 1);
    }

    const parsed = JSON.parse(textOutput);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Error during image shloka extraction:', error);
    return res.status(500).json({
      error: 'Failed to extract Sanskrit verse from image.',
      details: error?.message || 'चित्रात् श्लोकोद्धारे त्रुटिः संजाता।'
    });
  }
});

// Mount Vite or serve static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    app.use('*', async (req: Request, res: Response, next) => {
      if (req.originalUrl.startsWith('/api')) {
        return next();
      }
      try {
        const url = req.originalUrl;
        const indexPath = path.resolve(__dirname, 'index.html');
        let template = fs.readFileSync(indexPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KāvyaLens server listening on port ${PORT}`);
  });
}

startServer();
