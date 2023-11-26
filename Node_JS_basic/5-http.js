const http = require('http');
const countStudents = require('./3-read_file_async');

const PORT = 1245;
const databaseFile = process.argv[2] || 'database.csv';

const buildStudentsResponse = (students, totalStudents) => {
  const csList = students.CS.list.join(', ');
  const sweList = students.SWE.list.join(', ');

  return `This is the list of our students\nNumber of students: ${totalStudents
  }\nNumber of students in CS: ${students.CS.count}. List: ${csList}\nNumber of students in SWE: ${students.SWE.count
  }. List: ${sweList}`;
};

const handleStudentsRequest = (res) => {
  countStudents(databaseFile)
    .then(({ students, totalStudents }) => {
      const response = buildStudentsResponse(students, totalStudents);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(response);
    })
    .catch((error) => {
      console.error(error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
};

const app = http.createServer((req, res) => {
  const { url } = req;

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (url === '/students') {
    handleStudentsRequest(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
