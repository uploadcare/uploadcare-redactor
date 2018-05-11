import getFileUrl from '../common/getFileUrl'

export default function insertHtml(plugin, fileInfo) {
  var fileUrl = getFileUrl(fileInfo)

  if (fileInfo.isImage) {
    var openTag = plugin.ucOpts.imageTag ? '<' + plugin.ucOpts.imageTag + '>' : ''
    var closeTag = plugin.ucOpts.imageTag ? '</' + plugin.ucOpts.imageTag + '>' : ''

    plugin.insert.html(
      openTag +
      '<img src="' +
      fileUrl +
      '" alt="' +
      fileInfo.name +
      '" data-image="' +
      fileInfo.uuid +
      '" />' +
      closeTag,
      false
    )
  }
  else {
    plugin.insert.html('<a href="' + fileUrl + '" data-file="' + fileInfo.uuid + '">' + fileInfo.name + '</a>', false)
  }
}
