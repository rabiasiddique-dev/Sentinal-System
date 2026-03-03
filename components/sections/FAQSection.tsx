'use client';

import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import { faqData } from '@/lib/data/faq';

export default function FAQSection() {
  return (
    <section id="faq" className="relative overflow-hidden bg-background section-padding border-t border-white/5">
      <div className="container-cyber space-y-16">
        {/* Header */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="w-20 h-20 rounded-[2rem] bg-secondary-bg border border-white/5 mx-auto flex items-center justify-center">
            <HelpCircle className="w-10 h-10 text-accent" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-text-primary uppercase">Intelligence <span className="text-accent">Baseline</span></h2>
          <p className="text-lg text-text-secondary">Technical queries regarding deployment, encryption standards, and hardware compatibility.</p>
        </div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-morphism rounded-[2rem] border border-white/5 overflow-hidden">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((faq, i) => (
                <AccordionItem key={faq.id} value={faq.id} className="border-b border-white/5 last:border-0 px-8">
                  <AccordionTrigger className="hover:no-underline py-8">
                    <div className="flex items-center space-x-6 text-left">
                      <span className="text-xs font-semibold text-accent font-mono">[{String(i + 1).padStart(2, '0')}]</span>
                      <span className="text-lg font-semibold text-text-primary uppercase tracking-tight">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8 pt-2">
                    <div className="pl-14">
                      <p className="text-text-secondary leading-relaxed text-sm font-medium max-w-2xl">{faq.answer}</p>
                      {faq.category && (
                        <div className="mt-4 inline-block px-3 py-1 rounded-full bg-accent/5 border border-accent/20">
                          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">{faq.category}</span>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
