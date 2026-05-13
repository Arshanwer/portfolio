import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
                if (shouldBeDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch {}
            `,
					}}
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<a
					href="#main"
					className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-sm focus-visible:bg-background focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:text-foreground focus-visible:outline-2 focus-visible:outline-accent"
				>
					skip to content
				</a>
				<Header />
				<main id="main" tabIndex={-1}>
					{children}
				</main>
				<Footer />
			</body>
		</html>
	);
}
