import { ArrowRight, Download } from 'lucide-react'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'

export default function HomePage() {
  return (
    <main className="container-page py-20">
      <div className="mb-10 flex justify-end">
        <ThemeToggle />
      </div>
      <SectionHeading
        eyebrow="Design system"
        title="Siraj Munir"
        description="Tokens, themes and base components."
      />
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="#work">
          See my work{' '}
          <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
        </ButtonLink>
        <Button variant="secondary">
          <Download className="size-4" /> Resume
        </Button>
        <Button variant="ghost">Contact</Button>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">
        <Badge>Python</Badge>
        <Badge tone="accent">RAG</Badge>
        <Badge tone="teal">Voice AI</Badge>
      </div>
      <Card interactive className="mt-8 max-w-md p-6">
        <h3 className="text-lg font-semibold">Card</h3>
        <p className="mt-2 text-muted">Hover to lift.</p>
      </Card>
    </main>
  )
}
