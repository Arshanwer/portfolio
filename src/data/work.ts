export type WorkItem = {
	id: string;
	dates: string;
	role: string;
	company: string;
	description: string;
	current?: boolean;
};

export const WORK: WorkItem[] = [
	{
		id: "totara-devops",
		dates: "Jan 2025 — Present",
		role: "DevOps Engineer — Platform & Infrastructure",
		company: "Totara",
		description:
			"AWS infrastructure standardised with Terraform + Ansible, the GitHub Actions release pipelines that replaced the legacy path-to-production, and internal Node / TypeScript CLI tooling that retired brittle scripts engineers had been working around.",
		current: true,
	},
	{
		id: "totara-fe",
		dates: "Feb 2020 — Jan 2025",
		role: "Front-End Developer",
		company: "Totara",
		description:
			"Reusable Vue component library with strong Jest coverage, GraphQL API consumption across the frontend, and strict WCAG 2.1 AA compliance held throughout the product suite.",
	},
	{
		id: "qijang",
		dates: "May 2019 — Jan 2020",
		role: "Senior Software Engineer",
		company: "Qijang Technologies",
		description:
			"Architected a Warehouse Management System still supporting a growing client base, and built a modular React + TypeScript component library that pulled the team onto a shared foundation.",
	},
	{
		id: "seb",
		dates: "Mar 2015 — May 2019",
		role: "Software Developer",
		company: "SEB — Nordic Corporate Bank",
		description:
			"Insurance advisory system the CEO showcased at the 2016 annual meeting as a stepping stone of innovation. Led an Angular 6 → React (TypeScript) migration and pushed .NET backend coverage past 85%.",
	},
];
