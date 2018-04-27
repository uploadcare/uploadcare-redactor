export default function start() {
  var button = this.ucOpts.buttonBefore
    ? this.button.addBefore(
        this.ucOpts.buttonBefore,
        "uploadcare",
        this.ucOpts.buttonLabel || "Uploadcare"
      )
    : this.button.add("uploadcare", this.ucOpts.buttonLabel || "Uploadcare");

  this.button.addCallback(button, this.uploadcare.show);

  if (this.ucOpts.buttonIconEnabled) {
    this.button.setIcon(
      button,
      '<i class="' +
        (this.ucOpts.buttonIcon ? this.ucOpts.buttonIcon : "re-icon-file") +
        '"></i>'
    );
  }
}
