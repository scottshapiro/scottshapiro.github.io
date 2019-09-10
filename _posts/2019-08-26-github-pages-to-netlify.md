---
title: 'Jekyll: From Github Pages to Netlify'
date: 2019-08-25 17:00:00 -07:00
tags:
- Coding
layout: post
featured_image: "/assets/images/jekyll.png"
---

I just finished migrating (unexpectedly) this Jekyll site's hosting from Github Pages to Netlify. So far, I'm very happy with the decision for performance and functionality reasons.

I loved the Github Pages hosting model for its simplicity and integration with Github proper. But I didn't realize how limited its Jekyll offering was until I upgraded my site's theme today.

Tags were one of the main reasons to upgrade. But tags completely broke my setup. Even though the theme claimed to be Github Pages compatible. I later learned that [GitHub Pages doesn't support all Jekyll plugins](https://help.github.com/en/articles/configuring-jekyll-plugins). Bummer.

After exploring a few workarounds, I decided to change hosting. I have an AWS EC2 instance running, but didn't want to mess with that and have to keep it up to date / secure it. I've used Heroku in the past for my [bot]({% post_url /2017-05-27-im-building-a-bot %}) and loved the hosted model.

Netlify's free package was more than I needed, and it was simple to set up. I auth'd with my Github account, chose my repo, and setup continuous deployed hosting in just a few minutes. I updated my www CNAME record in Cloudflare (DNS for scottshapiro.com). The site loaded, and tagging worked! After 45 minutes, my new Letsencrypt HTTPS cert kicked in.

Netlify's deploy preview mode and ability to see the full build log is awesome. Had I been able to see Github's Jekyll compile log, I would have been able to diagnose a lot of other errors I ran into when first building this site. Netlify also supports deployment and hosting of branches beyond master.

I'm still very happy to have left Wordpress and moved to Jekyll primarily for speed and minimalism. This new theme is a little heavier: load time increased from 350ms to 800ms according to Pingdom. But Jekyll is still very simple to use. The Editorial and Working Copy apps are great for posts on the run. Atom and GitHub Desktop when at a laptop. And now Netlify downstream for hosting.
