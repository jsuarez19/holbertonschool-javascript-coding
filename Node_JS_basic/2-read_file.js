const fs = require('fs');

function countStudents(path) {
  try {
    const csvData = fs.readFileSync(path, 'utf8');
    const lines = csvData.split('\n');

    const studentCountsByField = {};
    let totalStudents = 0;

    for (const line of lines) {
      const columns = line.split(',');
      const [firstName, , , field] = columns.map((column) => column.trim());

      if (studentCountsByField[field]) {
        studentCountsByField[field] += 1;
      } else {
        studentCountsByField[field] = 1;
      }

      totalStudents += 1;
    }

    console.log(`Number of students: ${totalStudents}`);
    
    for (const field of Object.keys(studentCountsByField)) {
      const studentsInField = lines
        .filter((line) => line.includes(field))
        .map((line) => line.split(',')[0].trim())
        .join(', ');

      console.log(`Number of students in ${field}: ${studentCountsByField[field]}. List: ${studentsInField}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
