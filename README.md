# File Uploader by Uploadcare

<a href="https://uploadcare.com/?utm_source=github&utm_campaign=uploadcare-redactor">
    <img align="right" width="64" height="64"
         src="https://ucarecdn.com/2f4864b7-ed0e-4411-965b-8148623aa680/uploadcare-logo-mark.svg"
         alt="">
</a>

This is a plugin for [Imperavi Redactor][redactor] to work with [Uploadcare Widget][uc-feature-widget].

[![GitHub release][badge-release-img]][badge-release-url]&nbsp;
[![Uploadcare stack on StackShare][badge-stack-img]][badge-stack-url]

## Demo

A minimalistic demo can be found here:

* [with Redactor 3][demo-3]
* [with Redactor 2][demo-2]

## Requirements

Imperavi Redactor 2 or 3.

## Install

Download the latest plugin archive from the [release branch][release-branch]
or [releases page][releases-page].

Extract the downloaded plugin into the plugins folder of your Redactor installation.

Place the plugin after embedding `redactor.js`,

```html
<!-- redactor js -->
<script src="/your-folder/redactor.js"></script>

<!-- plugin js -->
<script src="/your-folder/plugins/uploadcare.redactor.min.js"></script>
```

## Usage

Add `uploadcare` to your list of Redactor plugins.
**Set your [public key][widget-docs-options-public-key]**.

With Redactor 3,

```javascript
$R('#editor', {
  plugins: ['uploadcare'],
  uploadcare: {
    buttonIconEnabled: true,
    publicKey: 'YOUR_PUBLIC_KEY',
  }
})
```

With Redactor 2,

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

Initialize a plugin with additional options:

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
    publicKey: 'demopublickey',
    crop: 'free,1:1',
    buttonIconEnabled: true, /* show icon instead of "Uploadcare" */
  }
})
```

You can deeply customize the widget behavior:
file sources, file validation, and much more.
Please, check out the [Uploadcare Widget][widget-docs-config]
and [JavaScript API][widget-docs-js-api] docs.

## Feedback

Your feedback or support requests are welcome at [hello@uploadcare.com][uc-email-hello].

[uc-email-hello]: mailto:hello@uploadcare.com
[demo-3]: https://uploadcare.github.io/uploadcare-redactor/demo/redactor3/
[demo-2]: https://uploadcare.github.io/uploadcare-redactor/demo/redactor2/
[uc-feature-widget]: https://uploadcare.com/features/widget/?utm_source=github&utm_campaign=uploadcare-redactor
[widget-docs-config]: https://uploadcare.com/docs/uploads/widget/config/
[widget-docs-js-api]: https://uploadcare.com/docs/api_reference/javascript/
[widget-docs-options-public-key]: https://uploadcare.com/docs/uploads/widget/config/#option-public-key
[releases-page]: https://github.com/uploadcare/uploadcare-redactor/releases
[release-branch]: https://github.com/uploadcare/uploadcare-redactor/tree/release
[redactor]: https://imperavi.com/redactor/
[badge-stack-img]: https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat
[badge-stack-url]: https://stackshare.io/uploadcare/stacks/
[badge-release-img]: https://img.shields.io/github/release/uploadcare/uploadcare-redactor.svg
[badge-release-url]: https://github.com/uploadcare/uploadcare-redactor/releases
