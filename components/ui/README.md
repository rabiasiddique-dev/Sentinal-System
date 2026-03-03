# UI Components

Cyber-themed UI components built with Radix UI primitives and styled with Tailwind CSS.

## Components

### Button

A versatile button component with multiple variants and sizes.

**Variants:**
- `primary` - Neon green background with hover glow effect
- `secondary` - Glassmorphism with green border
- `ghost` - Transparent with green text

**Sizes:**
- `sm` - Small (h-9, px-3)
- `md` - Medium (h-11, px-6) - default
- `lg` - Large (h-14, px-8)

**Usage:**
```tsx
import { Button } from '@/components/ui';

<Button variant="primary" size="md">Click Me</Button>
```

### Input

Text input with cyber theme styling and glassmorphism effect.

**Usage:**
```tsx
import { Input } from '@/components/ui';

<Input type="email" placeholder="Enter email" />
```

### Textarea

Multi-line text input with cyber theme styling.

**Usage:**
```tsx
import { Textarea } from '@/components/ui';

<Textarea placeholder="Enter message" rows={5} />
```

### Card

Container component with glassmorphism and hover glow effects.

**Sub-components:**
- `CardHeader` - Header section
- `CardTitle` - Title with cyber-green color
- `CardDescription` - Subtitle text
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Usage:**
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>Feature Title</CardTitle>
    <CardDescription>Feature description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Accordion

Collapsible content sections with smooth animations.

**Usage:**
```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Section Title</AccordionTrigger>
    <AccordionContent>
      Section content goes here
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Dialog

Modal dialog with backdrop blur and cyber theme styling.

**Sub-components:**
- `DialogTrigger` - Trigger button
- `DialogContent` - Modal content container
- `DialogHeader` - Header section
- `DialogTitle` - Title text
- `DialogDescription` - Description text
- `DialogFooter` - Footer section

**Usage:**
```tsx
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>Dialog description</DialogDescription>
    </DialogHeader>
    <div>Dialog content</div>
  </DialogContent>
</Dialog>
```

### Badge

Small label component with different variants.

**Variants:**
- `default` - Cyber green with low opacity
- `success` - Bright cyber green
- `warning` - Yellow
- `error` - Cyber red

**Usage:**
```tsx
import { Badge } from '@/components/ui';

<Badge variant="success">Active</Badge>
```

### Select

Dropdown select component with cyber theme styling.

**Usage:**
```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui';

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

### Progress

Progress bar with neon green gradient and glow effect.

**Usage:**
```tsx
import { Progress } from '@/components/ui';

<Progress value={45} max={100} />
```

## Theme Colors

The components use the following cyber theme colors:

- `cyber-black`: #0B0B0F - Background
- `cyber-green`: #00FF88 - Primary accent
- `cyber-red`: #FF2E2E - Error/alert
- `cyber-gray-900`: #1A1A1F - Dark gray
- `cyber-gray-800`: #25252D - Medium gray
- `cyber-gray-700`: #35353F - Light gray

## Effects

### Glassmorphism

Components use the `.glass` utility class for glassmorphism effects:
- Semi-transparent background
- Backdrop blur
- Subtle border

### Glow Effects

Interactive elements feature neon green glow on hover:
- Buttons: `shadow-[0_0_20px_rgba(0,255,136,0.3)]`
- Cards: `shadow-[0_0_20px_rgba(0,255,136,0.15)]`
- Dialogs: `shadow-[0_0_30px_rgba(0,255,136,0.3)]`

## Accessibility

All components include:
- Keyboard navigation support
- Focus indicators with cyber-green ring
- ARIA attributes where applicable
- Screen reader support

## Demo

Visit `/ui-demo` to see all components in action.
