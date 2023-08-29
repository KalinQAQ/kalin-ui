import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const version = require('../package.json').version

fs.writeFileSync(
  path.resolve(__dirname, '..', 'src', 'version.ts'),
  `export default '${version}'\n`
)
