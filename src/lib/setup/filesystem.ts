import fs from 'fs'
import path from 'path'

// Functions
const configure = () => {
  const base = path.resolve('dist');
  if (!fs.existsSync(path.join(base, '/public/uploads/'))) {
    fs.mkdirSync(path.join(base, '/public/uploads/'))
  }
}

export default { configure }
