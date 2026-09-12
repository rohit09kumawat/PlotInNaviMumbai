import { Metadata } from "next";
import { getAllBlogArticles } from "@/content/blog";
import { faqs } from "@/content/faqs";
import { BlogClient } from "./BlogClient";

export const metadata: Metadata = {
  title: "Blog & Q&A Knowledge Base | Navi Mumbai Real Estate Guides",
  description: "Practical guides and straight Q&A answers on 7/12 extracts, Collector NA sanctions, MahaRERA plot verification, and infrastructure corridors in Navi Mumbai.",
};

export default function BlogListingPage() {
  const articles = getAllBlogArticles();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BlogClient articles={articles} />
    </>
  );
}
