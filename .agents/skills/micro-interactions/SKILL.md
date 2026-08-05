---
name: micro-interactions
description: Micro-interactions, button tactile feedback, hover card tilt effects, XP popups, sound/haptic cues, and celebration FX for student engagement.
argument-hint: "[button|card-tilt|xp-popup|haptics|celebration]"
metadata:
  author: CelebrateSRM Team
  version: "1.0.0"
---

# Micro-Interactions & Celebration FX

Guidelines for subtle UI interactions, tactile button responses, dynamic card hover states, and celebratory feedback loops.

## 🎯 3D Tilt Card Effect on Hover

Give student achievement cards a premium 3D physical depth on hover:

```typescript
export const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;

  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
};

export const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
  e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
};
```

---

## ⚡ Floating XP Popups (+150 XP!)

When a student submits an achievement or claims a reward, render a floating floating indicator that rises and fades out:

```tsx
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingXpPop = ({ xp, x, y }: { xp: number; x: number; y: number }) => (
  <motion.div
    initial={{ opacity: 1, y: y, x: x, scale: 0.8 }}
    animate={{ opacity: 0, y: y - 60, scale: 1.3 }}
    transition={{ duration: 1.2, ease: 'easeOut' }}
    className="fixed pointer-events-none z-50 font-black text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)] text-2xl"
  >
    +{xp} XP 🚀
  </motion.div>
);
```

---

## 🔔 Kudos & Like Button Pulse Interaction

Heart/Kudos button spring bounce on click:

```tsx
<motion.button
  whileTap={{ scale: 0.85 }}
  whileHover={{ scale: 1.15 }}
  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
  className="p-2 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-400"
>
  👏 Celebrate
</motion.button>
```
