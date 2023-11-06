const fs = require('fs');
import parse from 'csv-parse/lib/sync';

function countStudents(path) {
  
  try {
    const csvData = fs.readFileSync(path, 'utf8');
    // Does not take into consideration the first line
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true,
    });

    const studentCountsByField = {};

    for (const record of records) {
      const field = record.field;

      // Logs the number of students in each field
      if (studentCountsByField[field]) {
        studentCountsByField[field]++;
      } else {
        studentCountsByField[field] = 1;
      }
    }

    const totalStudents = records.length;

    console.log(`Number of students: ${totalStudents}`);

    for (const field in studentCountsByField) {
      console.log(`Number of students in ${field}: ${studentCountsByField[field]}. List: ${records
        .filter((record) => record.field === field)
        .map((record) => record.firstname)
        .join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = displayMessage;
