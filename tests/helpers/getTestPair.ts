import { readdirSync } from 'fs'
import { basename, dirname, parse, resolve } from 'path'
import { getFileContents } from './getFileContents'

type Input = string
type ExpectedOutput = string

// Expects the file structure for testPairDir === './inputOutputs/myTest':
//   inputOutputs
//   ├── myTest.in.ext
//   └── myTest.out.ext
// or if the input & output are the same:
//   inputOutputs
//   └── myTest.inout.ext
// (where .ext can be any extension)

export const getTestPairHOF = (__dirname: string) => (testPairPath: string) => {
    const baseName = basename(testPairPath)
    const dir = resolve(__dirname, dirname(testPairPath))

    const fileNames = readdirSync(dir)
    const inputFileMatches = fileNames.filter(
        (fileName) => parse(fileName).name === `${baseName}.in`
    )
    const outputFileMatches = fileNames.filter(
        (fileName) => parse(fileName).name === `${baseName}.out`
    )
    const inoutFileMatches = fileNames.filter(
        (fileName) => parse(fileName).name === `${baseName}.inout`
    )

    const noInOutPair = inputFileMatches.length === 0 || outputFileMatches.length === 0
    const noInOutSingle = inoutFileMatches.length === 0
    if (noInOutPair && noInOutSingle) throw new Error('No input/output file found.')

    const hasMultipleInOutPairs = inputFileMatches.length > 1 || outputFileMatches.length > 1
    const hasMultipleInOutSingles = inoutFileMatches.length > 1
    const hasPairAndSingle = inputFileMatches.length !== 0 && inoutFileMatches.length !== 0
    if (hasMultipleInOutPairs || hasMultipleInOutSingles || hasPairAndSingle)
        throw new Error('Multiple input/output files found.')

    let inputPath: string, expectedOutputPath: string
    const isInOutPair = inputFileMatches.length !== 0
    if (isInOutPair) {
        inputPath = resolve(dir, inputFileMatches[0])
        expectedOutputPath = resolve(dir, outputFileMatches[0])
    } else {
        const inoutFilePath = inoutFileMatches[0]
        inputPath = resolve(dir, inoutFilePath)
        expectedOutputPath = resolve(dir, inoutFilePath)
    }

    const removeCarriageReturn = (str: string) => str.replaceAll('\r', '')
    return [
        removeCarriageReturn(getFileContents(inputPath)),
        removeCarriageReturn(getFileContents(expectedOutputPath)),
    ] as [Input, ExpectedOutput]
}
