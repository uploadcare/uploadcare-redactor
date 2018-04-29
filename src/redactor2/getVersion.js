export default function getVersion() {
  if (typeof $.Redactor !== undefined) {
    return $.Redactor.VERSION
  }
}
