# Cloudflare Pages Deployment

This site is ready for Cloudflare Pages as a static site.

## What to deploy

Deploy the contents of `ArapearlyAI-website/`.

The site does not require a build step.

## Recommended Pages settings

- Framework preset: `None`
- Build command: leave blank
- Output directory: leave blank if uploading the folder directly
- Root directory: `ArapearlyAI-website`

## Custom domain

Point `arapearly.ai` to the Pages project in Cloudflare, then optionally add `www.arapearly.ai` as an alias.

If you want `arapearly.com` to redirect, create a second Pages route or a separate redirect rule in Cloudflare.

## Security notes

- Keep HTTPS enabled.
- Add SPF, DKIM, and DMARC for the sending domain before marketing email.
- Restrict admin access with MFA.
- Use the contact form only for business context, not sensitive security details.

## Fast path to publish

### Option 1: GitHub-connected deployment

1. Create a GitHub repository for the site.
2. Push the contents of `ArapearlyAI-website/` to the repository.
3. In Cloudflare Pages, connect the GitHub repository.
4. Set the root directory to `ArapearlyAI-website` if the repo contains multiple folders, or `.` if this folder is the repository root.
5. Leave the build command blank and set the output directory to `.`.
6. Deploy the project.
7. Attach the `arapearly.ai` custom domain.
8. Verify the `_headers` file is being served.

### Option 2: Direct upload

1. Create a new Cloudflare Pages project.
2. Connect the `ArapearlyAI-website` folder.
3. Deploy the project.
4. Attach the `arapearly.ai` custom domain.
5. Verify the `_headers` file is being served.
