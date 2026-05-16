interface MasonryGridProps {
	children: React.ReactNode;
	className?: string;
}

export default function MasonryGrid({ children, className }: MasonryGridProps) {
	return (
		<div
			className={`columns-1 gap-2 sm:columns-2 lg:columns-3 ${
				className ?? ""
			}`}
		>
			{children}
		</div>
	);
}
