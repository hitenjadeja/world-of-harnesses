# Project workflow

- After completing and validating changes, commit and push them to `origin` unless the user explicitly says not to.
- For catalog or site changes, a successful push is not completion: monitor the GitHub Pages workflow and verify the published site returns HTTP 200 and contains the changed catalog entry before reporting success.
- Keep commits scoped to this repository and do not stage unrelated files.
- In Codex Desktop, verify GitHub authentication with keyring access before reporting an authentication problem. A sandboxed `gh auth status` failure can mean the sandbox cannot read the keyring; rerun the check with the required host permissions before asking the user to log in.
- Use the repo-scoped `$discover-harnesses` skill for catalog discovery or refresh requests; `npm run refresh` alone does not discover projects outside the known upstream source.
