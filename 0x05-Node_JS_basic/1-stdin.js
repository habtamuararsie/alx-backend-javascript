/**
 * isplay the message Welcome to Holberton School, what is your name?
 * (followed by a new line)
 * @author Habtamu Ararsie <https://github.com/habtamuararsie>
 */
process.stdout.write("Welcome to Holberton School, what is your name?\n");

process.stdin.on("readable", () => {
  const chunk = process.stdin.read();

  if (chunk) {
    process.stdout.write(`Your name is: ${chunk}`);
  }
});

process.stdin.on("end", () => {
  process.stdout.write("This important software is now closing\n");
});
