/*
 * Uploadcare Redactor plugin (2.0.0)
 *
 */

(function($, $R) {
    $R.add('plugin', 'uploadcare', {
        init: function(app) {
            this.app = app;
            this.toolbar = app.toolbar;

            this.opts = $.extend({}, this.app.opts.uploadcare);
            // defaults
            if (!this.opts.crop) {
                this.opts.crop = '';
            }
            if (!this.opts.version) {
                this.opts.version = '3.x';
            }

            // Use imageTag from redactor config
            if (this.app.opts.imageTag) {
                this.opts.imageTag = this.opts.imageTag;
            }

            if (typeof uploadcare === 'undefined') {
                var widget_url = 'https://ucarecdn.com/libs/widget/' + this.opts.version + '/uploadcare.min.js';
                $.getScript(widget_url);
            }
        },

        start: function() {
            var buttonData = { 
                title: this.opts.buttonLabel || 'Uploadcare', 
                api: 'plugin.uploadcare.show'
            }
            
            var button = this.opts.buttonBefore
                ? this.toolbar.addButtonBefore(this.opts.buttonBefore, 'uploadcare', buttonData)
                : this.toolbar.addButton('uploadcare', buttonData);

            if (this.opts.buttonIconEnabled) {
                button.setIcon('<i class="' + (this.opts.buttonIcon ? this.opts.buttonIcon : 're-icon-file') + '"></i>');
            }  
        },

        show: function() {
            var $this = this;
            var dialog = uploadcare.openDialog({}, this.opts);
            $this.app.selection.save();
            $this.app.broadcast('uploadcareShow', dialog, this.opts);
            
            dialog.fail(function() {
                $this.app.selection.restore();
                $this.app.broadcast('uploadcareCancel', Array.prototype.slice.call(arguments));
            });
            dialog.done(this.done.bind(this));
        },

        done: function(data) {
            var $this = this;
            var files = this.opts.multiple ? data.files() : [data];
            this.app.selection.restore();
            $.when.apply(null, files).done(function() {
                var resolvedFiles = Array.prototype.slice.call(arguments);
                $.each(resolvedFiles, function() {
                    if ($.isFunction($this.opts.uploadCompleteCallback)) {
                        $this.opts.uploadCompleteCallback.call($this, this);
                    } else {
                        var imageUrl = this.cdnUrl;
                        if (this.isImage && !this.cdnUrlModifiers) {
                            imageUrl += '-/preview/';
                        }
                        if (this.isImage) {
                            $this.app.api('module.image.insert', { image: { url: imageUrl, alt: this.name, id: this.uuid } });
                        } else {
                            $this.app.api('module.link.insert', { url: this.cdnUrl, text: this.name, id: this.uuid });
                        }
                    }
                });
                $this.app.broadcast('uploadcareDone', resolvedFiles);                
            });
        },
    })
})(jQuery, Redactor);
