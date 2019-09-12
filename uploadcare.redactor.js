/**
 * uploadcare-redactor 2.0.1
 * File Uploader by Uploadcare. The plugin for Imperavi Redactor to work with Uploadcare Widget.
 * https://github.com/uploadcare/uploadcare-redactor#readme
 * Date: 2019-09-12
 */

(function ($,$R) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  $R = $R && $R.hasOwnProperty('default') ? $R['default'] : $R;

  function broadcast(eventName) {
    this.app.broadcast(eventName, Array.prototype.slice.call(arguments));
  }

  function loadWidget() {
    if (typeof window.uploadcare === 'undefined') {
      var widgetUrl = 'https://ucarecdn.com/libs/widget/' + this.ucOpts.version + '/uploadcare.min.js';

      $.getScript(widgetUrl);
    }
  }

  function normalizeOptions() {
    this.ucOpts = $.extend({}, this.redactorOpts.uploadcare);

    // defaults
    if (!this.ucOpts.crop) {
      this.ucOpts.crop = '';
    }
    if (!this.ucOpts.version) {
      this.ucOpts.version = '3.x';
    }

    // Use imageTag from redactor config
    if (this.redactorOpts.imageTag) {
      this.ucOpts.imageTag = this.redactorOpts.imageTag;
    }
  }

  function getVersion() {
    if (typeof $R !== 'undefined') {
      return $R.version
    }
  }

  function getVersion$1() {
    if (typeof $.Redactor !== 'undefined') {
      return $.Redactor.VERSION
    }
  }

  function applyIntegrationOption() {
    var redactorVersion = getVersion() || getVersion$1();
    var pluginVerion = '2.0.1';

    this.ucOpts.integration = 'Redactor/{redactorVersion}; Uploadcare-Redactor/{pluginVerion}'
      .replace('{redactorVersion}', redactorVersion)
      .replace('{pluginVerion}', pluginVerion);
  }

  function init(app) {
    this.app = app;
    this.toolbar = app.toolbar;
    this.redactorOpts = this.app.opts;

    normalizeOptions.call(this);
    loadWidget.call(this);
    applyIntegrationOption.call(this);
  }

  function getFileUrl(fileInfo) {
    var fileUrl = fileInfo.cdnUrl;

    if (fileInfo.isImage && !fileInfo.cdnUrlModifiers) {
      fileUrl += '-/preview/';
    }

    return fileUrl
  }

  function insertHtml(plugin, fileInfo) {
    var fileUrl = getFileUrl(fileInfo);

    if (fileInfo.isImage) {
      plugin.app.api('module.image.insert', {
        image: {
          url: fileUrl,
          alt: fileInfo.name,
          id: fileInfo.uuid,
        },
      });
    }
    else {
      plugin.app.api('module.link.insert', {
        url: fileUrl,
        text: fileInfo.name,
        id: fileInfo.uuid,
      });
    }
  }

  function getSelection() {
    return this.app.selection
  }

  function start() {
    var buttonData = {
      title: this.ucOpts.buttonLabel || 'Uploadcare',
      api: 'plugin.uploadcare.show',
    };

    var button = this.ucOpts.buttonBefore
      ? this.toolbar.addButtonBefore(this.ucOpts.buttonBefore, 'uploadcare', buttonData)
      : this.toolbar.addButton('uploadcare', buttonData);

    if (this.ucOpts.buttonIconEnabled) {
      button.setIcon('<i class="' + (this.ucOpts.buttonIcon ? this.ucOpts.buttonIcon : 're-icon-file') + '"></i>');
    }
  }

  function addPlugin(pluginBody) {
    $R.add('plugin', 'uploadcare', pluginBody);
  }



  var redactor3 = /*#__PURE__*/Object.freeze({
    broadcast: broadcast,
    init: init,
    insertHtml: insertHtml,
    getSelection: getSelection,
    start: start,
    getVersion: getVersion,
    addPlugin: addPlugin
  });

  function broadcast$1(eventName) {
    this.core.callback(eventName, Array.prototype.slice.call(arguments));
  }

  function start$1() {
    var button = this.ucOpts.buttonBefore
      ? this.button.addBefore(this.ucOpts.buttonBefore, 'uploadcare', this.ucOpts.buttonLabel || 'Uploadcare')
      : this.button.add('uploadcare', this.ucOpts.buttonLabel || 'Uploadcare');

    this.button.addCallback(button, this.uploadcare.show);

    if (this.ucOpts.buttonIconEnabled) {
      this.button.setIcon(
        button,
        '<i class="' + (this.ucOpts.buttonIcon ? this.ucOpts.buttonIcon : 're-icon-file') + '"></i>'
      );
    }
  }

  function init$1() {
    this.redactorOpts = this.opts;

    normalizeOptions.call(this);
    loadWidget.call(this);
    applyIntegrationOption.call(this);

    start$1.call(this);
  }

  function insertHtml$1(plugin, fileInfo) {
    var fileUrl = getFileUrl(fileInfo);

    if (fileInfo.isImage) {
      var openTag = plugin.ucOpts.imageTag ? '<' + plugin.ucOpts.imageTag + '>' : '';
      var closeTag = plugin.ucOpts.imageTag ? '</' + plugin.ucOpts.imageTag + '>' : '';

      plugin.insert.html(
        openTag +
        '<img src="' +
        fileUrl +
        '" alt="' +
        fileInfo.name +
        '" data-image="' +
        fileInfo.uuid +
        '" />' +
        closeTag,
        false
      );
    }
    else {
      plugin.insert.html('<a href="' + fileUrl + '" data-file="' + fileInfo.uuid + '">' + fileInfo.name + '</a>', false);
    }
  }

  function getSelection$1() {
    return this.selection
  }

  function wrap(fn) {
    return function() {
      fn.call(this);
    }
  }

  function addPlugin$1(pluginBody) {
    $.Redactor.prototype.uploadcare = function() {
      return Object.keys(pluginBody).reduce(function(acc, key) {
        var value = pluginBody[key];

        acc[key] = typeof value === 'function' ? wrap(value) : value;

        return acc
      }, {})
    };
  }



  var redactor2 = /*#__PURE__*/Object.freeze({
    broadcast: broadcast$1,
    init: init$1,
    insertHtml: insertHtml$1,
    getSelection: getSelection$1,
    start: start$1,
    getVersion: getVersion$1,
    addPlugin: addPlugin$1
  });

  function checkRedactor() {
    if (!getVersion() && !getVersion$1()) {
      /* eslint-disable no-console */
      console.error('Uploadcare: Redactor not found.');
      /* eslint-enable no-console */

      return false
    }

    return true
  }

  var wrappers = getVersion() ? redactor3 : redactor2;

  function done(data) {
    var $this = this;
    var files = this.ucOpts.multiple ? data.files() : [data];

    wrappers.getSelection.call(this).restore();
    $.when.apply(null, files).done(function() {
      var resolvedFiles = Array.prototype.slice.call(arguments);

      $.each(resolvedFiles, function() {
        if ($.isFunction($this.ucOpts.uploadCompleteCallback)) {
          $this.ucOpts.uploadCompleteCallback.call($this, this);
        }
        else {
          wrappers.insertHtml($this, this);
        }
      });
      wrappers.broadcast.call($this, 'uploadcareDone', resolvedFiles);
    });
  }

  function show() {
    var dialog = uploadcare.openDialog({}, this.ucOpts);

    wrappers.getSelection.call(this).save();
    wrappers.broadcast.call(this, 'uploadcareShow', dialog, this.ucOpts);

    dialog.fail(
      function() {
        wrappers.getSelection.call(this).restore();
        wrappers.broadcast.call(this, 'uploadcareCancel');
      }.bind(this)
    );

    dialog.done(done.bind(this));
  }

  checkRedactor() &&
  wrappers.addPlugin({
    init: wrappers.init,
    start: wrappers.start,
    show: show,
    done: done,
  });

}(window.jQuery,window.Redactor));
