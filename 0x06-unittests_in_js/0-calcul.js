/**
 * A function which dispaly a message to the STDOUT.
 * @param {String} message the message to be display.
 * @author Habtamu Ararsie <https://github.com/habtamuararsie>
 */
function calculateNumber(a, b) {
  if ((typeof a === "number") & (typeof b === "number")) {
    return Math.round(a) + Math.round(b);
  } else {
    return NaN;
  }
}

module.exports = calculateNumber;
