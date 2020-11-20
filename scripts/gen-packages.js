const { execSync } = require('child_process');
const fs = require('fs');

const files = fs.readdirSync('./debian/.tmp/');

for (let i = 0; i < files.length; i++) {
  execSync(`reprepro includedeb stable ./.tmp/${files[i]}`, {
    cwd: './debian/',
  });
}
