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


      if (!field || !firstName) {
        continue; // Saltar líneas incompletas
      }

      if (studentCountsByField[field]) {
        studentCountsByField[field] += 1;
      } else {
        studentCountsByField[field] = 1;
      }

      totalStudents += 1;
    }

    console.log(`Number of students: ${totalStudents}`);

    for (const field in studentCountsByField) {
      console.log(`Number of students in ${field}: ${studentCountsByField[field]}. List: ${lines
        .filter((line) => line.includes(field))
        .map((line) => line.split(',')[0].trim())
        .join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

// Llama a la función con la ruta al archivo CSV
countStudents('database.csv');


module.exports = countStudents;
