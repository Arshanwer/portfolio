import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Projects from "@/components/sections/Projects";
import Stack from "@/components/sections/Stack";
import PhotographyTeaser from "@/components/sections/PhotographyTeaser";
import ThoughtsTeaser from "@/components/sections/ThoughtsTeaser";

export default function Home() {
	return (
		<>
			<Hero />
			<Work />
			<Projects />
			<Stack />
			<PhotographyTeaser />
			<ThoughtsTeaser />
		</>
	);
}
