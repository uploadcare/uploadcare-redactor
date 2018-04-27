import getFileUrl from '../getFileUrl'

export default function insertHtml(plugin, fileInfo) {
  var fileUrl = getFileUrl(fileInfo)

  if (fileInfo.isImage) {
    plugin.app.api('module.image.insert', {
      image: {
        url: fileUrl,
        alt: fileInfo.name,
        id: fileInfo.uuid,
      },
    })
  }
  else {
    plugin.app.api('module.link.insert', {
      url: fileUrl,
      text: fileInfo.name,
      id: fileInfo.uuid,
    })
  }
}
