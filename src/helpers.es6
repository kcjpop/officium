import * as P from 'pixi.js'
import {defaults} from 'lodash'

export function drawText (text, options = {}) {
  return new P.Text(text, defaults(options, {
    font: 'bold 18px "Short Stack"',
    fill: '#a56729',
    stroke: '#ffffff',
    strokeThickness: 3
  }))
}
