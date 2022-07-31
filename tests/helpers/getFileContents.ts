import { readFileSync } from 'fs'

export const getFileContents = (filePath: string) => readFileSync(filePath).toString()
