interface ChipProps {
	children: React.ReactNode;
}

export default function Chip({ children }: ChipProps) {
	return (
		<span className="inline-flex items-center rounded-sm border border-border px-2 py-1 text-sm leading-none text-muted transition-[transform,color,border-color] duration-200 hover:-translate-y-[2px] hover:border-accent hover:text-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0">
			{children}
		</span>
	);
}
