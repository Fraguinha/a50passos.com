import fs from 'fs';
import path from 'path';

// Functions
const configure = () => {
  if (!fs.existsSync(path.join(__dirname, '/../../public/uploads/'))) {
    fs.mkdirSync(path.join(__dirname, '/../../public/uploads/'));
  }
};

export = { configure };
