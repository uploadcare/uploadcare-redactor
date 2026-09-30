# Uploadcare Widget for Redactor X

[Back to the main README](../README.md)

* [Requirements](#requirements)
* [Install](#install)
* [Usage](#usage)
* [Plugin options](#plugin-options)
* [Events](#events)
* [Widget configuration](#widget-configuration)

Try it in the [Redactor X demo][demo].

## Requirements

Redactor X and [jQuery](https://jquery.com/). Load jQuery before the plugin.

## Install

Download the plugin from the [releases page][github-releases] and put
`uploadcare.redactor.min.js` in your Redactor plugins folder. Then add it to
the page after Redactor:

```html
<!-- jQuery is required by the plugin -->
<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>

<!-- Redactor -->
<script src="/your-folder/redactorx.min.js"></script>

<!-- the plugin -->
<script src="/your-folder/plugins/uploadcare.redactor.min.js"></script>
```

## Usage

Add `uploadcare` to the editor plugins and set your
[public key][uc-widget-docs-option-public-key]. The public key tells Uploadcare
which [project][uc-projects] your uploads go to.

```javascript
RedactorX('#editor', {
  plugins: ['uploadcare'],
  uploadcare: {
    publicKey: 'YOUR_PUBLIC_KEY',
  },
})
```

The Uploadcare button appears on the toolbar once you click into the text.
Redactor X shows plugin buttons only while a block is selected.

## Plugin options

Put the options in the `uploadcare` object of the editor settings.

| Option | Default | What it does |
|---|---|---|
| `publicKey` | none | Your Uploadcare [public key][uc-widget-docs-option-public-key]. Required. |
| `crop` | no cropping | Crop presets for images, for example `'free,1:1'`. See the [widget options][uc-widget-docs-config] for the format. |
| `multiple` | `false` | Lets users upload several files at once. |
| `buttonLabel` | `'Uploadcare'` | Tooltip of the toolbar button. The button always shows an icon. |
| `buttonIcon` | `'rx-icon-file'` | CSS class of the icon, or SVG markup. |
| `buttonBefore` | none | Name of an existing toolbar button to place the Uploadcare button before. |
| `buttonBar` | `'toolbar'` | Which editor bar gets the button. |
| `imageTag` | none | Tag to wrap inserted images in, for example `'figure'`. If Redactor's own `imageTag` setting is set, the plugin uses that instead. |
| `uploadCompleteCallback` | none | A function the plugin calls once for each uploaded file, with that file's [info][uc-widget-docs-js-api]. When it is set, the plugin does not insert files into the editor. |
| `version` | `'3.x'` | Version of Uploadcare Widget to load from the CDN. |

The plugin passes every other option to Uploadcare Widget, so you can use any
[widget option][uc-widget-docs-config] here.

## Events

The plugin sends three events: when the upload dialog opens, when files are
uploaded, and when the user closes the dialog without uploading. Use the
upload event to run your own code after an upload; the files are still
inserted into the editor.

Listen in the `subscribe` setting. The event data is in `event.params`:

```javascript
RedactorX('#editor', {
  plugins: ['uploadcare'],
  subscribe: {
    uploadcareShow: function(event) { console.log('dialog', event.params[1]) },
    uploadcareDone: function(event) { console.log('files', event.params[1]) },
    uploadcareCancel: function() { console.log('closed') },
  },
  uploadcare: {
    publicKey: 'YOUR_PUBLIC_KEY',
  },
})
```

`event.params` is an array: the event name comes first, then the event
data. So the dialog and the files are at `event.params[1]`:

| Event | `event.params` |
|---|---|
| Dialog opened | `['uploadcareShow', dialog, options]` |
| Files uploaded | `['uploadcareDone', files]` |
| Dialog closed | `['uploadcareCancel']` |

`dialog` is the Uploadcare Widget [dialog object][uc-widget-docs-js-api],
`options` holds the plugin options, and `files` is an array with the
[file info][uc-widget-docs-js-api] of each uploaded file. The file URL is in
`cdnUrl`.

## Widget configuration

You can choose which upload sources the widget offers, validate files, change
how it looks, and more. Try settings in the [widget sandbox][uc-widget-configure],
then see the [widget options][uc-widget-docs-config] and the
[JavaScript API][uc-widget-docs-js-api].

To change the widget language, set `UPLOADCARE_LOCALE` before you start the
editor, for example `UPLOADCARE_LOCALE = 'de'`. The widget docs list the
[supported languages][uc-widget-docs-option-locale].

[uc-widget-docs-option-public-key]: https://uploadcare.com/docs/uploads/widget/config/?utm_source=github&utm_campaign=uploadcare-redactor#option-public-key
[uc-projects]: https://uploadcare.com/docs/keys/?utm_source=github&utm_campaign=uploadcare-redactor#projects
[uc-widget-configure]: https://uploadcare.com/widget/configure/3.x/?utm_source=github&utm_campaign=uploadcare-redactor
[uc-widget-docs-config]: https://uploadcare.com/docs/uploads/widget/config/?utm_source=github&utm_campaign=uploadcare-redactor
[uc-widget-docs-js-api]: https://uploadcare.com/docs/api_reference/javascript/?utm_source=github&utm_campaign=uploadcare-redactor
[uc-widget-docs-option-locale]: https://uploadcare.com/docs/uploads/file-uploader-options/?utm_source=github&utm_campaign=uploadcare-redactor#option-locale
[github-releases]: https://github.com/uploadcare/uploadcare-redactor/releases
[demo]: https://uploadcare.github.io/uploadcare-redactor/demo/redactorX/?utm_source=github&utm_campaign=uploadcare-redactor
