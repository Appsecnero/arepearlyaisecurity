# Arapearly AI Security Website

Static multi-page marketing site for Arapearly AI Security.

## Local preview

Open `index.html` directly in a browser or serve the folder with any static file server.

## Cloudflare Pages

This folder is ready to deploy to Cloudflare Pages.

Recommended settings:

- Framework preset: `None`
- Build command: none
- Build output directory: `.`
- Root directory: `ArapearlyAI-website`

## GitHub workflow

If you want Cloudflare Pages to deploy from GitHub, push the contents of this folder to a repository and connect that repo in Cloudflare Pages.

Suggested repository name:

- `arapearly-ai-security`

If this folder is the repository root, set the root directory to `.`.
If the repository contains multiple folders, set the root directory to `ArapearlyAI-website`.

Then in Cloudflare Pages:

1. Connect the GitHub repository.
2. Leave the build command blank.
3. Set the output directory to `.`.
4. Deploy the project.
5. Attach `arapearly.ai` as the custom domain.

Alternative deployment with Wrangler:

```bash
wrangler pages deploy . --project-name arapearly-ai-security
```

## Included pages

- Home
- Services
- Solutions
- Approach
- Resources
- About
- Contact
- AI Security Assessment
- AI Agent Security
- LLM Security
- MCP Security
- RAG Security
- AI Supply Chain Security
- Privacy
- Terms
