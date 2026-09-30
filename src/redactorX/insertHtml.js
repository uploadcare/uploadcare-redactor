import {getFileUrl} from '../common/getFileUrl'

export function insertHtml(plugin, fileInfo) {
  var fileUrl = getFileUrl(fileInfo)

  if (fileInfo.isImage) {
    var $image = plugin.dom('<img>')
      .attr('src', fileUrl)
      .attr('alt', fileInfo.name)
      .attr('data-image', fileInfo.uuid)

    var $source = $image

    if (plugin.ucOpts.imageTag) {
      $source = plugin.dom('<' + plugin.ucOpts.imageTag + '>')
      $source.append($image)
    }

    var instance = plugin.app.create('block.image', $source)

    plugin.app.block.add({
      instance: instance,
      type: 'image',
    })

    plugin.app.broadcast('image.upload', {
      instance: instance,
      data: {
        src: fileUrl,
        id: fileInfo.uuid,
        name: fileInfo.name,
        width: fileInfo.crop.width,
        height: fileInfo.crop.height,
      },
    })
  }
  else {
    plugin.app.insertion.insertHtml(
      '<a href="' + fileUrl + '" data-file="' + fileInfo.uuid + '">' + fileInfo.name + '</a>'
    )
  }
}
