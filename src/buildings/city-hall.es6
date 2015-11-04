import * as P from 'pixi.js'

export default function () {
  let textures = P.utils.TextureCache
  let c = new P.Container()

  let base = new P.Sprite(textures['stoneGateRight.png'])
  base.position.set(0, 6 * 22 + 5)
  c.addChild(base)

  let n = 5
  while (n > 0) {
    let floor = new P.Sprite(textures['stoneWindows.png'])
    floor.position.set(0, 5 + (n-- * 22))
    c.addChild(floor)
  }

  let roof = new P.Sprite(textures['stoneRoofPointy.png'])
  roof.position.set(0, 0)
  c.addChild(roof)

  return c
}
