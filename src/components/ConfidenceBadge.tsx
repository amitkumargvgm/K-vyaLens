import React from 'react';
import { QualitativeConfidence, VerificationStatus } from '../types/kavya';

interface ConfidenceBadgeProps {
  confidence: QualitativeConfidence | string;
  className?: string;
  showPrefix?: boolean;
}

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  confidence,
  className = '',
  showPrefix = true
}) => {
  const norm = (confidence || '').toLowerCase();

  let badgeClass = 'bg-slate-800 text-slate-300 border-slate-700';
  let dotClass = 'bg-slate-400';
  let label = confidence || 'Indeterminate';

  if (norm.includes('strongly')) {
    badgeClass = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    dotClass = 'bg-emerald-400 ring-2 ring-emerald-400/20';
    label = 'Strongly Supported';
  } else if (norm.includes('plausible')) {
    badgeClass = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
    dotClass = 'bg-amber-400 ring-2 ring-amber-400/20';
    label = 'Plausible';
  } else if (norm.includes('tentative')) {
    badgeClass = 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
    dotClass = 'bg-indigo-400 ring-2 ring-indigo-400/20';
    label = 'Tentative';
  } else if (norm.includes('indeterminate') || norm.includes('uncertain')) {
    badgeClass = 'bg-rose-500/10 text-rose-300 border-rose-500/30';
    dotClass = 'bg-rose-400 ring-2 ring-rose-400/20';
    label = 'Indeterminate';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${badgeClass} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} aria-hidden="true" />
      <span>{showPrefix && <span className="opacity-75">Confidence: </span>}{label}</span>
    </span>
  );
};

interface VerificationBadgeProps {
  status: VerificationStatus | string;
  isCanonicallyConfirmed?: boolean;
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status, isCanonicallyConfirmed }) => {
  const norm = (status || '').toLowerCase();

  let badgeClass = 'bg-slate-800 text-slate-300 border-slate-700';
  let dotClass = 'bg-slate-400';
  let label = 'Unknown Status';

  if (norm.includes('verified') || isCanonicallyConfirmed) {
    badgeClass = 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
    dotClass = 'bg-emerald-400 ring-2 ring-emerald-400/20';
    label = 'Verified Canonical Locus';
  } else if (norm.includes('probable')) {
    badgeClass = 'bg-amber-500/10 text-amber-300 border-amber-500/30';
    dotClass = 'bg-amber-400 ring-2 ring-amber-400/20';
    label = 'Probable Attribution';
  } else if (norm.includes('unverified')) {
    badgeClass = 'bg-slate-800 text-slate-400 border-slate-700';
    dotClass = 'bg-slate-500';
    label = 'Unverified Recollection / Untraced';
  } else if (norm.includes('fragmentary')) {
    badgeClass = 'bg-rose-500/10 text-rose-300 border-rose-500/30';
    dotClass = 'bg-rose-400 ring-2 ring-rose-400/20';
    label = 'Fragmentary / Isolated Pada';
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${badgeClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} aria-hidden="true" />
      <span>{label}</span>
    </span>
  );
};
