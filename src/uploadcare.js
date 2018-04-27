import {start, init, broadcast, selection, insertHtml} from './redactor$_REDACTOR_TARGET/index'

var pluginBody = {
    init: init,
    start: start,

    show: function() {
        var $this = this;
        var dialog = uploadcare.openDialog({}, this.ucOpts);
        selection.save.call(this);
        broadcast.call(this, 'uploadcareShow', dialog, this.ucOpts);
        
        dialog.fail(function() {
            selection.restore.call($this);
            broadcast.apply($this, 'uploadcareCancel', Array.prototype.slice.call(arguments));
        });
        
        //#if _REDACTOR_TARGET === 3
        dialog.done(this.done.bind(this));
        //#else
        dialog.done(this.uploadcare.done.bind(this));        
        //#endif
    },

    done: function(data) {
        var $this = this;
        var files = this.ucOpts.multiple ? data.files() : [data];
        selection.restore.call(this);
        $.when.apply(null, files).done(function() {
            var resolvedFiles = Array.prototype.slice.call(arguments);
            $.each(resolvedFiles, function() {
                if ($.isFunction($this.ucOpts.uploadCompleteCallback)) {
                    $this.ucOpts.uploadCompleteCallback.call($this, this);
                } else {
                    insertHtml($this, this);
                }
            });
            broadcast.call($this, 'uploadcareDone', resolvedFiles);                
        });
    },
}

//#if _REDACTOR_TARGET === 3
$R.add('plugin', 'uploadcare', pluginBody)
//#else
$.Redactor.prototype.uploadcare = function() {
    return pluginBody;
}
//#endif

