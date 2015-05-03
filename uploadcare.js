/*
 * Uploadcare Redactor plugin (1.1.0)
 */

if (!RedactorPlugins) var RedactorPlugins = {};

(function($) {
    RedactorPlugins.uploadcare = function() {
        var $opts;
        return {
            init: function() {
                $opts = this.opts.uploadcare;
                // defaults
                if (! $opts.crop) {
                    $opts.crop = '';
                }
                if (! $opts.version) {
                    $opts.version = '2.1.0';
                }

                if (typeof uploadcare === 'undefined') {
                    var widget_url = 'https://ucarecdn.com/widget/' + $opts.version + '/uploadcare/uploadcare.min.js';
                    $.getScript(widget_url);
                }
                var button = this.button.add('uploadcare', $opts.buttonLabel || 'Uploadcare');
                this.button.addCallback(button, this.uploadcare.show);

                // using Font Awesome, sets the default icon
                // for usage with Semantic UI, change second argument to desired icon class (e.g. 'attach icon')
                this.button.setAwesome('uploadcare', 'fa-picture-o');
            },

            show: function() {
                var dialog = uploadcare.openDialog({}, $opts);
                dialog.done(this.uploadcare.done)
            },

            done: function(data) {
                var $this = this;
                var files = $opts.multiple ? data.files() : [data];
                $.when.apply(null, files).done(function() {
                    $.each(arguments, function() {
                        if ($.isFunction($opts.uploadCompleteCallback)) {
                            $opts.uploadCompleteCallback.call($this, this);
                        } else {
                            var imageUrl = this.cdnUrl;
                            if (this.isImage && ! this.cdnUrlModifiers) {
                                imageUrl += '-/preview/';
                            }
                            if (this.isImage) {
                                $this.insert.html('<img src="' + imageUrl + '" alt="' + this.name + '" />', false);
                            } else {
                                $this.insert.html('<a href="' + this.cdnUrl + '">' + info.name + '"</a>', false);
                            }
                        }
                  });
                });
            },
        };
    };
})(jQuery);
