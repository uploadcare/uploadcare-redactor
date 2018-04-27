import loadWidget from "../loadWidget";
import parseOptions from "../parseOptions";

export default function() {
  this.redactorOpts = this.opts;

  parseOptions.call(this);
  loadWidget.call(this);

  this.uploadcare.start();
}
