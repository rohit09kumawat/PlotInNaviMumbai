import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";

export default function NotFound() {
  return (
    <Section className="min-h-[70vh] flex items-center justify-center">
      <Container className="flex flex-col items-center text-center max-w-2xl">
        <SectionHeading 
          title="We couldn't find this page."
          lead="It looks like the page you are looking for has been moved or doesn't exist."
          align="center"
          className="mb-10"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/" className={cn(buttonVariants(), "h-12 px-8 bg-canopy hover:bg-moss text-white rounded-[8px] text-[0.9375rem] font-medium")}>
            Back to home
          </Link>
          <Link href="/properties" className={cn(buttonVariants({ variant: "outline" }), "h-12 px-8 border-line text-ink hover:bg-panel rounded-[8px] text-[0.9375rem] font-medium")}>
            Explore properties
          </Link>
        </div>
      </Container>
    </Section>
  );
}
