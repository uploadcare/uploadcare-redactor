import getFileUrl from '../common/getFileUrl'

export default function insertHtml(plugin, fileInfo) {
  var fileUrl = getFileUrl(fileInfo)

  if (fileInfo.isImage) {
    var openTag = plugin.ucOpts.imageTag ? '<' + plugin.ucOpts.imageTag + '>' : ''
    var closeTag = plugin.ucOpts.imageTag ? '</' + plugin.ucOpts.imageTag + '>' : ''

    plugin.app.insertion.insertHtml(
      openTag +
      '<img src="' +
      fileUrl +
      '" alt="' +
      fileInfo.name +
      '" data-image="' +
      fileInfo.uuid +
      '" />' +
      closeTag
    )
  }
  else {
    plugin.app.insertion.insertHtml('<a href="' + fileUrl + '" data-file="' + fileInfo.uuid + '">' + fileInfo.name + '</a>')
  }
}
