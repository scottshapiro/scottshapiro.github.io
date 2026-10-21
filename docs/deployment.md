# Production deployment and rollback

GitHub holds the source on `master`. Cloudflare Pages is the intended sole
production host. Confirm the live Cloudflare project and domain bindings through
the authenticated account before changing GitHub Pages or DNS. The repository's
historical project guide names `scottshapiro-github-io`; a reachable pages.dev
hostname alone does not prove the current production configuration.

## Build

- Ruby: `3.4.11`, as pinned by `.ruby-version` and `Gemfile`.
- Bundler: `2.6.9`, as pinned in `Gemfile.lock`.
- Build command: `bundle install && bundle exec jekyll build --trace`.
- Build output: `_site`; root directory: repository root.
- Set `RUBY_VERSION=3.4.11`, `JEKYLL_ENV=production`, and `BUNDLE_FROZEN=true`
  in the Cloudflare production and preview build environments.
- Keep preview branch builds enabled for `chore/site-security-hardening`.

Local checks:

```sh
bundle install
JEKYLL_ENV=production bundle exec jekyll build --trace
python3 scripts/check_site.py
npm ci --ignore-scripts
npx playwright install chromium
npm test
```

Set `SITE_CHROMIUM` to an installed Chromium executable if needed. The browser
preview server enforces the candidate CSP locally. Preview hostnames do not load
GA4 or send page views; production initializes the single configured GA4 property.
The existing RSS feed and its `/feed.xml` URL are retained for subscribers.

## Production promotion

1. Record current Pages project/source/build configuration, domain bindings,
   DNS records, redirect rules, TLS/security settings, and active deployment ID.
   Redact every secret/environment value in the change record.
2. Deploy the branch preview and require a green GitHub `site` check. Verify
   the homepage, post and tag pagination, old media, code highlighting, Spotify
   and Twitter embeds, newsletter action, and custom 404. Do not submit forms.
3. Confirm both custom domains have valid certificates. Keep all mail DNS and
   unrelated records intact. Configure the primary as `scottshapiro.com`.
4. Merge the reviewed branch and record the Cloudflare deployment ID and exact
   source SHA. Verify the actual built Ruby/Jekyll versions in the build logs.
5. Verify HTTPS apex, the path-preserving `www` redirect, HTTP redirects, all
   security headers, and 404/410 for the removed log from an external network.
6. Promote the report-only CSP to enforcement after those pages and their
   third-party resources show no required-resource CSP violations. Inline styles
   remain allowed for the legacy theme/FitVids; inline scripts remain disallowed.
7. Enable HSTS only after TLS checks pass: initially `max-age=86400`, with no
   subdomains/preload; after a clean day raise to `max-age=31536000`.
8. Remove the GitHub Pages custom-domain setting and disable GitHub Pages only
   after the Cloudflare production route is proven healthy.
9. Inventory historical Cloudflare deployment/branch URLs for the leaked path.
   After the clean deployment is active, remove or restrict vulnerable historical
   deployments, retaining only clean rollback candidates. Purge the exact leaked
   URL from edge cache if still served. A source-history rewrite does not remove
   already deployed artifacts or caches.

The repository includes `_headers` and `_redirects` explicitly in Jekyll output.
These files apply to Cloudflare Pages static responses. Pages Functions, if ever
introduced, must set equivalent headers themselves.

## History purge

The live file must be removed by an ordinary source deployment first. Freeze
pushes during the rewrite, reconcile the latest remote refs, and record any
protection changes before relaxing them. This operation changes commit IDs and
invalidates old signatures/commit permalinks; collaborators must use fresh clones.

Make a fresh full mirror, not a partial clone. Keep its unfiltered backup in a
private directory with mode `0700`, accessible only to the owner. It contains the
exposed personal data: record a seven-day retention deadline and dispose of it
through the approved recovery process after verification. Do not upload it.

Run current git-filter-repo on a separate fresh full mirror:

```sh
git filter-repo --sensitive-data-removal --invert-paths \
  --path wp-content/uploads/mc4wp-debug-log.php
```

Preserve and rewrite all remote branches and tags; do not delete stale branches
just to simplify removal. Verify every reachable object's contents, not just the
current tree. Report only path/object counts, never the exposed address. Reconcile
the before/after ref inventory, push exact rewritten branches/tags with expected
old SHAs, and restore any changed branch protection. Avoid a broad mirror push
that could alter unreviewed GitHub-managed refs.

Reverify Cloudflare after the source SHAs change. GitHub pull-request refs and
cached/unreachable objects may require GitHub Support cleanup. Forks, third-party
caches, and existing clones are separate copies; a force push cannot erase them.

## Rollback

Keep the immediate log-removal commit in every rollback. Before history cleanup,
revert only the later hardening commit or select a clean Cloudflare deployment.
Never roll back to a deployment containing the log. Restore headers/redirects to
their captured prior values if necessary. After history cleanup use only rewritten
clean commits; never force-push the sensitive backup as a routine rollback.
