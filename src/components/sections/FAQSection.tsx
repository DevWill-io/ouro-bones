import { faq } from '@/data/faq';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from '@/components/ui/accordion';

export function FAQSection() {
  return (
    <section id="faq" className="py-16 lg:py-24">
      <div className="container max-w-3xl">
        <h2 className="text-2xl font-bold text-center sm:text-3xl lg:text-4xl">
          Perguntas <span className="gold-gradient">frequentes</span>
        </h2>
        <Accordion type="single" collapsible className="mt-10">
          {faq.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}