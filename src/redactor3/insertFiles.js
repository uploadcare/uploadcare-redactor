import {escapeHtml} from '../common/escapeHtml'
import {getFileUrl} from '../common/getFileUrl'

// Each separate image insert replaces the image the one before it left
// selected, so files that include images go in as one block of HTML, which
// also keeps the upload order. Links alone use the link insert, which puts
// them inside the current paragraph.
export function insertFiles(plugin, fileInfos) {
  var hasImages = fileInfos.some(function(fileInfo) {
    return fileInfo.isImage
  })

  if (!hasImages) {
    fileInfos.forEach(function(fileInfo) {
      plugin.app.api('module.link.insert', {
        url: getFileUrl(fileInfo),
        text: escapeHtml(fileInfo.name),
        id: fileInfo.uuid,
      })
    })

    return
  }

  var html = fileInfos.map(function(fileInfo) {
    var fileUrl = getFileUrl(fileInfo)
    var name = escapeHtml(fileInfo.name)

    return fileInfo.isImage
      ? '<figure><img src="' + fileUrl + '" alt="' + name + '" data-image="' + fileInfo.uuid + '"></figure>'
      : '<p><a href="' + fileUrl + '" data-file="' + fileInfo.uuid + '">' + name + '</a></p>'
  })

  plugin.app.insertion.insertHtml(html.join(''))
}
