export default function loadWidget() {
  if (typeof window.uploadcare === "undefined") {
    var widget_url =
      "https://ucarecdn.com/libs/widget/" +
      this.ucOpts.version +
      "/uploadcare.min.js";
    $.getScript(widget_url);
  }
}
