# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/),
and this project adheres to
[Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.0.0, 2018-05-11

### Added

* [Redactor 3][redactor-home] support; [File Uploader][github-redactor] now
  works with both v2 and v3.

### Changed

* The default [widget][uc-feature-widget] version for
  [File Uploader][github-redactor] is now `3.x`.
* Added `integration` to the default widget config to provide info on used
  Redactor and plugin versions to User Agent with requests to Uploadcare
  [Upload API][uc-docs-api-reference-upload].

[redactor-home]: https://imperavi.com/redactor/
[github-redactor]: https://github.com/uploadcare/uploadcare-redactor/
[uc-feature-widget]: https://uploadcare.com/features/widget/
[uc-docs-api-reference-upload]: https://uploadcare.com/docs/api_reference/upload/

## 1.6.0

- support Redactor callbacks: uploadcareShow, uploadcareDone, uploadcareCancel
- compatibility with latest Redactor 2 toolbar icons (default)
- new setting: buttonIcon - use 'fa fa-picture-o' for backwards compatibility
- restore editor selection on cancel
- assign data-image and data-file attributes for Redactor storage management,
  see [docs](https://imperavi.com/redactor/docs/storage/)

## 1.5.2

- update CDN link to the widget

## 1.5.1

- update widget version to 2.10.2 (see [widget changelog][widget changelog])

## 1.5.0

- fix behavior of image insertion and wrap them in $opts.imageTag

## 1.4.1

- update widget version to 2.10.0 (see [widget changelog][widget changelog])

## 1.4.0

- add `iconButtonEnabled` option to enable/disable button icon
- add `buttonBefore` option to configure the position of the button in the toolbar
- add `buttonLabel` option to configure button label

## 1.3.0

- add package.json
- wrap code in IIFE
- add authors.txt
- update widget version to 2.8.2 (see [widget changelog][widget changelog])

## 1.2.0

- update plugin to work with Redactor II
- update widget version to 2.6.0 (see [widget changelog][widget changelog])


[widget changelog]: https://github.com/uploadcare/uploadcare-widget/blob/master/HISTORY.markdown
