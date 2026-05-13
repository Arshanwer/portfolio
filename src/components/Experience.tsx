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
			"Modernized the path-to-production with cloud-native GitHub Actions pipelines, cutting deployment friction and lifting release velocity.",
			"Led the end-to-end migration from self-hosted Bitbucket to GitHub Enterprise Cloud, including automated metadata transfer and repo restructuring.",
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
			"Built a library of reusable Vue.js core components with high Jest coverage, accelerating downstream feature work.",
			"Partnered with the backend team on GraphQL API design and consumption across the frontend.",
			"Architected a scalable, readable CSS structure using BEM methodology.",
		],
		tech: ["Vue.js", "TypeScript", "GraphQL", "Jest", "BEM"],
	},
	{
		company: "Qijang Technologies",
		title: "Senior Software Engineer",
		dates: "May 2019 — Jan 2020",
		bullets: [
			"Architected and delivered a scalable Warehouse Management System with integrated mobile fulfillment, now supporting a growing client base.",
			"Built a modular React / TypeScript component library to standardize development across projects.",
			"Mentored junior developers across React and Angular, reducing onboarding time.",
			"Prototyped a React Native cross-platform app to validate product-market fit.",
		],
		tech: ["React", "TypeScript", "Angular", "React Native", "Rasa"],
	},
	{
		company: "SEB — Nordic Corporate Bank",
		title: "Software Developer",
		dates: "Mar 2015 — May 2019",
		bullets: [
			"Built an insurance advisory system the CEO presented at the 2016 annual meeting as a stepping-stone of innovation.",
			"Contributed to a large-scale frontend migration from Angular 6 to React (TypeScript).",
			"Designed scalable state management patterns with Redux and NGXS across complex React / Angular applications.",
			"Pushed .NET backend code coverage past 85% and led a cross-functional .NET / frontend team delivering localized solutions for the Irish market.",
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
