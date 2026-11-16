import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group/button inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-contrast shadow-card hover:bg-accent-hover',
  secondary: 'border border-border-strong bg-surface text-text hover:border-text/40 hover:bg-surface-2',
  ghost: 'text-muted hover:bg-surface-2 hover:text-text',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-12 px-6 text-base',
}

type Common = { variant?: Variant; size?: Size; className?: string; children: ReactNode }

export function buttonClasses({ variant = 'primary', size = 'md', className }: Omit<Common, 'children'>) {
  return cn(base, variants[variant], sizes[size], className)
}

type ButtonProps = Common & ComponentProps<'button'>

export function Button({ variant, size, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
    </button>
  )
}

type ButtonLinkProps = Common & { href: string; external?: boolean } & Omit<ComponentProps<'a'>, 'href'>

/** A link styled as a button. External links open in a new tab safely. */
export function ButtonLink({ href, external, variant, size, className, children, ...rest }: ButtonLinkProps) {
  const classes = buttonClasses({ variant, size, className })
  if (external || href.startsWith('http') || href.startsWith('mailto:')) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  )
}
