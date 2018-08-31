const path = require('path');
const fs = require('fs');

const dirPath = path.join(__dirname, 'sql-xml');

fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error(`Unable to scan directory: ${err}`);
  }

  console.log(`There are ${files.length} tables`);

  files.forEach(file => {
    console.log(file);
  });
});
