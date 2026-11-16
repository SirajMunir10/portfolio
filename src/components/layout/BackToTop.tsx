'use client'

import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { useI18n } from '@/i18n/I18nProvider'

/** Small button that appears once the visitor is well down the page. */
export function BackToTop() {
  const { dict } = useI18n()
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > window.innerHeight * 1.5))

  return (
    <AnimatePresence>
      {visible ? (
        <motion.a
          href="#top"
          aria-label={dict.common.backToTop}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="glass fixed start-6 bottom-6 z-30 hidden size-11 place-items-center rounded-full border border-border text-muted transition-colors hover:text-text sm:grid"
        >
          <ArrowUp className="size-4.5" aria-hidden />
        </motion.a>
      ) : null}
    </AnimatePresence>
  )
}
