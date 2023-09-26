# File Uploader by Uploadcare

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-redactor">
    <img align="right" width="64" height="64"
         src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
         alt="">
</a>

This is a plugin for [Imperavi Redactor][redactor] providing it to
work with [Uploadcare Widget][uc-feature-widget].

[![GitHub release][badge-release-img]][badge-release-url]&nbsp;
[![Uploadcare stack on StackShare][badge-stack-img]][badge-stack-url]

* [Demo](#demo)
* [Requirements](#requirements)
* [Install](#install)
* [Usage](#usage)
  * [Redactor X](#redactor-X)
  * [Redactor 3](#redactor-3)
  * [Redactor 2](#redactor-2)
* [Configuration](#configuration)
  * [Plugin configuration](#plugin-configuration)
  * [Widget configuration](#widget-configuration)
* [Security issues](#security-issues)
* [Feedback](#feedback)

## Demo

Check out the basic demo for:

* [Redactor 3][demo-3]
* [Redactor 2][demo-2]

## Requirements

Imperavi Redactor 2, 3 or X.

## Install

Download the latest plugin archive from the [release branch][github-branch-release]
or [releases page][github-releases].

Extract the downloaded archive to the plugin directory of your Redactor
installation.

Then, place the plugin in your page after embedding `redactor.js`:

```html
<!-- redactor js -->
<script src="/your-folder/redactor.js"></script>

<!-- plugin js -->
<script src="/your-folder/plugins/uploadcare.redactor.min.js"></script>
```

## Usage

Add `uploadcare` to the list of your Redactor plugins.
**Set your [public key][uc-widget-docs-option-public-key]**. Public keys are
used to identify a target Uploadcare [project][uc-projects] your uploads will
go to.

### Redactor X

```javascript
RedactorX('#editor', {
  plugins: ['uploadcare'],
  uploadcare: {
    buttonIconEnabled: true,
    publicKey: 'YOUR_PUBLIC_KEY',
  }
})
```

### Redactor 3

```javascript
$R('#editor', {
  plugins: ['uploadcare'],
  uploadcare: {
    buttonIconEnabled: true,
    publicKey: 'YOUR_PUBLIC_KEY',
  }
})
```

### Redactor 2

```javascript
$('#editor').redactor({
  plugins: ['uploadcare'],
  uploadcare: {
    buttonIconEnabled: true,
    publicKey: 'YOUR_PUBLIC_KEY',
  }
})
```

## Configuration

### Plugin configuration

To apply a custom configuration, initialize the plugin providing additional
options:

```javascript
UPLOADCARE_LOCALE = 'ru' /* set locale if you wish */

$R('#editor', {
  plugins: ['uploadcare'],
  callbacks: {
    uploadcareShow: function() { console.log.apply(undefined, arguments) },
    uploadcareDone: function() { console.log.apply(undefined, arguments) },
    uploadcareCancel: function() { console.log.apply(undefined, arguments) },
  },
  uploadcare: {
    /* set your public API key here */
    publicKey: 'demopublickey',
    /* set crop options when handling images */
    crop: 'free,1:1',
    /* show icon instead of "Uploadcare" */
    buttonIconEnabled: true,
    /* feel free to add more “object key” options here */
  }
})
```

### Widget configuration

Uploadcare Widget can be deeply customized to suit your UX/UI. You can define
allowed upload sources, implement file validation, and more.

Use our live [widget sandbox][uc-widget-configure] as a starting point and consider
checking out the docs on [widget configuration][uc-widget-docs-config] and its
[JavaScript API][uc-widget-docs-js-api].

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
[uc-feature-widget]: https://uploadcare.com/features/widget/?utm_source=github&utm_campaign=uploadcare-redactor
[badge-release-img]: https://img.shields.io/github/release/uploadcare/uploadcare-redactor.svg
[badge-release-url]: https://github.com/uploadcare/uploadcare-redactor/releases
[badge-stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[badge-stack-url]: https://stackshare.io/uploadcare/stacks/
[demo-3]: https://uploadcare.github.io/uploadcare-redactor/demo/redactor3/?utm_source=github&utm_campaign=uploadcare-redactor
[demo-2]: https://uploadcare.github.io/uploadcare-redactor/demo/redactor2/?utm_source=github&utm_campaign=uploadcare-redactor
[github-branch-release]: https://github.com/uploadcare/uploadcare-redactor/tree/release
[github-releases]: https://github.com/uploadcare/uploadcare-redactor/releases
[uc-widget-docs-option-public-key]: https://uploadcare.com/docs/uploads/widget/config/?utm_source=github&utm_campaign=uploadcare-redactor#option-public-key
[uc-projects]: https://uploadcare.com/docs/keys/?utm_source=github&utm_campaign=uploadcare-redactor#projects
[uc-widget-configure]: https://uploadcare.com/widget/configure/3.x/?utm_source=github&utm_campaign=uploadcare-redactor
[uc-widget-docs-config]: https://uploadcare.com/docs/uploads/widget/config/?utm_source=github&utm_campaign=uploadcare-redactor
[uc-widget-docs-js-api]: https://uploadcare.com/docs/api_reference/javascript/?utm_source=github&utm_campaign=uploadcare-redactor
[uc-email-bounty]: mailto:bugbounty@uploadcare.com
[uc-email-hello]: mailto:hello@uploadcare.com
