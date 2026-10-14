// Sanskrit Prosody and Transliteration Utilities

export interface ScannedSyllable {
  syllable: string;
  weight: 'L' | 'G'; // Laghu or Guru
}

export interface MetricPatternResult {
  padas: ScannedSyllable[][];
  syllableCounts: number[];
  identifiedMeter: string;
  meterNotes: string;
}

// Classical Sanskrit Meter Signatures (in Gana patterns or L/G patterns)
// L = Laghu (light, 1 mātrā), G = Guru (heavy, 2 mātrās)
const KNOWN_METERS: { name: string; syllablesPerPada: number; patternFragment: string; note: string }[] = [
  {
    name: 'Mandākrāntā',
    syllablesPerPada: 17,
    patternFragment: 'GGGGLLLLLLGGLLGG', // ma, bha, na, ta, ta, ga, ga
    note: '17 syllables per pada (caesura at 4th, 10th, and 17th syllables). Signature of Meghadūta.'
  },
  {
    name: 'Śārdūlavikrīḍita',
    syllablesPerPada: 19,
    patternFragment: 'GGGLLGLLGLLGG', // ma, sa, ja, sa, ta, ta, ga
    note: '19 syllables per pada (caesura at 12th and 19th syllables). Majestic, resonant classical meter.'
  },
  {
    name: 'Vasantatilakā',
    syllablesPerPada: 14,
    patternFragment: 'GGLGLLLGLLGLGG', // ta, bha, ja, ja, ga, ga
    note: '14 syllables per pada (caesura at 8th and 14th). Flowing, lyrical meter.'
  },
  {
    name: 'Vaṁśastha',
    syllablesPerPada: 12,
    patternFragment: 'LGLGLLGLGLGL', // ja, ta, ja, ra
    note: '12 syllables per pada. Characteristic meter of Bhāravi and Magha cantos.'
  },
  {
    name: 'Śikhariṇī',
    syllablesPerPada: 17,
    patternFragment: 'LGGGGLLLLLLGGLLLG', // ya, ma, na, sa, bha, la, ga
    note: '17 syllables per pada (caesura at 6th and 17th syllables). Expressive, elevated meter.'
  },
  {
    name: 'Mālinī',
    syllablesPerPada: 15,
    patternFragment: 'LLLLLLGGGGLGG', // na, na, ma, ya, ya
    note: '15 syllables per pada (caesura at 8th and 15th syllables).'
  },
  {
    name: 'Upajāti (Indravajrā / Upendravajrā mixture)',
    syllablesPerPada: 11,
    patternFragment: 'GLGLGL', // 11 syllables
    note: '11 syllables per pada. Common in epic, gnomic, and narrative Kāvya.'
  },
  {
    name: 'Anuṣṭubh (Śloka)',
    syllablesPerPada: 8,
    patternFragment: 'LLLL', // 8 syllables per pada, with 5th laghu, 6th guru, 7th laghu/guru
    note: '8 syllables per pada (32 total). The universal vehicle of epic and philosophical verse.'
  },
  {
    name: 'Drutavilambita',
    syllablesPerPada: 12,
    patternFragment: 'LLLGLLGLLGLG', // na, bha, bha, ra
    note: '12 syllables per pada.'
  }
];

