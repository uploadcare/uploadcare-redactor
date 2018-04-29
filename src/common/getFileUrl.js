export default function getFileUrl(fileInfo) {
  var fileUrl = fileInfo.cdnUrl

  if (fileInfo.isImage && !fileInfo.cdnUrlModifiers) {
    fileUrl += '-/preview/'
  }

  return fileUrl
}
