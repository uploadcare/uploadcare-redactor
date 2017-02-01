# Redactor Uploadcare plugin

That's the [Uploadcare][uc_website] plugin for the [Imperavi Redactor][redactor]
text editor. The plugin allows your users to upload files and images
from local devices, social networks, cloud storages, and more.
All that — without any backend code that is often required for uploads.

## Installation

It'll take you just about three steps to install the plugin.

1. Copy `uploadcare.js` to your plugins folderю
2. Add this code to a page where you use Redactor:

    ```html
    <script src="/js/redactor/redactor.js"></script>
     <!-- Plugin -->
    <script src="/js/redactor/plugins/uploadcare.js"></script>
    ```

3. Enable the plugin for a Redactor instance and provide
   it with any Uploadcare Widget [settings][uc_widg_set]:

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

## Configuration

### Required settings

In fact, there's only one required setting — your public API key. In order to get the key
you should register with Uploadcare and set up a project to store your files and settings.
Check out our [knowledgebase][kb_intro] to get up an running with your Uploadcare account
in minutes. You can always use our demo public key during your dev stage. But keep in mind,
files uploaded to the demo account are removed every few hours.

### Useful settings

**Locale**

Use this setting to define a widget locale.
Should be set as a global variable:

```html
<script>
    UPLOADCARE_LOCALE = 'es';
</script>
```

**Crop**

This setting is applicable to images and
enables custom crop for the plugin.
Cropping will then become available after a user
selects a file for upload.
Please note that the file uploaded to your project
still is an original image. Crop operations are performed
on-the-fly with our 
[CDN API](https://uploadcare.com/documentation/cdn/)
and hence are included in a resulting image URL.

Crop options are set in a string holding one or more
crop presets. Those are divided by commas.
If there are multiple crop presets present in an options
string, users will then be able to choose which of
them to apply during the crop step.
Each preset consists of a size definition and an optional keyword.

- "disabled" — crop is disabled. Can't be combined with other presets.
- "" or "free" — crop is enabled and users will be able to
  define crop area freely on an image.
- "2:3" — enables crop with the 2:3 aspect ratio.
- "300x200" — same as above, but if the selected area is bigger than 300x200 px,
  it will be downscaled to fit these dimensions.
- "300x200 upscale" — same as above, but if the selected area is smaller than
  300x200 px, it will be upscaled to the specified size.
- "300x200 minimum" — users won't be able to select an area smaller than 300x200 px.
  If an uploaded image is smaller than that, it will be upscaled.

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

**Tabs (Upload Sources)**

The widget can upload files from disks, URLs, social media,
and many other sources. There's a separate tab for each
upload source in the widget.

Here's the full list of tabs (sources) supported by
the latest widget version.


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

The set of enabled sources can be reconfigured.
This is done through specifying their respective 
codes in an options string, as space-separated values.
Use the `all` value to enable all supported sources.

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


### Other settings

All the Uploadcare Widget settings can be found in our [docs][uc_widg_docs].
Please read those to unleash the uploading power in its full.

## Contributors

- [@dmitry-mukhin](https://github.com/dmitry-mukhin)
- [@TimonVS](https://github.com/TimonVS)
- [@jpirkey](https://github.com/jpirkey)
- [@Zmoki](https://github.com/Zmoki)

## Security issues

If you think you ran into something in Uploadcare libraries
which might have security implications, please hit us up at
[bugbounty@uploadcare.com](mailto:bugbounty@uploadcare.com)
or Hackerone.

We'll contact you personally in a short time to fix an issue
through co-op and prior to any public disclosure.

[kb_intro]: http://kb.uploadcare.com/article/234-uc-project-and-account
[redactor]: http://imperavi.com/redactor/
[uc_widg_set]: https://uploadcare.com/documentation/widget/#configuration
[uc_widg_docs]: https://uploadcare.com/documentation/widget/
[uc_website]: https://uploadcare.com
