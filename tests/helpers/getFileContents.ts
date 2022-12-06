import { readFile } from 'fs/promises'

export const getFileContents = async (filePath: string): Promise<string> =>
    readFile(filePath, { encoding: 'utf8' })
