interface ChipProps {
	children: React.ReactNode;
}

export default function Chip({ children }: ChipProps) {
	return (
		<span className="inline-flex items-center rounded-sm border border-border px-2 py-0.5 text-xs leading-none text-muted">
			{children}
		</span>
	);
}
