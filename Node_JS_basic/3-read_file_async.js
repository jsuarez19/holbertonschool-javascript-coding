const fs = require('fs').promises;

function countStudents(path) {
  return fs.readFile(path, 'utf8')
    .then((data) => {
      const lines = data.trim().split('\n').slice(1);

      // Initialize the count for both fields
      const studentCountsByField = { CS: 0, SWE: 0 };
      const csStudents = [];
      const sweStudents = [];
      let totalStudents = 0;

      lines.forEach((line) => {
        const [firstname, , , field] = line.split(',');

        if (field === 'CS') {
          studentCountsByField.CS += 1;
          csStudents.push(firstname.trim());
        } else if (field === 'SWE') {
          studentCountsByField.SWE += 1;
          sweStudents.push(firstname.trim());
        }

        totalStudents += 1;
      });

      console.log(`Number of students: ${totalStudents}`);
      console.log(`Number of students in CS: ${studentCountsByField.CS}. List: ${csStudents.join(', ')}`);
      console.log(`Number of students in SWE: ${studentCountsByField.SWE}. List: ${sweStudents.join(', ')}`);
    })
    .catch(() => {
      throw Error('Cannot load the database');
    });
}

module.exports = countStudents;
