const fs = require("fs");

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Habtamu Ararsie <https://github.com/habtamuararsie>
 */
const countStud = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error("Cannot load the database");
  }
  if (!fs.statSync(dataPath).isFile()) {
    throw new Error("Cannot load the database");
  }
  const fileLines = fs
    .readFileSync(dataPath, "utf-8")
    .toString("utf-8")
    .trim()
    .split("\n");
  const studGroups = {};
  const dbFieldNames = fileLines[0].split(",");
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

  for (const line of fileLines.slice(1)) {
    const studRecord = line.split(",");
    const studentPropValues = studRecord.slice(0, studRecord.length - 1);
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

  const totalStud = Object.values(studGroups).reduce(
    (pre, cur) => (pre || []).length + cur.length
  );
  console.log(`Number of students: ${totalStud}`);
  for (const [field, group] of Object.entries(studGroups)) {
    const studNames = group.map((stud) => student.firstname).join(", ");
    console.log(
      `Number of students in ${field}: ${group.length}. List: ${studNames}`
    );
  }
};

module.exports = countStud;