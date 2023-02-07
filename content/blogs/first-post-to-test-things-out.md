---
title: First post to test things out
date: February 7, 2023 3:56 PM
draft: false
tags:
  - stuff
author: JSMonkey
authorImage: /uploads/author-placeholder.svg
image: /uploads/third-pattern.png
share: false
type: post
---
# The Setup

So. This is the first post on the new build. A lot of things still needs to be done, but the main ones are here:

* Contact form for sending emails form the website
* reCaptcha
* List of projects
* Netlify headless CMS to add blog posts

The idea was to build minimalistic website with a blog using Next.js and Netlify CMS with some custom backend on Node.js for sending emails and validating reCaptcha score. Frontend part is hosted on netlify, mostly because of the CMS that it is using. Backend is hosted on Heroku and is used to validate reCaptcha score of the form submissions.