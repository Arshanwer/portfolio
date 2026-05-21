export type StackCategory = {
	label: string;
	items: string[];
};

export const STACK: StackCategory[] = [
	{
		label: "languages",
		items: ["TypeScript", "JavaScript", "C#"],
	},
	{
		label: "frontend",
		items: ["React", "Next.js", "Vue", "Angular", "GraphQL", "Jest", "Vitest"],
	},
	{
		label: "backend",
		items: ["Node.js", "Fastify", ".NET", "PostgreSQL", "Redis", "RabbitMQ"],
	},
	{
		label: "infra",
		items: ["AWS", "Terraform", "Ansible", "GitHub Actions"],
	},
];
