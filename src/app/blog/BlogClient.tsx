"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Calendar, Clock, User, ArrowRight, BookOpen, ShieldCheck, HelpCircle } from "lucide-react";
import { BlogArticle } from "@/content/blog";
import { faqs } from "@/content/faqs";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { Reveal } from "@/components/shared/Reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";
import { waMessages } from "@/lib/whatsapp";

interface BlogClientProps {
  articles: BlogArticle[];
}

export function BlogClient({ articles }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  // Get all unique categories (excluding duplicates)
  const categories = React.useMemo(() => {
    const cats = new Set(articles.map((a) => a.category));
    return ["All", ...Array.from(cats)];
  }, [articles]);

  // Filter articles based on search query and category
  const filteredArticles = React.useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === "All" || article.category === selectedCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.some((p) => p.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [articles, searchQuery, selectedCategory]);

  // Identify featured article (first matching article, or first in list if none matching)
  const featuredArticle = filteredArticles[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <main className="min-h-screen">
      {/* Header Section - Royal Midnight Navy */}
      <Section tone="canopy" grid={true} className="pt-28 pb-16 sm:pt-36 sm:pb-24 border-b border-white/10 text-white relative">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog & Q&A Knowledge Hub" },
            ]}
            className="text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/40"
          />
          <div className="flex flex-col gap-4 max-w-3xl mt-6">
            <div className="mb-1">
              <Eyebrow className="text-sprout font-semibold">MARKET RESEARCH &amp; Q&amp;A KNOWLEDGE BASE</Eyebrow>
            </div>
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold tracking-tight text-white uppercase leading-[1.12]">
              Navi Mumbai Real Estate Insights &amp; Q&amp;A
            </h1>
            <p className="font-sans text-lg sm:text-xl text-white/85 leading-relaxed max-w-[56ch]">
              Practical market guides, zoning analyses, 7/12 extract checklists, and direct plain-language answers to every critical land buying question.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/15 text-xs font-mono uppercase tracking-wider text-white/90">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-sprout font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-sprout" /> Verified Revenue Research
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/10 text-white font-bold">
                <BookOpen className="w-3.5 h-3.5 text-sprout" /> Legal &amp; Title Guides
              </span>
              <a 
                href="#qa-knowledge-base" 
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sprout/20 hover:bg-sprout/30 border border-sprout/40 text-sprout font-bold transition-colors cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-sprout" /> Direct Questions &amp; Answers ↓
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Search & Filter Controls Bar */}
      <section className="sticky top-[76px] z-30 bg-paper/95 backdrop-blur-md border-b border-line py-4 md:py-5 shadow-xs">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles by keyword or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-[#FCFAF6] border-line focus-visible:ring-sprout rounded-xl shadow-2xs text-sm"
              />
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-bold rounded-full whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sprout ${
                    selectedCategory === category
                      ? "bg-canopy text-white shadow-xs"
                      : "bg-[#FCFAF6] hover:bg-sand text-ink border border-line"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Main Listing Section */}
      <Section tone="panel" className="py-16 sm:py-24 border-b border-line">
        <Container>
          {filteredArticles.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20 bg-[#FCFAF6] rounded-2xl border border-line p-8 max-w-lg mx-auto shadow-sm">
              <p className="font-display text-xl text-ink font-semibold mb-2">No articles found</p>
              <p className="font-sans text-sm text-muted-foreground mb-6">
                We couldn&apos;t find any articles matching your search query or selected category.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                }}
                className="rounded-xl font-mono text-xs uppercase"
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              {/* Featured Article Spotlight Card */}
              {featuredArticle && !searchQuery && selectedCategory === "All" && (
                <Reveal>
                  <div className="group bg-[#FCFAF6] rounded-2xl overflow-hidden border border-line shadow-card hover:border-sprout/80 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
                    {/* Image container */}
                    <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[300px] overflow-hidden bg-panel">
                      <Image
                        src={featuredArticle.heroImage}
                        alt={featuredArticle.imageAlt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-ink/90 backdrop-blur-md text-sprout font-mono text-[0.6875rem] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-sm border border-white/10">
                          FEATURED INSIGHT · {featuredArticle.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                      <div className="flex flex-col gap-4">
                        {/* Meta information */}
                        <div className="flex items-center gap-4 text-xs font-mono text-muted uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-sprout" />
                            {new Date(featuredArticle.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-sprout" />
                            {featuredArticle.readingTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink leading-snug group-hover:text-canopy transition-colors">
                          <Link href={`/blog/${featuredArticle.slug}`}>
                            {featuredArticle.title}
                          </Link>
                        </h2>

                        {/* Excerpt */}
                        <p className="font-sans text-sm sm:text-base text-muted leading-relaxed">
                          {featuredArticle.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-line mt-6">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-ink">
                          <User className="h-3.5 w-3.5 text-sprout" />
                          {featuredArticle.author}
                        </span>
                        <Link
                          href={`/blog/${featuredArticle.slug}`}
                          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-canopy hover:text-sprout transition-colors"
                        >
                          Read Article <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Grid of Other Articles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(searchQuery || selectedCategory !== "All" ? filteredArticles : gridArticles).map(
                  (article, idx) => (
                    <Reveal key={article.slug} delay={idx * 0.05}>
                      <article className="group bg-[#FCFAF6] rounded-2xl overflow-hidden border border-line shadow-card hover:border-sprout/80 transition-all duration-300 flex flex-col justify-between h-full">
                        {/* Card Top */}
                        <div>
                          {/* Image Container */}
                          <div className="relative aspect-[16/10] overflow-hidden bg-panel">
                            <Image
                              src={article.heroImage}
                              alt={article.imageAlt}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-ink/85 backdrop-blur-md text-sprout font-mono text-[0.625rem] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10">
                                {article.category}
                              </span>
                            </div>
                          </div>

                          {/* Article Info */}
                          <div className="p-6 flex flex-col gap-3">
                            <div className="flex items-center gap-3 text-xs font-mono text-muted">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3 text-sprout" />
                                {new Date(article.date).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-sprout" />
                                {article.readingTime}
                              </span>
                            </div>

                            <h3 className="font-display text-lg font-semibold text-ink leading-snug group-hover:text-canopy transition-colors line-clamp-2">
                              <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                            </h3>

                            <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed line-clamp-3">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="p-6 pt-4 border-t border-line flex items-center justify-between mt-auto">
                          <span className="flex items-center gap-1 text-xs font-semibold text-ink">
                            <User className="h-3 w-3 text-sprout" />
                            {article.author.split(",")[0]}
                          </span>
                          <Link
                            href={`/blog/${article.slug}`}
                            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-canopy hover:text-sprout transition-colors"
                          >
                            Read <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </article>
                    </Reveal>
                  )
                )}
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* Comprehensive Q&A Knowledge Base Section */}
      <section id="qa-knowledge-base" className="py-20 sm:py-28 bg-[#FCFAF6] border-b border-line">
        <Container>
          <Reveal>
            <div className="max-w-3xl mb-12">
              <div className="mb-3">
                <Eyebrow className="text-canopy font-semibold">FREQUENTLY ASKED QUESTIONS &amp; ANSWERS</Eyebrow>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink uppercase tracking-tight mb-4">
                Navi Mumbai Land Buying Q&amp;A
              </h2>
              <p className="font-sans text-base sm:text-lg text-ink/80 leading-relaxed">
                Clear, direct answers to common questions about buying land in Navi Mumbai — 7/12 extracts, Collector NA sanction orders, site inspections, and NRI legal rules.
              </p>
            </div>
          </Reveal>

          {/* Categorized Q&A Accordion Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-8 flex flex-col gap-10">
              {(['Documentation', 'Getting started', 'Site visits', 'NRI buyers'] as const).map((category, idx) => {
                const categoryFaqs = faqs.filter((f) => f.category === category);
                return (
                  <Reveal key={category} delay={idx * 0.05}>
                    <div className="bg-white rounded-2xl border border-line p-6 sm:p-8 shadow-card">
                      <div className="border-b border-line pb-4 mb-6 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[0.6875rem] font-bold text-sprout uppercase tracking-widest block mb-1">
                            Q&amp;A SECTION 0{idx + 1}
                          </span>
                          <h3 className="font-display text-xl sm:text-2xl font-bold text-ink uppercase tracking-tight">
                            {category === 'Getting started' ? 'Advisory & Process' : category}
                          </h3>
                        </div>
                        <HelpCircle className="w-6 h-6 text-canopy shrink-0" />
                      </div>
                      <FAQAccordion items={categoryFaqs} />
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Sticky Sidebar with Ask a Question Card */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:sticky lg:top-28">
              <div className="bg-white rounded-2xl border border-line p-6 sm:p-7 shadow-card">
                <span className="font-mono text-[0.625rem] font-bold text-sprout uppercase tracking-widest block mb-2">
                  HAVE AN UNLISTED QUESTION?
                </span>
                <h3 className="font-display text-xl font-bold text-ink mb-3 leading-snug">
                  Ask Rohit Kumawat Directly
                </h3>
                <p className="font-sans text-sm text-ink/75 leading-relaxed mb-6">
                  Need clarity on a specific survey number, ferfar entry, NA sanction order, or local pricing in Panvel, Ulwe, or Kharghar? We answer directly without sales pressure.
                </p>
                <WhatsAppButton
                  message={waMessages.general()}
                  variant="primary"
                  source="blog_qa_sidebar"
                  label="Ask Question on WhatsApp"
                  className="w-full bg-sprout text-ink hover:bg-sprout/90 font-semibold h-11"
                />
              </div>

              <div className="bg-[#EFF1EA] rounded-2xl border border-line p-6 text-ink">
                <span className="font-mono text-[0.625rem] font-bold text-canopy uppercase tracking-widest block mb-1.5">
                  LEGAL DUE DILIGENCE FIRST
                </span>
                <p className="font-sans text-xs text-ink/80 leading-relaxed">
                  All Q&amp;A answers are based on statutory Maharashtra Land Revenue Code (MLRC) rules, MahaRERA guidelines, and ground surveys conducted across Navi Mumbai.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Dark Canopy WhatsApp Advisory Update CTA */}
      <Section tone="canopy" className="py-20 sm:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sprout/15 via-transparent to-transparent" />
        <Container className="relative z-10 text-center max-w-2xl mx-auto">
          <Reveal>
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-sprout mb-3 block">
                VERIFIED ADVISORY DIGEST
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight mb-4">
                Receive Unbiased Navi Mumbai Market Notes
              </h2>
              <p className="font-sans text-base text-white/80 leading-relaxed mb-8">
                Get notified on new CIDCO survey allocations, Atal Setu corridor updates, and legal check sheets directly over WhatsApp.
              </p>
              <WhatsAppButton
                message={waMessages.general()}
                variant="primary"
                source="blog_index_cta"
                label="Connect on WhatsApp for Market Updates"
                className="bg-sprout text-ink hover:bg-sprout/90 font-medium"
              />
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}
