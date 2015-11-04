import * as P from 'pixi.js'
import Block from 'el/block'
import {random} from 'lodash'

export default function () {
  let textures = P.utils.TextureCache
  let c = new P.Container()

  let rows = 1
  while (rows <= 3) {
    let n = 0
    while (n < 19) {
      let t = new P.Sprite(textures['tileGrass_full.png'])
      t.position.set(34 + (n * 65), rows * 34)
      c.addChild(t)
      n++
    }

    rows++
  }

  let n = 0
  while (n < 20) {
    let a = Block({flower: random(0, 1) > 0})
    a.position.set(n * 65, (rows + 1) * 30)
    c.addChild(a)
    n++
  }

  return c
}
