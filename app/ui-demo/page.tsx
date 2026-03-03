'use client';

import { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  Badge,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Progress,
} from '@/components/ui';
import PrivacySection from '@/components/sections/PrivacySection';

export default function UIDemo() {
  const [progress, setProgress] = useState(45);

  return (
    <div className="min-h-screen bg-cyber-black p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-semibold text-cyber-green">UI Components Demo</h1>
          <p className="text-foreground/80">Cyber-themed ShadCN UI components</p>
        </div>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyber-green">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="lg">Large</Button>
            <Button variant="primary" disabled>Disabled</Button>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyber-green">Form Inputs</h2>
          <div className="grid gap-4 max-w-md">
            <Input type="text" placeholder="Enter your name" />
            <Input type="email" placeholder="Enter your email" />
            <Textarea placeholder="Enter your message" />
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyber-green">Cards</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Feature</CardTitle>
                <CardDescription>Advanced protection for your devices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  This card demonstrates the glassmorphism effect with cyber theme styling.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="secondary" size="sm">Learn More</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise Ready</CardTitle>
                <CardDescription>Built for scale and security</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80">
                  Hover over cards to see the neon green glow effect.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Accordion */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyber-green">Accordion</h2>
          <Accordion type="single" collapsible className="w-full max-w-2xl">
            <AccordionItem value="item-1">
              <AccordionTrigger>Network Privacy</AccordionTrigger>
              <AccordionContent>
                Advanced network privacy features including VPN support, DNS encryption, and
                traffic analysis protection.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Sensor Privacy</AccordionTrigger>
              <AccordionContent>
                Control camera, microphone, and location access with granular permissions and
                real-time monitoring.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Exploit Mitigation</AccordionTrigger>
              <AccordionContent>
                Multiple layers of exploit mitigation including memory protection, code signing,
                and sandboxing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Dialog */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyber-green">Dialog</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Secure Communication</DialogTitle>
                <DialogDescription>
                  This dialog demonstrates the cyber-themed modal with glassmorphism and glow effects.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-foreground/80">
                  The dialog includes a backdrop blur and neon green border with shadow effects.
                </p>
              </div>
              <DialogFooter>
                <Button variant="secondary">Cancel</Button>
                <Button variant="primary">Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Badges */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyber-green">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </section>

        {/* Select */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyber-green">Select</h2>
          <div className="max-w-md">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select deployment size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-50">1-50 devices</SelectItem>
                <SelectItem value="51-200">51-200 devices</SelectItem>
                <SelectItem value="201-1000">201-1000 devices</SelectItem>
                <SelectItem value="1000+">1000+ devices</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </section>

        {/* Progress */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyber-green">Progress</h2>
          <div className="max-w-md space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-foreground/80">Progress: {progress}%</span>
              </div>
              <Progress value={progress} max={100} />
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setProgress(Math.max(0, progress - 10))}
              >
                Decrease
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setProgress(Math.min(100, progress + 10))}
              >
                Increase
              </Button>
            </div>
          </div>
        </section>

        {/* Privacy Section */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyber-green">Privacy Section Component</h2>
          <p className="text-foreground/80">Full PrivacySection component with all features</p>
        </section>
      </div>

      {/* Full Privacy Section Demo */}
      <PrivacySection />
    </div>
  );
}
