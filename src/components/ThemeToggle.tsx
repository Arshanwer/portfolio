"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import Icon from "./Icon";

export default function ThemeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		// Check if user has a preference stored
		const savedTheme = localStorage.getItem("theme");
		const prefersDark = window.matchMedia(
			"(prefers-color-scheme: dark)"
		).matches;

		const shouldBeDark =
			savedTheme === "dark" || (!savedTheme && prefersDark);
		setIsDark(shouldBeDark);

		// Apply theme to document
		if (shouldBeDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, []);

	const toggleTheme = () => {
		const newIsDark = !isDark;
		setIsDark(newIsDark);

		// Apply theme to document
		if (newIsDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	};

	return (
		<button
			onClick={toggleTheme}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none"
		>
			{isDark ? (
				<Icon icon={Sun} aria-hidden="true" />
			) : (
				<Icon icon={Moon} aria-hidden="true" />
			)}
		</button>
	);
}
