---
title: "From Github Pages to Netlify"
tags: [ Coding ]
layout: post
featured_image: /assets/images/jekyll.png
---

I just finished migrating (unexpectedly) this Jekyll site's hosting from Github Pages to Netlify.

I loved the Github Pages hosting model for its simplicity and integration with Github proper. But I didn't realize how limited its Jekyll offering was until I upgraded my site's theme today.

Tags were one of the main reasons to upgrade. But tags completely broke. Even though the theme claimed to be Github Pages compatible, that must not have included the tagging functionality (one of the reasons I picked this theme). I later learned that [GitHub Pages doesn't support all Jekyll plugins](https://help.github.com/en/articles/configuring-jekyll-plugins). Bummer.

After exploring a few workarounds, I decided to change hosting. I have an AWS EC2 instance running, but didn't want to mess with that and have to keep it up to date / secure it. I've used Heroku in the past for my [bot]({% post_url /2017-05-27-im-building-a-bot %}) and loved the hosted model.

Netlify's free package was more than I needed, and it was simple to set up. I auth'd with my Github account, chose my repo, and setup continuous deployed hosting in just a few minutes. I updated my CNAME in Cloudflare (DNS for scottshapiro.com). The site loaded, and tagging worked! The deploy preview mode and ability to see the full build log is awesome. I had I been able to see Github's Jekyll compile log I would have been able to diagnose a lot of other errors I ran into when first building this site.

I'm still very happy to have left Wordpress and moved to Jekyll. This new theme is a little heavier: load time increased from 350ms to 800ms according to Pingdom. But Jekyll is still very simple to use. The Editorial and Working Copy apps are great for posts on the run. Atom and GitHub Desktop when at a laptop. And now Netlify downstream for hosting.
