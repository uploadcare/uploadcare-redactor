# Development

Use Node.js 22 or newer and run `npm install`.

## Build and lint

`npm run build` bundles `src/` with Vite into `dist/uploadcare.redactor.js`
and `dist/uploadcare.redactor.min.js`, as ES2015. `npm run dev` rebuilds on
every change. `npm run lint` checks the code with oxlint.

`npm start` serves the repository with Vite at http://localhost:3000; the
demos under `demo/` load the plugin from `dist/`, so run `npm run build` or
`npm run dev` first.

## Tests

```sh
npx playwright install chromium   # once
npm test
```

`npm test` builds the plugin, then runs the end-to-end tests in headless
Chromium with Vitest browser mode. The tests use the real Redactor builds from
`demo/`, the built plugin and Uploadcare Widget from the CDN, and they upload
real files to Uploadcare, so they need network access.

Every case is written once in `test/suite.js` and runs for each Redactor
version; `test/adapters.js` holds what differs between versions.

The tests upload to the Uploadcare demo project, which only accepts images, so
the test for files that are not images is skipped. To run it, set the public
key of a project that accepts any file:

```sh
UPLOADCARE_PUBLIC_KEY=your_public_key npm test
```

Redactor 5 is licensed, so its build is not in the repository and its tests are
skipped. To run them, put a licensed build at
`test/vendor/redactor5/redactor.min.js` and `redactor.min.css`; the folder is
ignored by git. The Redactor 5 adapter has not run against a real build yet,
so its selectors may need adjusting the first time.

## CI

GitHub Actions runs three workflows from `.github/workflows/`:

* `ci.yml` runs lint, the tests and the build on every push to `master` and
  every pull request. The build keeps the bundles as the `dist` artifact, and a
  failed test run keeps its screenshots as `test-screenshots`.
* `release.yml` runs release-please on every push to `master`; see below.
* `deploy.yml` publishes a release to the `release` branch and the demo.

The tests use the `UPLOADCARE_PUBLIC_KEY` repository secret when it is set, so
the test for files that are not images also runs in CI.

## Commit messages

Write commit messages, or pull request titles when you squash merge, in the
[Conventional Commits](https://www.conventionalcommits.org/) format. They
decide the next version and become the changelog:

* `fix: ...` makes a patch release, listed under Bug Fixes.
* `feat: ...` makes a minor release, listed under Features.
* `feat!: ...`, or a `BREAKING CHANGE:` line in the body, makes a major
  release.
* Other types, like `docs:`, `test:`, `ci:` or `chore:`, are not listed.

release-please skips messages in other formats.

## Releasing

Releases are automatic. On every push to `master`,
[release-please](https://github.com/googleapis/release-please) opens or updates
a release pull request with the next version in `package.json` and the new
`CHANGELOG.md` entry. Review it and merge it when you want to release. Merging
it:

1. tags the release and creates the GitHub release with the changelog entry,
2. builds the tag and attaches both JavaScript bundles to the release,
3. pushes the build to the `release` branch and the demo to `gh-pages`.

It does not publish to npm. To redeploy or roll back, run **Deploy** in Actions
by hand with a release tag, for example `v3.2.0`.

The first release is pinned to 3.2.0 by `release-as` in
`release-please-config.json`. Remove that line after 3.2.0 is released, or
every later release pull request will stay at 3.2.0.

release-please uses the workflow's built-in token. In Settings, Actions,
General, turn on **Allow GitHub Actions to create and approve pull requests**,
or it can't open the release pull request.
