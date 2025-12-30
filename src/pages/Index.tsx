import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProjects />
      <SkillsPreview />
      <ExperienceTimeline />
      <CTASection />
    </Layout>
  );
};

export default Index;
