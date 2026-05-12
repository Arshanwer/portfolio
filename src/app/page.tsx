import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
	return (
		<div className="min-h-screen">
			<ThemeToggle />
			<section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
						<span className="text-gradient">Welcome to</span>
						<br />
						<span style={{ color: "var(--text-primary)" }}>
							Your Portfolio
						</span>
					</h1>

					<p
						className="text-xl sm:text-2xl mb-12 max-w-2xl mx-auto"
						style={{ color: "var(--text-muted)" }}
					>
						A modern, responsive portfolio website with seamless
						dark and light theme support.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
						<button className="btn-primary text-lg px-8 py-4">
							Get Started
						</button>
						<button className="btn-outline text-lg px-8 py-4">
							Learn More
						</button>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-16">
						<h2
							className="text-4xl sm:text-5xl font-bold mb-4"
							style={{ color: "var(--text-primary)" }}
						>
							Features
						</h2>
						<p
							className="text-xl"
							style={{ color: "var(--text-muted)" }}
						>
							Built with modern technologies and best practices
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{/* Feature Card 1 */}
						<div className="card p-8 text-center">
							<div
								className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl"
								style={{
									backgroundColor: "var(--primary)",
									color: "white",
								}}
							>
								🎨
							</div>
							<h3
								className="text-2xl font-semibold mb-4"
								style={{ color: "var(--text-primary)" }}
							>
								Theme System
							</h3>
							<p style={{ color: "var(--text-muted)" }}>
								Comprehensive dark and light theme support with
								smooth transitions and system preference
								detection.
							</p>
						</div>

						{/* Feature Card 2 */}
						<div className="card p-8 text-center">
							<div
								className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl"
								style={{
									backgroundColor: "var(--secondary)",
									color: "white",
								}}
							>
								⚡
							</div>
							<h3
								className="text-2xl font-semibold mb-4"
								style={{ color: "var(--text-primary)" }}
							>
								Next.js 15
							</h3>
							<p style={{ color: "var(--text-muted)" }}>
								Built with the latest Next.js features including
								App Router, Server Components, and optimized
								performance.
							</p>
						</div>

						{/* Feature Card 3 */}
						<div className="card p-8 text-center">
							<div
								className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl"
								style={{
									backgroundColor: "var(--accent)",
									color: "white",
								}}
							>
								📱
							</div>
							<h3
								className="text-2xl font-semibold mb-4"
								style={{ color: "var(--text-primary)" }}
							>
								Responsive Design
							</h3>
							<p style={{ color: "var(--text-muted)" }}>
								Fully responsive design that looks great on all
								devices from mobile to desktop.
							</p>
						</div>

						{/* Feature Card 4 */}
						<div className="card p-8 text-center">
							<div
								className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl"
								style={{
									backgroundColor: "var(--warning)",
									color: "white",
								}}
							>
								🚀
							</div>
							<h3
								className="text-2xl font-semibold mb-4"
								style={{ color: "var(--text-primary)" }}
							>
								Performance
							</h3>
							<p style={{ color: "var(--text-muted)" }}>
								Optimized for speed with server-side rendering,
								image optimization, and efficient code
								splitting.
							</p>
						</div>

						{/* Feature Card 5 */}
						<div className="card p-8 text-center">
							<div
								className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl"
								style={{
									backgroundColor: "var(--success)",
									color: "white",
								}}
							>
								♿
							</div>
							<h3
								className="text-2xl font-semibold mb-4"
								style={{ color: "var(--text-primary)" }}
							>
								Accessibility
							</h3>
							<p style={{ color: "var(--text-muted)" }}>
								Built with accessibility in mind, following WCAG
								guidelines for inclusive design.
							</p>
						</div>

						{/* Feature Card 6 */}
						<div className="card p-8 text-center">
							<div
								className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl"
								style={{
									backgroundColor: "var(--error)",
									color: "white",
								}}
							>
								🛠️
							</div>
							<h3
								className="text-2xl font-semibold mb-4"
								style={{ color: "var(--text-primary)" }}
							>
								TypeScript
							</h3>
							<p style={{ color: "var(--text-muted)" }}>
								Full TypeScript support for better development
								experience and type safety.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Color Palette Demo */}
			<section
				className="py-20 px-4 sm:px-6 lg:px-8"
				style={{ backgroundColor: "var(--surface)" }}
			>
				<div className="max-w-4xl mx-auto">
					<div className="text-center mb-16">
						<h2
							className="text-4xl sm:text-5xl font-bold mb-4"
							style={{ color: "var(--text-primary)" }}
						>
							Color Palette
						</h2>
						<p
							className="text-xl"
							style={{ color: "var(--text-muted)" }}
						>
							Carefully crafted colors for both light and dark
							themes
						</p>
					</div>

					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
						{[
							{ name: "Primary", var: "--primary" },
							{ name: "Secondary", var: "--secondary" },
							{ name: "Accent", var: "--accent" },
							{ name: "Success", var: "--success" },
							{ name: "Warning", var: "--warning" },
							{ name: "Error", var: "--error" },
							{ name: "Surface", var: "--surface" },
							{ name: "Background", var: "--background" },
						].map((color) => (
							<div key={color.name} className="text-center">
								<div
									className="w-full h-24 rounded-lg mb-3 border"
									style={{
										backgroundColor: `var(${color.var})`,
										borderColor: "var(--border)",
									}}
								></div>
								<p
									className="font-medium"
									style={{ color: "var(--text-primary)" }}
								>
									{color.name}
								</p>
								<p
									className="text-sm"
									style={{ color: "var(--text-muted)" }}
								>
									var({color.var})
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-3xl mx-auto text-center">
					<h2
						className="text-4xl sm:text-5xl font-bold mb-6"
						style={{ color: "var(--text-primary)" }}
					>
						Ready to get started?
					</h2>
					<p
						className="text-xl mb-8"
						style={{ color: "var(--text-muted)" }}
					>
						Try switching between light and dark themes using the
						toggle in the top-right corner.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<button className="btn-primary text-lg px-8 py-4">
							Start Building
						</button>
						<button className="btn-secondary text-lg px-8 py-4">
							View Documentation
						</button>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer
				className="py-12 px-4 sm:px-6 lg:px-8"
				style={{ borderTop: "1px solid var(--border)" }}
			>
				<div className="max-w-6xl mx-auto text-center">
					<p style={{ color: "var(--text-muted)" }}>
						Built with Next.js, TypeScript, and modern CSS. Toggle
						between themes to see the magic! ✨
					</p>
				</div>
			</footer>
		</div>
	);
}
