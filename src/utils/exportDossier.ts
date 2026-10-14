import { KavyaAnalysisResult } from '../types/kavya';

export function exportScholarDossierMarkdown(result: KavyaAnalysisResult): string {
  const md = `# KĀVYALENS SCHOLARLY DOSSIER
Generated: ${new Date(result.timestamp).toLocaleDateString()}
Identification: ${result.sourceVerification.workIdentified} (${result.sourceVerification.author})
Source Status: ${result.sourceVerification.status} (Canonical confirmed: ${result.sourceVerification.isCanonicallyConfirmed ? 'Yes' : 'No'})
Locus: ${result.sourceVerification.cantoOrActAndVerse || 'Unspecified'}

---

## 1. ORIGINAL TEXT & PROSODY
**Devanagari:**
\`\`\`
${result.inputSanskrit}
\`\`\`

**IAST Romanization:**
\`\`\`
${result.transliterationIAST}
\`\`\`

**Meter (Chandas):** ${result.meterAnalysis.identifiedMeter}
- Syllables: ${result.meterAnalysis.syllableCountPerPada}
- Metric Confidence: ${result.meterAnalysis.confidence}
- Caesura (Yati): ${result.meterAnalysis.yantiOrCaesuraNotes || 'N/A'}

---

## 2. GRAMMATICAL OBSERVATIONS
**Padaccheda (Lexical Segmentation):**
${result.grammaticalObservations.padaccheda.map(p => `\`${p}\``).join(' · ')}

**Anvaya (Prose Order):**
${result.grammaticalObservations.anvaya}

**Compounds (Samāsa Vigraha):**
${result.grammaticalObservations.compounds.map(c => `- **${c.compound}** (${c.type}): \`${c.vigraha}\` — ${c.meaning}`).join('\n')}

**Syntax & Morphological Notes:**
${result.grammaticalObservations.syntaxNotes}

---

## 3 & 4. MEANINGS
**03. Literal Sense (Padārtha / Vācyārtha):**
${result.literalMeaning.padartha}
*Gloss:* ${result.literalMeaning.wordByWordSummary}

**04. Interpretive Sense (Bhāvārtha):**
${result.interpretiveMeaning.bhavartha}
*Poetic Resonance:* ${result.interpretiveMeaning.poeticResonance}

---

## 5. ALAṄKĀRA EVALUATION
${result.alankaraCandidates.length === 0 ? '_No forced figurative figures asserted._' : result.alankaraCandidates.map(a => `
### ${a.name} (${a.nameSanskrit}) — [${a.confidence.toUpperCase()}]
- **Definition Ref:** ${a.shastraReference || 'Classical Kāvyashāstra'}
- **Textual Evidence:** \`${a.textualEvidence}\`
- **Reasoning:** ${a.reasoning}
- **Counter-Arguments / Alternatives:** ${a.counterArgumentsOrAlternatives}
`).join('\n')}

---

## 6. RASA & BHĀVA MATRIX
- **Realization Category:** ${result.rasaAnalysis.realizationStatus}
- **Primary Rasa:** ${result.rasaAnalysis.primaryRasa} (Sthāyībhāva: ${result.rasaAnalysis.sthayibhava})
- **Rasa-Dhvani Present:** ${result.rasaAnalysis.rasaDhvaniPresent ? 'Yes' : 'No'}
- **Confidence:** ${result.rasaAnalysis.confidence}
- **Vibhāva:** Ālambana: ${result.rasaAnalysis.vibhava.alambana}; Uddīpana: ${result.rasaAnalysis.vibhava.uddipana}
- **Anubhāva:** ${result.rasaAnalysis.anubhava.join(', ') || 'None noted'}
- **Vyabhicāribhāva:** ${result.rasaAnalysis.vyabhicaribhava.join(', ') || 'None noted'}
- **Epistemic Justification:** ${result.rasaAnalysis.justificationAndCaution}

---

## 7 & 8. DHVANI, POETICS & ALTERNATIVE READINGS
**Dhvani Classification:** ${result.dhvaniFeature.category} (${result.dhvaniFeature.confidence})
- Vācyārtha: ${result.dhvaniFeature.vacyartha}
- Vyaṅgyārtha: ${result.dhvaniFeature.vyangyartha}
- Mechanism: ${result.dhvaniFeature.mechanism}

**Poetic Qualities:**
- Guṇa: ${result.poeticDimension.guna}
- Rīti: ${result.poeticDimension.riti}
- Vakrokti: ${result.poeticDimension.vakroktiAspect || 'N/A'}
- Aucitya: ${result.poeticDimension.aucityaCompliance || 'N/A'}

**Alternative Readings / Scholastic Variants:**
${result.alternativeReadings.map(v => `- [${v.variantType}] ${v.readingExplanation} (${v.traditionOrCommentators})`).join('\n') || 'None recorded'}

---

## 9 & 10. EPISTEMIC AUDIT & RESEARCH SUMMARY
- **Explicit vs Inferred Distinction:** ${result.epistemicAudit.explicitVersusInferredDistinction}
- **Avoided Forced Classifications:** ${result.epistemicAudit.avoidedForcedLabels.join(', ') || 'None'}
- **Strongest Interpretation:** ${result.researchSummary.strongestInterpretation}
- **Most Uncertain Claim:** ${result.researchSummary.mostUncertainClaim}
- **Further Research Question:** "${result.researchSummary.furtherResearchQuestion}"
- **Points Requiring Expert Human Verification:**
${result.researchSummary.claimsRequiringExpertReview.map(c => `  - ${c}`).join('\n')}

---
_KāvyaLens — Sanskrit Literary Intelligence Platform. Developed by Amit Kumar AKS._
`;
  return md;
}

export function downloadScholarDossier(result: KavyaAnalysisResult): void {
  const md = exportScholarDossierMarkdown(result);
  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `kavyalens-dossier-${result.id}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
