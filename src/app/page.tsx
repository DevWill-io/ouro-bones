import { HeroSection } from '@/components/sections/HeroSection';
import { WhySection } from '@/components/sections/WhySection';
import { BenefitsSection } from '@/components/sections/BenefitsSection';
import { ProductsShowcase } from '@/components/sections/ProductsShowcase';
import { StatsSection } from '@/components/sections/StatsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { GallerySection } from '@/components/sections/GallerySection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { NewsletterSection } from '@/components/sections/NewsletterSection';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE, MIN_ORDER } from '@/lib/constants';
import { faq } from '@/data/faq';

export default function HomePage() {
  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressRegion: 'SP', addressCountry: 'BR' },
  };
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  return (
    <>
      <JsonLd data={orgLd} />
      <JsonLd data={faqLd} />
      <HeroSection />
      <WhySection />
      <BenefitsSection />
      <ProductsShowcase />
      <StatsSection />
      <TestimonialsSection />
      <GallerySection />
      <FAQSection />
      <CTASection />
      <NewsletterSection />
    </>
  );
}