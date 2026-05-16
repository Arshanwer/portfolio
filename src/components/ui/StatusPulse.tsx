interface StatusPulseProps {
	label: string;
}

export default function StatusPulse({ label }: StatusPulseProps) {
	return (
		<p className="flex items-center gap-3 font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
			<span className="status-pulse" aria-hidden="true" />
			<span>{label}</span>
		</p>
	);
}
