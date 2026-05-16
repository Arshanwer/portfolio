export type ProjectStatus = "coming-soon" | "published";

export type Project = {
	slug: string;
	title: string;
	description: string;
	tech: string[];
	status: ProjectStatus;
	url?: string;
};

export const PROJECTS: Project[] = [
	{
		slug: "pixxellent",
		title: "Pixxellent",
		description:
			"A digital asset platform for high-resolution work — started as a personal photo showcase, growing into a curated stock-asset platform across photography, video, and other digital asset types. Contributor side is live in private beta.",
		tech: [
			"Next.js",
			"TypeScript",
			"Fastify",
			"PostgreSQL",
			"Redis",
			"RabbitMQ",
			"AWS ECS",
			"GitHub Actions",
		],
		status: "coming-soon",
		url: "https://contributor.pixxellent.com",
	},
];

export function getProject(slug: string): Project | undefined {
	return PROJECTS.find((project) => project.slug === slug);
}
