---
name: gamification
description: Gamification architecture, XP economy, badge unlocks, leaderboards, celebration animations, social card generation, and student engagement loops for CelebrateSRM.
argument-hint: "[xp|badges|leaderboard|celebrate|social-card]"
metadata:
  author: CelebrateSRM Team
  version: "1.0.0"
---

# Gamification Engine for CelebrateSRM

Guidelines and mechanics for gamifying student achievement tracking, point economies, badge awards, celebratory micro-interactions, dynamic social cards, and leaderboards.

## 🏆 XP & Point Economy

| Category | XP Awarded | Verification Level |
| :--- | :--- | :--- |
| **Hackathon Win (1st/2nd/3rd)** | 500 XP | Faculty Verified |
| **Research Paper Publication** | 400 XP | HOD / Faculty Verified |
| **Industry Certification** | 200 XP | Certificate Proof Required |
| **Project Presentation / Expo** | 150 XP | Faculty Verified |
| **Workshop / Seminar Attended** | 50 XP | Self-Reported + Proof |
| **Community / Event Volunteering** | 75 XP | Event Coordinator Verified |

### Level Calculation Formula
$$ Level = \lfloor \sqrt{\frac{TotalXP}{100}} \rfloor + 1 $$

---

## 🎖️ Badge & Tier System

1. **Bronze Tier:** Initial achievements (100 - 499 XP)
2. **Silver Tier:** Consistent participation (500 - 1,499 XP)
3. **Gold Tier:** High-impact wins (1,500 - 3,499 XP)
4. **Platinum / Legendary Tier:** Department Champion (3,500+ XP)

### Special Badges
- **Flame Achiever:** 3 achievements posted within 30 days.
- **Hackathon Ace:** 3+ hackathon podium finishes.
- **Scholar Badge:** Published research paper or patent.

---

## 🎉 Celebratory Trigger Patterns

### Confetti Burst (`canvas-confetti`)
Trigger upon achievement submit approval or badge unlock:
```typescript
import confetti from 'canvas-confetti';

export const triggerCelebration = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
};
```

---

## 📸 Dynamic Social Card Sharing (`html-to-image`)

Export verified student badges directly to downloadable/shareable images for LinkedIn and Instagram:

```typescript
import { toPng } from 'html-to-image';

export const exportBadgeCard = async (elementId: string) => {
  const node = document.getElementById(elementId);
  if (!node) return;
  const dataUrl = await toPng(node, { quality: 0.95 });
  const link = document.createElement('a');
  link.download = 'celebrate-srm-badge.png';
  link.href = dataUrl;
  link.click();
};
```