// Determine syllable weights for Sanskrit (Devanagari or Romanized)
export function scanSanskritMeter(rawText: string): MetricPatternResult {
  const lines = rawText
    .split(/[\n।॥|]+/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  const padas: ScannedSyllable[][] = [];
  const syllableCounts: number[] = [];

  for (const line of lines) {
    // Basic syllabification approximation
    const cleaned = line.replace(/[^a-zA-Z\u0900-\u097F]/g, ' ').replace(/\s+/g, ' ').trim();
    if (!cleaned) continue;

    // Detect if Devanagari or Roman
    const isDevanagari = /[\u0900-\u097F]/.test(cleaned);
    let syllables: ScannedSyllable[] = [];

    if (isDevanagari) {
      syllables = scanDevanagariLine(cleaned);
    } else {
      syllables = scanRomanLine(cleaned);
    }

    if (syllables.length > 0) {
      padas.push(syllables);
      syllableCounts.push(syllables.length);
    }
  }

  // Attempt identification based on average syllable count
  const avgCount = syllableCounts.length > 0 
    ? Math.round(syllableCounts.reduce((a, b) => a + b, 0) / syllableCounts.length) 
    : 0;

  let identifiedMeter = 'Indeterminate / Free Meter';
  let meterNotes = 'Syllable distribution does not uniquely match a single canonical vṛtta signature without further textual alignment.';

  if (avgCount === 17) {
    // Check first syllable weight of first pada if available
    const firstWeight = padas[0]?.[0]?.weight;
    if (firstWeight === 'G') {
      identifiedMeter = 'Mandākrāntā';
      meterNotes = '17 syllables per quarter with opening heavy syllables (ma-gaṇa). Caesura at 4th and 10th syllables.';
    } else {
      identifiedMeter = 'Śikhariṇī or Mandākrāntā variant';
      meterNotes = '17 syllables per quarter with light opening syllable (ya-gaṇa candidate).';
    }
  } else if (avgCount === 19) {
    identifiedMeter = 'Śārdūlavikrīḍita';
    meterNotes = '19 syllables per quarter. Opens with three heavy syllables (ma-gaṇa). Caesura at 12th.';
  } else if (avgCount === 14) {
    identifiedMeter = 'Vasantatilakā';
    meterNotes = '14 syllables per quarter. ta-bha-ja-ja-ga-ga schema.';
  } else if (avgCount === 12) {
    identifiedMeter = 'Vaṁśastha or Drutavilambita';
    meterNotes = '12 syllables per quarter. Characteristic of Jagatī class meters.';
  } else if (avgCount === 11) {
    identifiedMeter = 'Upajāti (Indravajrā / Upendravajrā)';
    meterNotes = '11 syllables per quarter (Triṣṭubh family).';
  } else if (avgCount === 15) {
    identifiedMeter = 'Mālinī';
    meterNotes = '15 syllables per quarter (Atiśakvarī family), 8+7 caesura.';
  } else if (avgCount === 8) {
    identifiedMeter = 'Anuṣṭubh (Śloka)';
    meterNotes = '8 syllables per quarter (32 syllables per complete verse).';
  }

  return {
    padas,
    syllableCounts,
    identifiedMeter,
    meterNotes
  };
}

function scanDevanagariLine(text: string): ScannedSyllable[] {
  // Approximate vowel markers
  const vowels = ['\u0905', '\u0906', '\u0907', '\u0908', '\u0909', '\u090A', '\u090B', '\u090F', '\u0910', '\u0913', '\u0914'];
  const matras = ['\u093E', '\u093F', '\u0940', '\u0941', '\u0942', '\u0943', '\u0947', '\u0948', '\u094B', '\u094C'];
  const longMatras = ['\u093E', '\u0940', '\u0942', '\u0947', '\u0948', '\u094B', '\u094C'];
  const anusvara = '\u0902';
  const visarga = '\u0903';
  const virama = '\u094D';

  const chars = Array.from(text);
  const result: ScannedSyllable[] = [];

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i];
    if (ch === ' ' || ch === '।') continue;

    // Check if vowel or consonant
    const isVowelChar = vowels.includes(ch);
    const isMatra = matras.includes(ch);
    const isConsonant = ch >= '\u0915' && ch <= '\u0939';

    if (isVowelChar || isConsonant) {
      let nextMatra = (i + 1 < chars.length) ? chars[i + 1] : '';
      let isLong = false;

      if (isVowelChar) {
        isLong = ['\u0906', '\u0908', '\u090A', '\u090F', '\u0910', '\u0913', '\u0914'].includes(ch);
      } else if (longMatras.includes(nextMatra)) {
        isLong = true;
      }

      // Check following conjunct or anusvara / visarga
      let lookahead = i + 1;
      while (lookahead < chars.length && (matras.includes(chars[lookahead]) || chars[lookahead] === virama)) {
        if (chars[lookahead] === anusvara || chars[lookahead] === visarga) {
          isLong = true;
        }
        lookahead++;
      }

      result.push({
        syllable: ch + (isMatra ? nextMatra : ''),
        weight: isLong ? 'G' : 'L'
      });
    }
  }

  return result;
}

function scanRomanLine(text: string): ScannedSyllable[] {
  // Approximate Roman IAST syllabification
  const words = text.split(/\s+/);
  const result: ScannedSyllable[] = [];

  const longVowels = ['ā', 'ī', 'ū', 'ṝ', 'e', 'ai', 'o', 'au', 'A', 'I', 'U', 'E', 'O'];
  const shortVowels = ['a', 'i', 'u', 'ṛ', 'ḷ'];

  for (const word of words) {
    if (!word) continue;
    // split by vowels
    const regex = /([bcdfghjklmnpqrstvwxyzśṣñṅṇṭḍ]*[aāiīuūṛṝḷeaiouAĀIĪUŪṚṜEAI OUṃḥmḥṅñṇnm]*)/gi;
    const matches = word.match(regex);
    if (matches) {
      for (const m of matches) {
        if (!m || !/[aāiīuūṛṝḷeaiouAĀIĪUŪṚṜEAI OU]/i.test(m)) continue;
        const hasLongVowel = longVowels.some(v => m.includes(v));
        const hasAnusvaraOrVisarga = /[ṃḥṁh]/i.test(m);
        result.push({
          syllable: m,
          weight: (hasLongVowel || hasAnusvaraOrVisarga) ? 'G' : 'L'
        });
      }
    }
  }

  return result;
}

