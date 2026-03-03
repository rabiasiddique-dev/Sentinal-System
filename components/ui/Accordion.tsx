'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className = '', ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={`border-b border-cyber-gray-700 ${className}`}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className = '', children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={`flex flex-1 items-center justify-between py-4 px-6 font-medium text-left text-cyber-green transition-all hover:bg-cyber-green/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyber-green focus-visible:ring-offset-2 focus-visible:ring-offset-cyber-black [&[data-state=open]>svg]:rotate-180 ${className}`}
      {...props}
    >
      {children}
      <svg
        className="h-5 w-5 shrink-0 transition-transform duration-300 text-cyber-green"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className = '', children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-[accordion-up_0.2s_ease-out] data-[state=open]:animate-[accordion-down_0.2s_ease-in]"
    {...props}
  >
    <div className={`px-6 pb-4 pt-0 text-foreground/90 ${className}`}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
