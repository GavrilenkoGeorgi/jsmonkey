---
title: Setting Up Strict ESLint and What It Revealed
date: May 22, 2026 12:26 PM
draft: true
tags:
  - dev react
author: Gosha
authorImage: /uploads/author-placeholder.svg
image: /uploads/clark-van-der-beken-iqebzm8f-m4-unsplash.jpg
share: false
type: post
---

The project was running on a single-line ESLint config: `extends: "next/core-web-vitals"`. It caught obvious mistakes, but it was not really doing much. Since the codebase already had TypeScript strict mode enabled, the linter felt like it was not keeping up. So I updated it, and it turned out to be worth doing.

## What Changed in the Config

The first decision was to migrate to flat config. The project uses ESLint 10, which drops support for the legacy `.eslintrc` format entirely, so this was overdue. The new `eslint.config.mjs` stacks four layers on top of the existing Next.js rules:

- `typescript-eslint` strict preset — catches `any`, unsafe operations, and other TypeScript-specific issues
- `eslint-plugin-jsx-a11y` full recommended ruleset — the version bundled with `eslint-config-next` only enables six rules, all as warnings; the full set is broader and treats them as actual errors
- `react-hooks/exhaustive-deps` promoted from warning to error — missing dependencies in effect arrays are bugs waiting to happen, not style suggestions
- `eslint-plugin-simple-import-sort` — enforces consistent import grouping across all files

Prettier was already in use, so `eslint-config-prettier` was added last to turn off any formatting rules ESLint would otherwise conflict on.

The first run produced 48 errors. About 34 were import ordering issues, all auto-fixable. The remaining ones required reading.

## The set-state-in-effect Pattern

Most of the non-trivial errors came from `react-hooks/set-state-in-effect`, a rule in the updated `eslint-plugin-react-hooks` that flags `setState` calls made synchronously inside an effect body. The concern is that it produces cascading renders: a state change triggers an effect, the effect calls `setState`, which triggers another render. React does not batch these — the second render is a separate commit cycle.

The fixes varied depending on what each effect was actually doing.

**In `MainPageCTA`**, a hover state was being used purely as a trigger: when `isHovering` changed, an effect would call `setIconColor(getRandomColor())`. The hover state had no other purpose. The fix was to remove both the state and the effect, and call `setIconColor` directly in the event handlers. Same behavior, one render per interaction instead of two.

**In `NavBar`**, there were three separate instances. The `setMounted(true)` pattern — used to prevent hydration mismatches on the theme icon — was replaced with `useSyncExternalStore`. That hook accepts a server snapshot and a client snapshot, returning the appropriate value without any state update at all. No effect, no second render, just a value that differs between server and client by design.

The "close on outside click" effect was a case of derived state: `open` was being set to `false` whenever `isComponentVisible` became `false`. Since those two values always had to agree, the cleaner model was to compute `isMenuOpen = open && isComponentVisible` and remove the effect. The scroll-close effect was replaced with a direct scroll event listener — `setOpen(false)` inside the listener callback, not in the effect body, which is what the rule considers the valid pattern.

**In `ThemeContext`**, the init effect was reading from `localStorage` and calling `setThemeState` to replace the default value. That is exactly what lazy state initializers are for. `useState` accepts a function: `useState(() => localStorage.getItem("theme") ?? "system")`. React calls it once at mount, and the state starts correct instead of starting wrong and being corrected on the next tick. The `resolvedTheme` state was handled the same way. With both states initialized lazily, the entire effect became unnecessary and was removed.

## Why This Matters Going Forward

The immediate benefit is that the linter now catches real problems. Missing effect dependencies, accessibility attributes, `any` types, and inconsistent imports are all errors now, not things that quietly pass. That means they get caught at the point of writing, not during review or in production.

The deeper benefit is that fixing the hook violations forced a more accurate mental model of how state should flow. The `set-state-in-effect` rule is not just a style preference — it points to places where two pieces of state are being kept in sync manually, which is almost always a sign that the state model needs rethinking. In each of the cases above, the fix was not to silence the rule but to remove the redundancy it was pointing at. The code ended up simpler each time.