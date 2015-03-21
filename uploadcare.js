if (!RedactorPlugins) var RedactorPlugins = {};

(function($) {
    RedactorPlugins.uploadcare = function() {
        var $opts;
        return {
            init: function() {
                $opts = this.opts.uploadcare;
                if (!this.opts.uploadcare.crop) {
                    this.opts.uploadcare.crop = '';
                }

                if (typeof uploadcare === 'undefined') {
                    var version = this.opts.uploadcare.version || '2.0.4';
                    var widget_url = 'https://ucarecdn.com/widget/' + version + '/uploadcare/uploadcare.min.js';
                    $.getScript(widget_url);
                }
                var button = this.button.add('uploadcare', 'Uploadcare');
                this.button.addCallback(button, this.uploadcare.show);

                // make your added button as Font Awesome's icon
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
                        var imageUrl = this.cdnUrl;
                        if (this.isImage && ! this.cdnUrlModifiers) {
                            imageUrl += '-/preview/';
                        }
                        if (this.isImage) {
                            $this.insert.html('<img src="' + imageUrl + '" alt="' + this.name + '" />', false);
                        } else {
                            $this.insert.html('<a href="' + this.cdnUrl + '">' + info.name + '"</a>', false);
                        }
                  });
                });
            },
        };
    };
})(jQuery);
