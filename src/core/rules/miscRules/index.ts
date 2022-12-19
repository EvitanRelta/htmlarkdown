import { image } from './image'
import { linebreak } from './linebreak'
import { link } from './link'
import { noop } from './noop'

export const miscRules = [noop, image, link, linebreak]
