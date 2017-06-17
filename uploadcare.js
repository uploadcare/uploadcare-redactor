/*
 * Uploadcare Redactor plugin (1.5.3)
 *
 */

(function($) {
    $.Redactor.prototype.uploadcare = function() {
        var $opts;
        return {
            init: function() {
                $opts = $.extend({}, this.opts.uploadcare);
                // defaults
                if (!$opts.crop) {
                    $opts.crop = '';
                }
                if (!$opts.version) {
                    $opts.version = '2.x';
                }

                // Use imageTag from redactor config
                if (this.opts.imageTag) {
                    $opts.imageTag = this.opts.imageTag;
                }

                if (typeof uploadcare === 'undefined') {
                    var widget_url = 'https://ucarecdn.com/libs/widget/' + $opts.version + '/uploadcare.min.js';
                    $.getScript(widget_url);
                }
                
                var button = $opts.buttonBefore
                    ? this.button.addBefore($opts.buttonBefore, 'uploadcare', $opts.buttonLabel || 'Uploadcare')
                    : this.button.add('uploadcare', $opts.buttonLabel || 'Uploadcare');

                this.button.addCallback(button, this.uploadcare.show);

                if ($opts.buttonIconEnabled) {
                    this.button.setIcon(button, '<i class="' + ($opts.buttonIcon ? $opts.buttonIcon : 're-icon-file') + '"></i>');
                }
            },

            show: function() {
                var $this = this;
                var dialog = uploadcare.openDialog({}, $opts);
                this.core.callback('uploadcareShow', dialog, $opts);
                this.selection.save();
                dialog.fail(function() {
                    $this.selection.restore();
                    $this.core.callback('uploadcareCancel', Array.prototype.slice.call(arguments));
                });
                dialog.done(this.uploadcare.done);
            },

            done: function(data) {
                var $this = this;
                var files = $opts.multiple ? data.files() : [data];
                this.selection.restore();
                $.when.apply(null, files).done(function() {
                    var resolvedFiles = Array.prototype.slice.call(arguments);
                    $.each(resolvedFiles, function() {
                        if ($.isFunction($opts.uploadCompleteCallback)) {
                            $opts.uploadCompleteCallback.call($this, this);
                        } else {
                            var imageUrl = this.cdnUrl;
                            if (this.isImage && !this.cdnUrlModifiers) {
                                imageUrl += '-/preview/';
                            }
                            if (this.isImage) {
                                var openTag = $opts.imageTag ? '<' + $opts.imageTag + '>' : '';
                                var closeTag = $opts.imageTag ? '</' + $opts.imageTag + '>' : '';
                                $this.insert.html(openTag + '<img src="' + imageUrl + '" alt="' + this.name + '" data-image="' + this.uuid + '" />' + closeTag, false);
                            } else {
                                $this.insert.html('<a href="' + this.cdnUrl + '" data-file="' + this.uuid + '">' + this.name + '</a>', false);
                            }
                        }
                    });
                    $this.storage.observe(); // Trigger storage tracking
                    $this.core.callback('uploadcareDone', resolvedFiles);
                });
            },
        };
    };
})(jQuery);
