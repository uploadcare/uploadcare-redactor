export default function broadcast(eventName) {
  this.app.broadcast(eventName, Array.prototype.slice.call(arguments))
}
