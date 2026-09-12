import { Property } from '@/types';
import { Eyebrow } from '@/components/shared/Eyebrow';

interface VerificationRecordProps {
  verification: Property['verification'];
}

export function VerificationRecord({ verification }: VerificationRecordProps) {
  const formatStatus = (status: string) => {
    return status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const formattedDate = new Date(verification.lastCheckedISO).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const allNa = verification.rera.status === 'not-applicable' && 
                verification.mmrda.status === 'not-applicable' && 
                verification.documents === 'not-applicable';

  return (
    <div className="bg-panel border border-line rounded-[8px] p-6 sm:p-8">
      <Eyebrow className="mb-6">Verification Record</Eyebrow>

      {allNa ? (
        <div className="text-ink mb-6 max-w-[54ch]">
          Formal verification frameworks (like RERA) are not applicable to this specific land parcel type at this stage. However, we have independently reviewed the base ownership documents.
        </div>
      ) : (
        <dl className="flex flex-col gap-0 border-t border-line mb-8">
          {/* RERA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-line gap-2 sm:gap-4">
            <dt className="font-mono text-xs font-medium tracking-wide uppercase text-muted w-40 shrink-0">RERA Status</dt>
            <dd className="flex items-center justify-between sm:justify-start flex-1 gap-8">
              <span className={`text-sm ${verification.rera.status === 'verified' ? 'text-canopy font-medium' : 'text-ink'}`}>
                {formatStatus(verification.rera.status)}
              </span>
              <span className="font-mono text-xs text-muted">
                {verification.rera.reference || '—'}
              </span>
            </dd>
          </div>

          {/* MMRDA */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-line gap-2 sm:gap-4">
            <dt className="font-mono text-xs font-medium tracking-wide uppercase text-muted w-40 shrink-0">MMRDA Status</dt>
            <dd className="flex items-center justify-between sm:justify-start flex-1 gap-8">
              <span className={`text-sm ${verification.mmrda.status === 'verified' ? 'text-canopy font-medium' : 'text-ink'}`}>
                {formatStatus(verification.mmrda.status)}
              </span>
              <span className="font-mono text-xs text-muted">
                {verification.mmrda.reference || '—'}
              </span>
            </dd>
          </div>

          {/* Legal Documents */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-line gap-2 sm:gap-4">
            <dt className="font-mono text-xs font-medium tracking-wide uppercase text-muted w-40 shrink-0">Legal Documents</dt>
            <dd className="flex items-center justify-between sm:justify-start flex-1 gap-8">
              <span className={`text-sm ${verification.documents === 'verified' ? 'text-canopy font-medium' : 'text-ink'}`}>
                {formatStatus(verification.documents)}
              </span>
              <span className="font-mono text-xs text-muted">—</span>
            </dd>
          </div>
        </dl>
      )}

      <div className="text-sm text-muted max-w-[60ch]">
        Last checked by our team on {formattedDate}. Approval status can change. We re-check before every site visit and will share the current documents with you directly.
      </div>
    </div>
  );
}
