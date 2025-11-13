# Cloudflare Pages Setup Guide

## Quick Setup Steps

1. **Go to Cloudflare Dashboard**
   - Visit: https://dash.cloudflare.com
   - Sign in or create account

2. **Add Your Site to Cloudflare**
   - Go to "Pages" in the sidebar
   - Click "Create a project"
   - Connect your GitHub account
   - Select repository: `scottshapiro/scottshapiro.github.io`

3. **Build Settings**
   - **Framework preset**: None (or Jekyll if available)
   - **Build command**: `bundle install && bundle exec jekyll build`
   - **Build output directory**: `_site`
   - **Root directory**: `/` (leave empty)

4. **Environment Variables** (if needed)
   - Add `RUBY_VERSION = 2.7.2` if Cloudflare doesn't auto-detect

5. **Custom Domain** (IMPORTANT - Do this now!)
   - In Cloudflare Pages dashboard, go to your project
   - Click "Custom domains" tab
   - Click "Set up a custom domain"
   - Add `scottshapiro.com` 
   - Add `www.scottshapiro.com` (optional but recommended)
   - Cloudflare will show you DNS records to add

6. **Update DNS Records**
   - Go to your domain registrar (where you bought scottshapiro.com)
   - OR if DNS is managed by Cloudflare, go to Cloudflare DNS settings
   - Update/add these records:
     - **CNAME**: `scottshapiro.com` → `scottshapiro-github-io.pages.dev`
     - **CNAME**: `www` → `scottshapiro-github-io.pages.dev` (if using www)
   - Wait for DNS propagation (usually 5-15 minutes)

## Build Configuration File (Optional)

Create `wrangler.toml` in root:
```toml
name = "scottshapiro-blog"
compatibility_date = "2024-01-01"
```

## Notes

- Cloudflare Pages uses a different build system than Netlify
- You may need to adjust Ruby version in build settings
- DNS will need to point to Cloudflare instead of Netlify
- Both services are free and fast - switching is optional!

