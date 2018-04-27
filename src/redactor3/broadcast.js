export default function broadcast(eventName) {
  this.app.broadcast("uploadcareShow", Array.prototype.slice.call(arguments));
}
