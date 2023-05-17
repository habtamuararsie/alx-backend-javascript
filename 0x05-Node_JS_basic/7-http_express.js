const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : "";

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Habtamu Ararsie <https://github.com/habtamuararsie>
 */
const countStud = (dataPath) =>
  new Promise((resolve, reject) => {
    if (!dataPath) {
      reject(new Error("Cannot load the database"));
    }
    if (dataPath) {
      fs.readFile(dataPath, (err, data) => {
        if (err) {
          reject(new Error("Cannot load the database"));
        }
        if (data) {
          const reportParts = [];
          const fileLines = data.toString("utf-8").trim().split("\n");
          const studGroups = {};
          const dbFieldNames = fileLines[0].split(",");
          const studentPropNames = dbFieldNames.slice(
            0,
            dbFieldNames.length - 1
          );

          for (const line of fileLines.slice(1)) {
            const studRecord = line.split(",");
            const studentPropValues = studRecord.slice(
              0,
              studRecord.length - 1
            );
            const field = studRecord[studRecord.length - 1];
            if (!Object.keys(studGroups).includes(field)) {
              studGroups[field] = [];
            }
            const studEntries = studentPropNames.map((propName, idx) => [
              propName,
              studentPropValues[idx],
            ]);
            studGroups[field].push(Object.fromEntries(studEntries));
          }

          const totStudents = Object.values(studGroups).reduce(
            (pre, cur) => (pre || []).length + cur.length
          );
          reportParts.push(`Number of students: ${totStudents}`);
          for (const [field, group] of Object.entries(studGroups)) {
            reportParts.push(
              [
                `Number of students in ${field}: ${group.length}.`,
                "List:",
                group.map((student) => student.firstname).join(", "),
              ].join(" ")
            );
          }
          resolve(reportParts.join("\n"));
        }
      });
    }
  });

app.get("/", (_, res) => {
  res.send("Hello Holberton School!");
});

app.get("/students", (_, res) => {
  const responseParts = ["This is the list of our students"];

  countStud(DB_FILE)
    .then((report) => {
      responseParts.push(report);
      const responseText = responseParts.join("\n");
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Content-Length", responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    })
    .catch((err) => {
      responseParts.push(err instanceof Error ? err.message : err.toString());
      const responseText = responseParts.join("\n");
      res.setHeader("Content-Type", "text/plain");
      res.setHeader("Content-Length", responseText.length);
      res.statusCode = 200;
      res.write(Buffer.from(responseText));
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;