---
title: The One-Line Fix That Was Hiding Behind a Week of Refactoring
date: November 24, 2026 3:31 PM
draft: false
tags:
  - ui fixes
author: Gosha
authorImage: /uploads/author-placeholder.svg
image: /uploads/qimono-cubes-2492010.jpg
share: false
type: post
---
A few days ago I shipped what I thought was a UI bug fix. A week later, I reverted almost all of it and replaced it with a single CSS unit change: **`dvh` → `svh`**. 

Four characters. That's the whole story, and also not the whole story – because getting to those four characters took a lot more work than it should have, and that's the part worth talking about.

## The bug

My app is a small PWA – a dice game, nothing fancy. Like most PWAs, it has a service worker that detects new versions and shows a banner: *"New version available, click to update."* 

QA flagged something subtle: after clicking "update" while the app was still loading, the page would reload into a layout that was just slightly too tall – enough to introduce an unwanted scrollbar on one of the game screens.

## The first theory

My first instinct was that the banner component itself was the problem. Maybe it was a layout-shifting toast, maybe it needed to defer until the page settled, maybe the whole interaction model was wrong. 

So I rebuilt it:

* Turned a fixed banner into a toast.
* Added a Redux-backed "wait until nothing on screen is still loading" mechanism.
* Deferred the actual reload until the coast was clear.

It was a reasonable-looking fix. It was also wrong. **QA re-tested. The scrollbar was still there.**

## Stepping back

At that point, the honest move was to stop patching the thing I'd already decided was broken, and ask a more boring question: *what else changed around the same time?*

Buried in the same commit as the banner refactor was an unrelated line: a CSS viewport unit, `dvh` (dynamic viewport height), used to size a couple of full-screen containers.

`dvh` resizes live as a mobile browser's address bar shows or hides. If that address bar's visibility differs by even a few pixels between the moment before a reload and the moment after, `100dvh` recalculates – and the page visibly grows or shrinks. That's not a component bug. That's not a timing bug. That's a unit that was never stable to begin with.

Swapping it for `svh` (small viewport height, which always assumes the browser's chrome is at its biggest) fixed it immediately. No toast, no loader-counter, and no deferred reload logic required.

## The cleanup

Once that was confirmed, I reverted the toast refactor back to the original banner, stripped out the Redux plumbing that existed only to work around a bug that no longer existed, and shipped four lines of CSS.

## The actual lesson

It's tempting to tell this story as *"stop refactoring things that aren't broken."* But that's not quite it – the banner refactor wasn't a bad idea in a vacuum, it was just aimed at the wrong target because I hadn't yet isolated what actually changed. 

> **The real lesson is that debugging is a search problem before it's a fix problem.** Every hour spent fixing the wrong layer is an hour you don't get back, plus new code you now have to maintain, review, and eventually revert.

The fix was trivial. Finding it wasn't. That gap – between how simple a bug sounds in the postmortem and how much work it took to actually isolate – is where time and money quietly disappear on every team, on every project, no matter how small.