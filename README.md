# Redactor Uploadcare plugin

This is Uploadcare plugin for [Imperavi Redactor] text editor. It will allow
your users to upload files and images from local device, social networks, cloud
storages without any backend code that is usually required to handle uploads.


## Installation & configuration

1. Copy `uploadcare.js` to your plugins folder
2. Include plugin code on the page with Redactor:

    ```html
    <script src="/js/redactor/redactor.js"></script>
     <!-- Plugin -->
    <script src="/js/redactor/plugins/uploadcare.js"></script>
    ```

3. Enable plugin for Redactor instance providing any Uploadcare [widget
settings] you may want:

    ```html
    <script type="text/javascript">
        $(function() {
            $('#redactor').redactor({
                plugins: ['uploadcare'],
                uploadcare: {
                    // styling options
                    buttonLabel: 'Image / file'
                    buttonBefore: 'video',
                    buttonIconEnabled: true,
                    // uploadcare widget options, see https://uploadcare.com/documentation/widget/#configuration
                    publicKey: 'demopublickey', // set your API key
                    crop: 'free',
                    tabs: 'all'
                }
            });
        });
    </script>
    ```

## Required setting

There is only one - your public API key. You can get that by creating an
account [Uploadcare]. You can use demo public key during dev stage, but note that
demo account files are removed every few hours.


## Useful settings

### Locale.
Set widget locale. Should be set as global variable:

```html
<script>
    UPLOADCARE_LOCALE = 'es';
</script>
```

### Crop.
You can enable custom crop in the widget. After a user selects a file she will
be able to crop it, according to your settings. Original file will be uploaded
to your project, but additional crop operations will be included in resulting
image URL.

Crop options is a string with one or more crop presets. Presets are divided by
commas. When more than one preset is defined, user can pick any of them on crop
step. Each preset consists of a size definition and optional keyword.

- "disabled" — crop is disabled. Can't be combined with other presets;
- "" or "free" — crop enabled and the user will be able to select any area on an image;
- "2:3" — user will be able to select an area with aspect ratio 2:3;
- "300x200" — same as previous, but if the selected area is bigger than 300x200, it will be scaled down to these dimensions;
- "300x200 upscale" — same as previous, but the selected area will be scaled even if it is smaller than the specified size;
- "300x200 minimum" — user will not be able to select an area smaller than 300x200. If uploaded image is smaller than 300x200 itself, it will be upscaled.

```html
<script type="text/javascript">
    $(function() {
        $('#redactor').redactor({
            plugins: ['uploadcare'],
            uploadcare: {
                publicKey: 'yourapikey',
                crop: '4:3, 3:4'
            }
        });
    });
</script>
```

### Tabs (Upload Sources)

The widget can upload files from disk, URLs, and many social sites.
Each upload source has its own tab in the widget dialog.

A full list of tabs supported in the latest widget version
(2.0.6) is provided below.

<table class="reference">
  <tr>
    <th>Code</th>
    <th>File Source</th>
    <th>Default</th>
  </tr>
  <tr>
    <td><code>file</code></td>
    <td>Local disk</td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>camera</code></td>
    <td>Local webcam</td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>url</code></td>
    <td>Any URL</td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>facebook</code></td>
    <td><a href="https://www.facebook.com/">Facebook</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>gdrive</code></td>
    <td><a href="https://drive.google.com/">Google Drive</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>gphotos</code></td>
    <td><a href="https://photos.google.com/">Google Photos</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>dropbox</code></td>
    <td><a href="https://www.dropbox.com/">Dropbox</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>instagram</code></td>
    <td><a href="http://instagram.com/">Instagram</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>evernote</code></td>
    <td><a href="http://evernote.com/">Evernote</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>flickr</code></td>
    <td><a href="https://www.flickr.com/">Flickr</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>skydrive</code></td>
    <td><a href="https://onedrive.live.com/">OneDrive</a></td>
    <th>On</th>
  </tr>
  <tr>
    <td><code>box</code></td>
    <td><a href="https://www.box.com/">Box</a></td>
    <th>Off</th>
  </tr>
  <tr>
    <td><code>vk</code></td>
    <td><a href="http://vk.com/">VK</a></td>
    <th>Off</th>
  </tr>
  <tr>
    <td><code>Huddle</code></td>
    <td><a href="http://huddle.com/">Huddle</a></td>
    <th>Off</th>
  </tr>
</table>

The set can be reconfigured by
specifying the ones you need in a space-separated value.
Special value `all` can be used to enable all supported sources.

```html
<script type="text/javascript">
    $(function() {
        $('#redactor').redactor({
            plugins: ['uploadcare'],
            uploadcare: {
                publicKey: 'yourapikey',
                tabs: 'file url instagram flickr'
            }
        });
    });
</script>
```


## Other settings

All Uploadcare widget settings are too numerous to be listed here, please read
Uploadcare [widget documentation] to unleash full uploading power.


[Imperavi Redactor]: http://imperavi.com/redactor/
[widget settings]: https://uploadcare.com/documentation/widget/#configuration
[widget documentation]: https://uploadcare.com/documentation/widget/
[Uploadcare]: https://uploadcare.com
