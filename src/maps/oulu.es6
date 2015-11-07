import * as P from 'pixi.js'
import CityHall from 'buildings/city-hall'
import SandBuilding from 'buildings/sand'
import {GrassBlock, SnowBlock} from 'el/blocks'
import {random} from 'lodash'

let textures = P.utils.TextureCache

function buildGrassBlocks () {
  let c = new P.Container()

  let rows = 1
  while (rows <= 2) {
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
    let a = GrassBlock({flower: random(0, 1) > 0})
    a.position.set(n * 65, (rows + 1) * 34)
    c.addChild(a)
    n++
  }

  return c
}

function buildSnowBlocks () {
  let c = new P.Container()

  let d = SnowBlock({height: 7})
  d.position.set(32, 0)
  let rock = new P.Sprite(textures['rockSnow_2.png'])
  rock.scale.set(0.5, 0.5)
  rock.position.set(15, 20)
  d.addChild(rock)
  c.addChild(d)

  let b = SnowBlock({height: 3})
  c.addChild(b)
  b.position.set(0, Math.abs(d.height - b.height))

  let tree = new P.Sprite(textures['pineBlue_mid.png'])
  tree.position.set(10, 35)
  c.addChild(tree)

  let e = SnowBlock({height: 4})
  e.position.set(65, Math.abs(d.height - e.height))
  c.addChild(e)

  let f = SnowBlock({height: 4})
  f.position.set(65 + 65, Math.abs(d.height - e.height))
  c.addChild(f)

  return c
}

export default function () {
  let c = new P.Container()
  let grassBlocks = buildGrassBlocks()
  let snowBlocks = buildSnowBlocks()

  snowBlocks.position.set(65, 31)
  c.addChild(snowBlocks)

  grassBlocks.position.set(0, snowBlocks.height)
  c.addChild(grassBlocks)

  let cityHall = CityHall()
  cityHall.position.set(c.width - 300, 65)
  c.addChild(cityHall)

  let sand = SandBuilding()
  sand.position.set(snowBlocks.width + 130, snowBlocks.height - 33)
  c.addChild(sand)

  return c
}
