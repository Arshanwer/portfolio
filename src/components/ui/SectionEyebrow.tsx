interface SectionEyebrowProps {
	number: string;
	label: string;
}

export default function SectionEyebrow({
	number,
	label,
}: SectionEyebrowProps) {
	return (
		<p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
			<span aria-hidden="true" className="text-accent">
				_{number}
			</span>
			<span>{label}</span>
		</p>
	);
}
