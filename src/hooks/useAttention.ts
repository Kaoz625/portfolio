import { useEffect, useRef } from 'react'
import { track } from '../lib/posthog'

export function useAttention(projectId: string) {
  const entryTime = useRef<number | null>(null)
  const touchStartTime = useRef<number | null>(null)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Intersection observer — works on all devices
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entryTime.current = Date.now()
        } else if (entryTime.current) {
          const scrollH = document.body.scrollHeight - window.innerHeight
          track('project_card_attention', {
            project_id: projectId,
            dwell_ms: Date.now() - entryTime.current,
            scroll_pct: scrollH > 0 ? Math.round((window.scrollY / scrollH) * 100) : 0,
            is_touch: navigator.maxTouchPoints > 0,
          })
          entryTime.current = null
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)

    // Touch events — explicit dwell on mobile tap-and-hold
    function onTouchStart() { touchStartTime.current = Date.now() }
    function onTouchEnd() {
      if (touchStartTime.current) {
        const dwell = Date.now() - touchStartTime.current
        if (dwell > 300) {
          track('project_card_touch_dwell', { project_id: projectId, dwell_ms: dwell })
        }
        touchStartTime.current = null
      }
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })

    return () => {
      observer.disconnect()
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchend', onTouchEnd)
    }
  }, [projectId])

  return ref
}
