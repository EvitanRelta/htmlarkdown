import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    testEnvironment: 'jsdom',
    transformIgnorePatterns: ['node_modules/(?!escape-string-regexp)'],
    transform: {
        '\\.(t|j)s$': '@swc/jest',
    },
    // moduleNameMapper: {
    //     '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    //     '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    //         '<rootDir>/__mocks__/fileMock.js',
    // },
}

export default config
