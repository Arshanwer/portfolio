export type MenuItem = {
	label: string;
	href: string;
	sectionId?: string;
	routeMatch?: string;
	soon?: boolean;
};

export type SocialItem = {
	label: string;
	href: string;
};

export const NAME_LINES = ["arshad", "anwer"] as const;
export const ROLE_LINE = "senior software engineer";
export const LOCATION_LINE = "wellington, nz";

export const MENU: MenuItem[] = [
	{ label: "home", href: "/", sectionId: "hello" },
	{ label: "work", href: "/#work", sectionId: "work" },
	{ label: "projects", href: "/#projects", sectionId: "projects" },
	{ label: "stack", href: "/#stack", sectionId: "stack" },
	{
		label: "photography",
		href: "/photography",
		sectionId: "photography",
		routeMatch: "/photography",
	},
	{
		label: "thoughts",
		href: "/thoughts",
		sectionId: "thoughts",
		routeMatch: "/thoughts",
		soon: true,
	},
];

export const SOCIAL: SocialItem[] = [
	{ label: "github", href: "https://github.com/Arshanwer" },
	{ label: "linkedin", href: "https://www.linkedin.com/in/arshanwer" },
];

export const CONTACT_EMAIL = "contact@arshadanwer.com";

export const SECTION_IDS = MENU.map((item) => item.sectionId).filter(
	(id): id is string => Boolean(id)
);
