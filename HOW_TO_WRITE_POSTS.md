# How to Write New Posts

## Option 1: GitHub Web Interface (Recommended - Simplest)

1. Go to: https://github.com/scottshapiro/scottshapiro.github.io
2. Navigate to the `_posts/` folder
3. Click "Add file" → "Create new file"
4. Name the file: `YYYY-MM-DD-your-post-title.md` (e.g., `2024-01-15-my-new-post.md`)
5. Copy the frontmatter from an existing post and edit:

```yaml
---
title: Your Post Title
date: 2024-01-15 00:00:00 -07:00
tags:
- Tag1
- Tag2
layout: post
featured_image: "/images/your-image.jpg"
featured: false
---

Your post content goes here in Markdown.
```

6. Write your post in Markdown
7. Click "Commit directly to the master branch"
8. Netlify/Cloudflare Pages will automatically rebuild and deploy your site

## Option 2: Local Development

1. Clone the repo locally
2. Create a new file in `_posts/` folder
3. Run `bundle exec jekyll serve` to preview locally
4. Commit and push when ready

## Mobile Options

- **GitHub Mobile App** (iOS/Android) - Edit files directly on your phone
- **Working Copy** (iOS) - Full Git client with markdown editor
- **GitHub Web Interface** - Works well on mobile browsers too

