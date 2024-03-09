[![Netlify Status](https://api.netlify.com/api/v1/badges/040f5a15-1020-473c-8f0c-de44f6ec5d03/deploy-status)](https://app.netlify.com/sites/jsmonkey/deploys)
## [https://jsmonkey.netlify.app/](https://jsmonkey.netlify.app/)

To run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
Also you will need [this small backend server](https://github.com/GavrilenkoGeorgi/jsm-backend) for sending emails and validating reCaptcha scores.

## General idea

Create a website with forms for sending contact messages directly from the website and a simple blog functionality using **Next.js** and **Netlify CMS**. The whole thing is deployed on Netlify and uses custom backend on Heroku for sending emails and validating reCaptcha scores before submission. Main priority was to have a good score in Lighthouse and PageInsights but still have some 'useful' functionality: forms to collect data and user managed blog that don't involve dev work. All updates (blog entries, dev updates) are deployed automatically on merge into production branch and with current setup take ~1 min to go live.
