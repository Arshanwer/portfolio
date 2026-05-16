export type ProjectStatus = "coming-soon" | "published";

export type Project = {
	slug: string;
	title: string;
	subtitle?: string;
	dates?: string;
	description: string;
	body?: string[];
	tech: string[];
	status: ProjectStatus;
	url?: string;
	urlLabel?: string;
};

export const PROJECTS: Project[] = [
	{
		slug: "pixxellent",
		title: "Pixxellent",
		subtitle: "digital asset platform · private beta",
		dates: "sept 2024 → present",
		description:
			"A digital asset platform that started as a personal photo showcase and grew into curated stock for photography, video, and beyond. Contributor side is live in private beta.",
		body: [
			"Pixxellent started as a way to showcase my own photography, something I’ve been shooting on the side for years. The scope kept expanding, and it’s now a curated stock-asset platform where contributors publish high-resolution work and a broader audience gets to use it. It won’t stop at photos — video is next, then other digital asset types over time. Curation and community matter more than volume.",
			"Built top to bottom with Next.js (React, TypeScript) on the frontend, Fastify on Node.js for the backend, and PostgreSQL as the primary datastore. Redis handles caching; RabbitMQ queues transactional emails, image tagging in S3, and image processing. Deployment runs through GitHub Actions to Amazon ECR and ECS.",
		],
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
		urlLabel: "visit contributor.pixxellent.com",
	},
];

export function getProject(slug: string): Project | undefined {
	return PROJECTS.find((project) => project.slug === slug);
}
