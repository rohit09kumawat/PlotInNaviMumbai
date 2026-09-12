import { Hero } from '@/components/home/Hero';
import { RealProblem } from '@/components/home/RealProblem';
import { WhyWeExist } from '@/components/home/WhyWeExist';
import { OurPromise } from '@/components/home/OurPromise';
import { HowWeGuideYou } from '@/components/home/HowWeGuideYou';
import { CuratedPlots } from '@/components/home/CuratedPlots';
import { FounderNote } from '@/components/home/FounderNote';
import { TrustStories } from '@/components/home/TrustStories';
import { FamilyTourInvite } from '@/components/home/FamilyTourInvite';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <RealProblem />
      <WhyWeExist />
      <OurPromise />
      <HowWeGuideYou />
      <CuratedPlots />
      <FounderNote />
      <TrustStories />
      <FamilyTourInvite />
    </main>
  );
}
