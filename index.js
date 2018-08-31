const path = require('path');
const fs = require('fs');
const xml2js = require('xml2js');

const parser = new xml2js.Parser();
const dirPath = path.join(__dirname, 'sql-xml');
const results = [];

fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error(`Unable to scan directory: ${err}`);
  }

  console.log(`There are ${files.length} tables`);

  files.forEach(file => {
    if (file.startsWith('.')) {
      return;
    }

    const filePath = `${dirPath}/${file}`;

    const data = fs.readFileSync(filePath);

    parser.parseString(data, (err, result) => {
      if (err) {
        console.error(`Unable to parse file content: ${file}`);
      }

      let table = {};

      result.mysqldump.database.forEach(it => {
        it.table_structure.forEach(it => {
          const name = it['$'].name;
          const attributes = [];
          it.field.forEach(it => {
            const { field, type, ...rest } = it['$'];
            const attribute = {
              name: field,
              type,
              nullable: rest.null == 'YES',
            };
            attributes.push(attribute);
          });

          table = { name, attributes };
        });
      });

      results.push(table);
    });

    fs.writeFileSync('sql.json', JSON.stringify(results), 'utf8', 4);
  });
});
