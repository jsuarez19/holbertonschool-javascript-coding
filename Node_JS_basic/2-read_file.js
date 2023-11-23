import { readFileSync } from 'fs';

function countStudents(path) {
  try {
    const csvData = readFileSync(path, 'utf8');
    const lines = csvData.trim().split('\n').slice(1);
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
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

export default countStudents;
