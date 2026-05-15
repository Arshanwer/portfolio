import Chip from "./Chip";

interface Role {
	company: string;
	title: string;
	dates: string;
	current?: boolean;
	bullets: string[];
	tech: string[];
}

const ROLES: Role[] = [
	{
		company: "Totara",
		title: "DevOps Engineer — Platform & Infrastructure",
		dates: "Jan 2025 — Present",
		current: true,
		bullets: [
			"Architected AWS EC2 and ECS environments with Terraform and Ansible — standardized internal platform for demo and test fleets.",
			"Built the cloud-native GitHub Actions pipelines that replaced the legacy path-to-production — releases got faster and a lot less painful.",
			"Shipped the migration from self-hosted Bitbucket to GitHub Enterprise Cloud — automated metadata transfer, restructured repos along the way.",
			"Built internal CLI tools and cloud integrations in Node.js / TypeScript (with Vitest) to replace brittle legacy scripts engineers had been working around.",
		],
		tech: [
			"Terraform",
			"Ansible",
			"AWS",
			"GitHub Actions",
			"Node.js",
			"TypeScript",
			"Vitest",
		],
	},
	{
		company: "Totara",
		title: "Front-End Developer",
		dates: "Feb 2020 — Jan 2025",
		bullets: [
			"Maintained strict WCAG 2.1 AA accessibility compliance across all products.",
			"Built reusable Vue.js components for the team's ever-growing core library, with strong Jest coverage.",
			"Partnered with the backend team on GraphQL API design and consumption across the frontend.",
			"Architected clean, readable CSS across the components I worked on, following the team's BEM methodology.",
		],
		tech: ["Vue.js", "TypeScript", "GraphQL", "Jest", "BEM"],
	},
	{
		company: "Qijang Technologies",
		title: "Senior Software Engineer",
		dates: "May 2019 — Jan 2020",
		bullets: [
			"Architected and delivered a Warehouse Management System with mobile fulfillment baked in, still supporting a rapidly growing client base.",
			"Built a modular React / TypeScript component library that pulled the team onto a shared foundation.",
			"Mentored junior developers across React and Angular, reducing onboarding time.",
			"Prototyped a React Native app to test whether the idea had legs.",
		],
		tech: ["React", "TypeScript", "Angular", "React Native", "Rasa"],
	},
	{
		company: "SEB — Nordic Corporate Bank",
		title: "Software Developer",
		dates: "Mar 2015 — May 2019",
		bullets: [
			"Built an insurance advisory system the CEO presented at the 2016 annual meeting as a stepping-stone of innovation.",
			"Shipped the bulk of a large-scale frontend migration from Angular 6 to React (TypeScript).",
			"Designed state management patterns with Redux and NGXS across the React and Angular apps.",
			"Pushed .NET backend coverage past 85% and led a mixed .NET / frontend team building the Irish-market version of the product.",
		],
		tech: [
			"React",
			"TypeScript",
			"Angular",
			"Redux",
			"NGXS",
			".NET",
			"Chart.js",
		],
	},
];

function DateLine({ dates, current }: { dates: string; current?: boolean }) {
	return (
		<div className="flex items-center gap-2">
			{current && (
				<span
					aria-hidden="true"
					className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
				/>
			)}
			<span>{dates}</span>
		</div>
	);
}

export default function Experience() {
	return (
		<section
			id="experience"
			aria-labelledby="experience-heading"
			className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28"
		>
			<h2
				id="experience-heading"
				className="font-sans text-display-section font-extrabold leading-[0.95] tracking-tight text-foreground"
			>
				<span aria-hidden="true" className="text-accent">
					#
				</span>
				experience
			</h2>

			<ol className="mt-12 space-y-14 sm:mt-16 sm:space-y-16">
				{ROLES.map((role) => (
					<li
						key={`${role.company}-${role.title}`}
						className="grid gap-6 sm:grid-cols-[10rem_1fr] sm:gap-10"
					>
						<div className="hidden text-xs uppercase tracking-wider text-muted sm:block sm:pt-1">
							<DateLine dates={role.dates} current={role.current} />
						</div>

						<div>
							<h3 className="text-base font-medium text-foreground sm:text-lg">
								{role.title}
								<span
									aria-hidden="true"
									className="mx-2 text-muted"
								>
									·
								</span>
								<span className="text-muted">{role.company}</span>
							</h3>

							<div className="mt-2 text-xs uppercase tracking-wider text-muted sm:hidden">
								<DateLine dates={role.dates} current={role.current} />
							</div>

							<ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-foreground sm:text-[15px]">
								{role.bullets.map((b, i) => (
									<li key={i} className="flex gap-3">
										<span
											aria-hidden="true"
											className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent"
										/>
										<span>{b}</span>
									</li>
								))}
							</ul>

							<ul className="mt-5 flex flex-wrap gap-1.5">
								{role.tech.map((t) => (
									<li key={t}>
										<Chip>{t}</Chip>
									</li>
								))}
							</ul>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
