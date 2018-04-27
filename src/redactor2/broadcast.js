export default function broadcast(eventName) {
  this.core.callback(eventName, Array.prototype.slice.call(arguments));
}
