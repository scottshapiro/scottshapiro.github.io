# Security maintenance

Uploads contain historical images/video used by the blog. PHP, logs, server
configuration, credentials, and unexpected non-media uploads are rejected by the
artifact check. `.gitignore` is only a convenience; it does not untrack files or
remove existing history.

The frontend retains GA4 only. Firebase Performance, Amplitude, and Universal
Analytics were removed. The old Firebase client configuration was public by
design, not a server credential. The owner should independently review the
Firebase project's database/storage rules, allowed APIs and key restrictions,
project ownership, and whether the unused project should be retired. No Firebase
resource access or configuration change is part of this repair.

The owner decides whether to notify the person whose address appeared in the
legacy debug log. History cleanup and host/cache checks are described in
`docs/deployment.md`. Do not place the address in issues, PRs, build logs, or notes.

Bundler, npm, and GitHub Actions receive monthly Dependabot updates. jQuery and
Prism are vendored static assets; check their upstream security releases when
updating the site. Their versions and licenses are documented in
`docs/third-party-notices.md`.
