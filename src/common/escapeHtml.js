var ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}

// file names come from the uploaded files, so they go into markup escaped
export function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, function(char) {
    return ENTITIES[char]
  })
}
