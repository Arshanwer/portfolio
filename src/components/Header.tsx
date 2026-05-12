import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
	return (
		<header className="border-b border-border">
			<div className="mx-auto flex h-14 items-center justify-between p-4">
				<Link href="/" className="text-sm font-semibold tracking-tight">
					Portfolio
				</Link>
				<div className="flex items-center gap-3">
					<ThemeToggle />
				</div>
			</div>
		</header>
	);
}
