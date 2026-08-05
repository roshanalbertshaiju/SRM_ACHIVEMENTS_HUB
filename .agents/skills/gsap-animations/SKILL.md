---
name: gsap-animations
description: GSAP timeline animations, @gsap/react useGSAP hooks, ScrollTrigger, physics celebrations, and performance-optimized motion for React/Next.js.
argument-hint: "[timeline|scroll|react|celebration]"
metadata:
  author: CelebrateSRM Team
  version: "1.0.0"
---

# GSAP Animations & Motion Mechanics

Guidelines for building high-performance animations, timeline sequences, and celebratory physics using GSAP (GreenSock Animation Platform) and `@gsap/react`.

## 📦 Setup in Next.js / React 19

```typescript
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';

gsap.registerPlugin(useGSAP);
```

---

## ⚡ Celebration FX: Badge Unlock & Rank Burst

### 1. Badge Burst Timeline
Sequential animation for badge unlocks (scale up $\rightarrow$ glow flare $\rightarrow$ particle spin):

```typescript
export const animateBadgeUnlock = (containerRef: React.RefObject<HTMLDivElement>) => {
  const tl = gsap.timeline();

  tl.fromTo(
    containerRef.current,
    { scale: 0, opacity: 0, rotate: -20 },
    { scale: 1.2, opacity: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.7)' }
  )
  .to(containerRef.current, {
    scale: 1,
    duration: 0.3,
    ease: 'power2.out'
  })
  .to('.badge-glow', {
    boxShadow: '0 0 40px rgba(251, 191, 36, 0.8)',
    repeat: 1,
    yoyo: true,
    duration: 0.4
  });
};
```

---

## 📈 Leaderboard Counter & Rank Shift Animation

Animate numbers rolling up when XP increases:

```typescript
export const animateCounter = (targetElement: HTMLElement, startVal: number, endVal: number) => {
  const obj = { val: startVal };
  gsap.to(obj, {
    val: endVal,
    duration: 1.5,
    ease: 'power3.out',
    onUpdate: () => {
      targetElement.innerText = Math.round(obj.val).toLocaleString() + ' XP';
    }
  });
};
```

---

## 🎯 Best Practices for Next.js
1. Always wrap GSAP calls inside `useGSAP` hook for automatic cleanup on unmount.
2. Use `will-change: transform` or `transform: translate3d(0,0,0)` for hardware acceleration.
3. Keep animations responsive across mobile and desktop breakpoints.
