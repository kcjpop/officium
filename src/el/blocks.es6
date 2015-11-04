import * as P from 'pixi.js'
import {random, defaults} from 'lodash'

export function SnowBlock (opts = {}) {
  let {height} = defaults(opts, {
    height: 2
  })
  let textures = P.utils.TextureCache
  let c = new P.Container()

  let n = height
  while (n > 0) {
    let tile = new P.Sprite(textures['tileStone_full.png'])
    tile.position.set(0, n * 21)
    c.addChild(tile)
    n--
  }

  let tile = new P.Sprite(textures['tileSnow.png'])
  tile.position.set(0, 21)
  c.addChild(tile)

  return c
}

export function GrassBlock (opts = {}) {
  let {height, flower} = defaults(opts, {
    height: 1,
    flower: true
  })
  let textures = P.utils.TextureCache
  let c = new P.Container()

  let n = height
  while (n > 0) {
    let tile = new P.Sprite(textures['tileDirt_full.png'])
    tile.position.set(0, n * 21)
    c.addChild(tile)
    n--
  }

  let top = new P.Sprite(textures['tileGrass.png'])
  top.position.set(0, 0)
  c.addChild(top)

  if (flower === true) {
    let flowers = [
      'flowerBlue.png',
      'flowerGreen.png',
      'flowerRed.png',
      'flowerWhite.png',
      'flowerYellow.png'
    ]
    n = 5
    while (n-- > 0) {
      let f = new P.Sprite(textures[flowers[random(0, 4)]])
      f.position.set(random(0, 55), random(10, 45))
      c.addChild(f)
    }
  }

  return c
}
