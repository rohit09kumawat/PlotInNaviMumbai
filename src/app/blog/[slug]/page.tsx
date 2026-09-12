import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, ExternalLink, ShieldCheck, Sparkles, BookOpen, HelpCircle } from "lucide-react";
import { getBlogArticleBySlug, getAllBlogArticles } from "@/content/blog";
import { getPropertiesByNode } from "@/lib/properties";
import { faqs } from "@/content/faqs";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllBlogArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const article = getBlogArticleBySlug(resolvedParams.slug);

  if (!article) {
    return { title: "Not Found | PlotInNaviMumbai.com" };
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: [article.category, "Navi Mumbai Real Estate", "Panvel Plots", article.slug.replace(/-/g, " ")],
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const resolvedParams = await params;
  const article = getBlogArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Fetch properties for CTA if specified
  const properties = article.propertyCta ? getPropertiesByNode(article.propertyCta) : [];
  const ctaProperties = properties.slice(0, 3); // Display up to 3 properties

  // Fetch related articles
  const allArticles = getAllBlogArticles();
  const relatedArticles = allArticles.filter((item) =>
    article.relatedSlug.includes(item.slug)
  );

  // Structured Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://plotinnavimumbai.com"}${article.heroImage}`,
    "datePublished": article.date,
    "dateModified": article.lastUpdated || article.date,
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "PlotInNaviMumbai.com",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://plotinnavimumbai.com"}/logo-dark.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://plotinnavimumbai.com"}/blog/${article.slug}`,
    },
  };

  return (
    <main className="min-h-screen">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Section */}
      <Section tone="paper" className="pt-28 pb-14 sm:pt-36 sm:pb-20 border-b border-line">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
              { label: article.title },
            ]}
          />

          <div className="max-w-4xl mt-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-canopy hover:text-sprout transition-colors mb-6"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to all articles
            </Link>

            {/* Meta and Categories */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted uppercase tracking-wider mb-4">
              <span className="bg-ink text-sprout font-bold px-3 py-1 rounded-full shadow-2xs">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-sprout" />
                Published on{" "}
                {new Date(article.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-sprout" />
                {article.readingTime}
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-[1.15] mb-6">
              {article.title}
            </h1>

            {/* Author Credit */}
            <div className="flex items-center gap-2 text-sm text-ink font-semibold pt-4 border-t border-line">
              <User className="h-4 w-4 text-sprout" />
              <span>Written by {article.author}</span>
              {article.lastUpdated && (
                <span className="text-xs text-muted font-normal">
                  (Updated:{" "}
                  {new Date(article.lastUpdated).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                  )
                </span>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content & Sidebar */}
      <Section tone="panel" className="py-16 sm:py-24 border-b border-line">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Main Content Area */}
            <div className="lg:col-span-8 flex flex-col gap-10">
              {/* Hero Image */}
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-line bg-paper shadow-card">
                <Image
                  src={article.heroImage}
                  alt={article.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>

              {/* Key Takeaways Box */}
              <div className="bg-white border border-line rounded-2xl p-7 sm:p-9 shadow-card">
                <div className="flex items-center gap-2.5 text-ink font-display font-bold mb-4 text-xl">
                  <ShieldCheck className="h-5 w-5 text-canopy" />
                  <span>Key Takeaways & Executive Summary</span>
                </div>
                <ul className="space-y-3.5">
                  {article.takeaways.map((takeaway, i) => (
                    <li key={i} className="flex gap-3 text-ink/85 leading-relaxed text-sm sm:text-[0.9375rem] font-sans">
                      <span className="font-mono text-sprout font-bold shrink-0">0{i + 1}.</span>
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Article Paragraphs */}
              <div className="bg-white rounded-2xl border border-line p-8 sm:p-12 shadow-card flex flex-col gap-6 text-base text-ink/90 leading-relaxed font-sans">
                {article.content.map((paragraph, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* References & Citing Sources */}
              {article.references.length > 0 && (
                <div className="p-6 sm:p-8 bg-paper rounded-2xl border border-line">
                  <h3 className="font-mono text-xs uppercase tracking-[0.12em] font-bold text-ink mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-canopy" /> Official Sources & References
                  </h3>
                  <ul className="space-y-2.5">
                    {article.references.map((ref, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <ExternalLink className="h-3.5 w-3.5 text-canopy shrink-0" />
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-ink/80 hover:text-canopy underline font-medium transition-colors"
                        >
                          {ref.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Questions & Answers (Q&A) */}
              <div className="bg-white rounded-2xl border border-line p-7 sm:p-9 shadow-card">
                <div className="border-b border-line pb-4 mb-6 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[0.6875rem] font-bold text-sprout uppercase tracking-widest block mb-1">
                      KNOWLEDGE BASE · Q&amp;A
                    </span>
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-ink uppercase tracking-tight">
                      Related Questions &amp; Direct Answers
                    </h3>
                  </div>
                  <HelpCircle className="w-6 h-6 text-canopy shrink-0" />
                </div>
                <FAQAccordion items={faqs.slice(0, 4)} />
                <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-xs">
                  <span className="text-muted font-mono">Need more legal or layout answers?</span>
                  <Link 
                    href="/blog#qa-knowledge-base" 
                    className="font-mono font-bold text-canopy hover:text-sprout uppercase tracking-wider inline-flex items-center gap-1"
                  >
                    View All Q&amp;A in Hub →
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar with Property CTA (Sticky Desktop) */}
            <div className="lg:col-span-4 flex flex-col gap-8 sticky top-28">
              {/* Contextual Properties CTA */}
              {ctaProperties.length > 0 && (
                <div className="bg-white border border-line rounded-2xl p-7 shadow-card flex flex-col gap-6">
                  <div className="flex flex-col gap-1.5">
                    <span className="font-mono text-[0.625rem] font-bold tracking-wider uppercase text-sprout">
                      VERIFIED PLOTS
                    </span>
                    <h3 className="font-display text-lg font-bold text-ink uppercase">
                      Townships in {article.propertyCta?.toUpperCase()}
                    </h3>
                    <p className="text-xs text-muted leading-relaxed">
                      Sanctioned by Collector NA / town planning authorities with active MahaRERA verification.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {ctaProperties.map((property) => (
                      <div key={property.slug} className="p-3.5 rounded-xl bg-panel border border-line/60">
                        <Link 
                          href={`/properties/${property.node}/${property.slug}`}
                          className="font-display text-sm font-semibold text-ink hover:text-canopy transition-colors block mb-1 line-clamp-1"
                        >
                          {property.name}
                        </Link>
                        <div className="flex items-center justify-between text-xs text-muted font-mono">
                          <span>{property.location.landmark}</span>
                          <span className="text-canopy font-bold">Verified</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/properties"
                    className={buttonVariants({ variant: "default", size: "sm" }) + " w-full font-mono text-xs font-bold uppercase tracking-wider rounded-[var(--radius)] bg-canopy hover:bg-moss text-white"}
                  >
                    View All Townships
                  </Link>
                </div>
              )}

              {/* Title Verification Callout Box */}
              <div className="bg-canopy text-white rounded-2xl p-7 shadow-card flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
                <div className="relative z-10">
                  <Sparkles className="w-6 h-6 text-sprout mb-3" />
                  <h4 className="font-display text-lg font-bold">Need Title Document Review?</h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed mt-2 mb-6">
                    Our team checks 7/12 extracts, Collector NA orders, and title chain certificates to ensure complete document transparency.
                  </p>
                  <Link
                    href="/contact"
                    className={buttonVariants({ variant: "outline" }) + " w-full bg-sprout hover:bg-sprout/90 border-transparent text-ink font-mono text-xs font-bold uppercase tracking-wider rounded-[var(--radius)]"}
                  >
                    Consult an Advisor
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <Section tone="sand" className="py-16 sm:py-24 border-t border-line">
          <Container>
            <Reveal>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-8 uppercase tracking-tight">
                Related Insights & Corridors
              </h3>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedArticles.map((item, idx) => (
                <Reveal key={item.slug} delay={idx * 0.08}>
                  <div className="group bg-white rounded-2xl overflow-hidden border border-line p-7 shadow-card hover:border-sprout transition-all duration-300 flex flex-col justify-between h-full">
                    <div className="flex flex-col gap-3">
                      <span className="text-[0.6875rem] font-mono font-bold tracking-wider text-sprout uppercase">
                        {item.category}
                      </span>
                      <h4 className="font-display text-xl font-bold text-ink leading-snug group-hover:text-canopy transition-colors line-clamp-2">
                        <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                      </h4>
                      <p className="text-sm font-sans text-muted leading-relaxed line-clamp-2">
                        {item.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-line">
                      <span className="text-xs text-muted font-mono">{item.readingTime}</span>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="font-mono text-xs font-bold uppercase tracking-wider text-canopy hover:text-sprout transition-colors"
                      >
                        Read Article &rarr;
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </main>
  );
}
