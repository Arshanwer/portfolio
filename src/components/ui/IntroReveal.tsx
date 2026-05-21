"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Phase = "greeting" | "revealing" | "done";

const REVEAL_ANIMATION_MS = 800;
const REDUCED_MOTION_FADE_MS = 250;

export default function IntroReveal() {
	const [phase, setPhase] = useState<Phase>("greeting");
	const reducedMotionRef = useRef(false);
	const triggeredRef = useRef(false);

	useEffect(() => {
		if (document.documentElement.classList.contains("intro-skip")) {
			setPhase("done");
			return;
		}
		reducedMotionRef.current = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
	}, []);

	const trigger = useCallback(() => {
		if (triggeredRef.current) return;
		triggeredRef.current = true;
		setPhase("revealing");
		const duration = reducedMotionRef.current
			? REDUCED_MOTION_FADE_MS
			: REVEAL_ANIMATION_MS;
		window.setTimeout(() => setPhase("done"), duration + 60);
	}, []);

	if (phase === "done") return null;

	const isGreeting = phase === "greeting";

	return (
		<div
			className="intro-overlay"
			data-phase={phase}
			onClick={trigger}
			aria-hidden={isGreeting ? undefined : true}
			role={isGreeting ? "button" : undefined}
			aria-label={isGreeting ? "Enter the site" : undefined}
			tabIndex={isGreeting ? 0 : -1}
		>
			<div className="intro-greeting">
				<p className="intro-hello">HELLO.</p>
				<p className="intro-prompt">
					<span aria-hidden="true">[ </span>
					click anywhere to enter
					<span aria-hidden="true"> ]</span>
				</p>
			</div>
		</div>
	);
}
