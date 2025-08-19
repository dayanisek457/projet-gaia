
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProjectSection from '@/components/ProjectSection';
import SolutionSection from '@/components/SolutionSection';
import RisksAndFutureSection from '@/components/RisksAndFutureSection';
import RoadmapView from '@/components/RoadmapView';
import SponsorsSection from '@/components/SponsorsSection';
import TeamSection from '@/components/TeamSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ProjectSection />
        <SolutionSection />
        <RisksAndFutureSection />
        <RoadmapView />
        <SponsorsSection />
        <TeamSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