// Classical Reference Glossary for tooltips and contextual definitions
export const KAVYASHASTRA_GLOSSARY: Record<string, { term: string; category: string; definition: string; ref: string }> = {
  'upamā': {
    term: 'Upamā (उपमा)',
    category: 'Alaṅkāra (Arthālaṅkāra)',
    definition: 'Simile / poetic resemblance. Requires Upamāna (standard of comparison), Upameya (subject compared), Sādhāraṇadharma (common attribute), and Upamāvācaka (sign of comparison like iva, yathā).',
    ref: 'Kāvyaprakāśa 10.87 / Sāhityadarpaṇa 10.14'
  },
  'rūpaka': {
    term: 'Rūpaka (रूपक)',
    category: 'Alaṅkāra (Arthālaṅkāra)',
    definition: 'Metaphor / poetic identification. Superimposition (adhyāropa) of the upamāna onto the upameya where difference is suppressed.',
    ref: 'Kāvyaprakāśa 10.93'
  },
  'utprekṣā': {
    term: 'Utprekṣā (उत्प्रेक्षा)',
    category: 'Alaṅkāra (Arthālaṅkāra)',
    definition: 'Poetic imagining / fancy. Conceiving the upameya as possibly being the upamāna, marked by words like manye, śaṅke, dhruvam, iva.',
    ref: 'Sāhityadarpaṇa 10.32'
  },
  'arthāntaranyāsa': {
    term: 'Arthāntaranyāsa (अर्थान्तरन्यास)',
    category: 'Alaṅkāra (Arthālaṅkāra)',
    definition: 'Corroboration. Substantiation of a particular statement by a universal truth, or vice-versa.',
    ref: 'Kāvyaprakāśa 10.110'
  },
  'śṛṅgāra': {
    term: 'Śṛṅgāra Rasa (शृङ्गार रस)',
    category: 'Rasa',
    definition: 'The aesthetic sentiment of love/erotic beauty. Sthāyībhāva is Rati (delight). Divided into Sambhoga (love in union) and Vipralambha (love in separation).',
    ref: 'Nāṭyaśāstra 6.45'
  },
  'karuṇa': {
    term: 'Karuṇa Rasa (करुण रस)',
    category: 'Rasa',
    definition: 'The sentiment of pathos and sorrow. Sthāyībhāva is Śoka (grief). Bhavabhūti held it to be the singular primal ground of all rasas.',
    ref: 'Uttararāmacarita 3.47 / Nāṭyaśāstra 6'
  },
  'dhvani': {
    term: 'Dhvani (ध्वनि)',
    category: 'Hermeneutics / Poetics',
    definition: 'Suggested poetic sense (pratīyamāna artha) that transcends the literal (vācya) and metaphorical (lakṣya). Systematized by Ānandavardhana and Abhinavagupta.',
    ref: 'Dhvanyāloka 1.1'
  },
  'vibhāva': {
    term: 'Vibhāva (विभाव)',
    category: 'Rasa Theory',
    definition: 'The causal conditions that evoke emotion: Ālambana (the objective focal anchor/person) and Uddīpana (excitant environment, seasons, settings).',
    ref: 'Nāṭyaśāstra 6'
  },
  'anubhāva': {
    term: 'Anubhāva (अनुभाव)',
    category: 'Rasa Theory',
    definition: 'External bodily expressions, gestures, and reactions through which internal emotion is manifested to the audience.',
    ref: 'Sāhityadarpaṇa 3'
  },
  'vyabhicāribhāva': {
    term: 'Vyabhicāribhāva / Sañcāribhāva (व्यभिचारिभाव)',
    category: 'Rasa Theory',
    definition: 'Transitory emotional states (33 in classical theory) that accompany and intensify the permanent dominant sentiment (sthāyībhāva).',
    ref: 'Nāṭyaśāstra 7'
  },
  'vaidarbhī': {
    term: 'Vaidarbhī Rīti (वैदर्भी रीति)',
    category: 'Poetic Style (Rīti)',
    definition: 'The sweet, limpid style free from harsh conjuncts and long compounds. Associated with Mādhurya and Prasāda guṇas (Kālidāsa\'s hallmark).',
    ref: 'Daṇḍin Kāvyādarśa 1'
  },
  'vakrokti': {
    term: 'Vakrokti (वक्रोक्ति)',
    category: 'Poetics (Kuntaka)',
    definition: 'Indirect, heightened, or artistic expression that deviates from ordinary colloquial speech; regarded by Kuntaka as the life (jīvita) of poetry.',
    ref: 'Vakroktijīvita 1'
  },
  'aucitya': {
    term: 'Aucitya (औचित्य)',
    category: 'Poetics (Kṣemendra)',
    definition: 'Aesthetic propriety and harmony. The life of rasa (aucityaṁ rasasiddhasya sthiraṁ kāvyasya jīvitam).',
    ref: 'Aucityavicāracarcā'
  }
};
