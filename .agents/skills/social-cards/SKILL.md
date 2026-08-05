---
name: social-cards
description: Dynamic open graph images, badge export templates, html-to-image canvas rendering, and shareable student achievement cards for LinkedIn/Twitter.
argument-hint: "[generate|template|export|linkedin]"
metadata:
  author: CelebrateSRM Team
  version: "1.0.0"
---

# Dynamic Social Cards & Badge Share Engine

Templates and helpers for exporting high-resolution achievement badges and milestone share cards (1200x630px) formatted for LinkedIn, Twitter/X, and Instagram.

## 🖼️ Shareable Card Component Structure

A visually rich 1200x630px layout designed to impress recruiters on social feeds:

```tsx
export const AchievementShareCard = ({ studentName, achievementTitle, category, xp, date, badgeTier }) => {
  return (
    <div 
      id="share-card-node"
      className="w-[1200px] h-[630px] bg-slate-950 text-white p-12 flex flex-col justify-between rounded-3xl relative overflow-hidden border border-amber-500/30"
    >
      {/* Background Gradient Orbs */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      {/* Header Branding */}
      <div className="flex justify-between items-center z-10">
        <span className="text-2xl font-black tracking-wider text-amber-400">CELEBRATE SRM</span>
        <span className="px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-sm font-semibold">
          {badgeTier} VERIFIED BADGE
        </span>
      </div>

      {/* Main Content */}
      <div className="z-10 my-auto">
        <h2 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-white via-slate-200 to-amber-300 bg-clip-text text-transparent">
          {achievementTitle}
        </h2>
        <p className="text-2xl text-slate-300">
          Awarded to <span className="font-bold text-white underline decoration-amber-400 underline-offset-4">{studentName}</span>
        </p>
      </div>

      {/* Footer Info */}
      <div className="flex justify-between items-end z-10 pt-6 border-t border-slate-800">
        <div>
          <p className="text-slate-400 text-sm">Category</p>
          <p className="text-lg font-bold text-slate-200">{category}</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-amber-400">+{xp} XP</p>
          <p className="text-xs text-slate-400">{date}</p>
        </div>
      </div>
    </div>
  );
};
```

---

## 💾 Export to High-Res Image (`html-to-image`)

```typescript
import { toPng } from 'html-to-image';

export const downloadSocialCard = async (elementId = 'share-card-node', filename = 'achievement.png') => {
  const node = document.getElementById(elementId);
  if (!node) return;

  const dataUrl = await toPng(node, {
    quality: 1.0,
    pixelRatio: 2, // Retina HD rendering
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
};
```
