import {escapeHtml} from '../common/escapeHtml'
import {getFileUrl} from '../common/getFileUrl'

// images go in one call: each separate insert replaces the image selected by
// the one before it
export function insertFiles(plugin, fileInfos) {
  var images = {}

  fileInfos.forEach(function(fileInfo) {
    var fileUrl = getFileUrl(fileInfo)

    if (fileInfo.isImage) {
      images[fileInfo.uuid] = {
        url: fileUrl,
        alt: escapeHtml(fileInfo.name),
        id: fileInfo.uuid,
      }
    }
    else {
      plugin.app.api('module.link.insert', {
        url: fileUrl,
        text: escapeHtml(fileInfo.name),
        id: fileInfo.uuid,
      })
    }
  })

  if (Object.keys(images).length) {
    plugin.app.api('module.image.insert', images)
  }
}
