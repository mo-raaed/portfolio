import type { ProjectStatus } from '../../types';

const config: Record<ProjectStatus, { color: string; label: string }> = {
  live: { color: 'bg-emerald-600 dark:bg-emerald-400', label: 'Live' },
  'in-progress': { color: 'bg-amber-500 dark:bg-amber-300', label: 'In Progress' },
  local: { color: 'bg-muted-foreground/50', label: 'Local / Offline' },
};

export default function StatusDot({ status }: { status: ProjectStatus }) {
  const c = config[status];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span aria-hidden="true" className={`w-2 h-2 rounded-full ${c.color}`} />
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        {c.label}
      </span>
    </span>
  );
}
