"use client";

import { type LucideIcon } from "lucide-react";
import { type SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
	icon: LucideIcon;
	size?: number | string;
	strokeWidth?: number | string;
}

export default function Icon({
	icon: LucideIcon,
	size = 18,
	strokeWidth = 1.75,
	...props
}: IconProps) {
	return <LucideIcon size={size} strokeWidth={strokeWidth} {...props} />;
}
