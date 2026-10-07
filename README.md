# Uploadcare Widget for Redactor

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-redactor">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://ucarecdn.com/0c643d09-f5cb-47f5-ac55-8e5273819476/uploadcare-logo-mark-inverted.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://ucarecdn.com/4f546650-8772-4222-baf3-2ad2d5a855b0/uploadcare-logo-mark.svg">
      <img align="right" width="64" height="64"
           src="https://ucarecdn.com/4f546650-8772-4222-baf3-2ad2d5a855b0/uploadcare-logo-mark.svg"
           alt="">
    </picture>
</a>

This is a plugin for [Imperavi Redactor][redactor] that lets you upload files
to the editor with [Uploadcare Widget][uc-widget-docs].

> [!WARNING]
> Uploadcare deprecated Uploadcare Widget on September 1, 2025. It is the same
> product that the Uploadcare docs now call jQuery File Uploader. It gets no new
> versions, and Uploadcare only fixes critical security issues in it. We're
> working on support for the modern [File Uploader][uc-file-uploader-docs] in
> this plugin.

[![GitHub release][badge-release-img]][badge-release-url]&nbsp;
[![Uploadcare stack on StackShare][badge-stack-img]][badge-stack-url]

## Pick your Redactor version

The plugin supports Redactor 5, X, 3 and 2. Setup, options and events differ
between them, so each version has its own guide:

| Redactor | Guide | Demo |
|---|---|---|
| Redactor 5 | [Redactor 5 guide](docs/redactor-5.md) | none yet |
| Redactor X | [Redactor X guide](docs/redactor-x.md) | [Redactor X demo][demo-x] |
| Redactor 3 | [Redactor 3 guide](docs/redactor-3.md) | [Redactor 3 demo][demo-3] |
| Redactor 2 | [Redactor 2 guide](docs/redactor-2.md) | [Redactor 2 demo][demo-2] |

## Install

Download the latest plugin archive from the [release branch][github-branch-release]
or the [releases page][github-releases], and put `uploadcare.redactor.min.js`
in your Redactor plugins folder. The guide for your Redactor version shows how
to add it to the page and set it up.

## Security issues

If you think you ran into something in Uploadcare libraries which might have
security implications, please hit us up at [bugbounty@uploadcare.com][uc-email-bounty]
or Hackerone.

We'll contact you personally in a short time to fix an issue through co-op and
prior to any public disclosure.

## Feedback

Issues and PRs are welcome. You can provide your feedback or drop us a support
request at [hello@uploadcare.com][uc-email-hello].

[redactor]: https://imperavi.com/redactor/
[uc-widget-docs]: https://uploadcare.com/docs/uploads/file-uploader/?utm_source=github&utm_campaign=uploadcare-redactor
[uc-file-uploader-docs]: https://uploadcare.com/docs/file-uploader/?utm_source=github&utm_campaign=uploadcare-redactor
[badge-release-img]: https://img.shields.io/github/release/uploadcare/uploadcare-redactor.svg
[badge-release-url]: https://github.com/uploadcare/uploadcare-redactor/releases
[badge-stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[badge-stack-url]: https://stackshare.io/uploadcare/stacks/
[demo-x]: https://uploadcare.github.io/uploadcare-redactor/demo/redactorX/?utm_source=github&utm_campaign=uploadcare-redactor
[demo-3]: https://uploadcare.github.io/uploadcare-redactor/demo/redactor3/?utm_source=github&utm_campaign=uploadcare-redactor
[demo-2]: https://uploadcare.github.io/uploadcare-redactor/demo/redactor2/?utm_source=github&utm_campaign=uploadcare-redactor
[github-branch-release]: https://github.com/uploadcare/uploadcare-redactor/tree/release
[github-releases]: https://github.com/uploadcare/uploadcare-redactor/releases
[uc-email-bounty]: mailto:bugbounty@uploadcare.com
[uc-email-hello]: mailto:hello@uploadcare.com
