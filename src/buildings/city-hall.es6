import * as P from 'pixi.js'

export default function () {
  let textures = P.utils.TextureCache
  let c = new P.Container()

  let house = (() => {
    let c = new P.Container()

    let base = new P.Sprite(textures['woodWindowBlinds.png'])
    base.position.set(0, 20)
    c.addChild(base)

    let roof = new P.Sprite(textures['redRoofStraight.png'])
    roof.position.set(0, 0)
    c.addChild(roof)

    return c
  })()
  house.position.set(0, 0)
  c.addChild(house)

  let main = (() => {
    let c = new P.Container()
    let base = new P.Sprite(textures['woodGateLeft.png'])
    base.position.set(0, 6 * 22 + 5)
    c.addChild(base)

    let n = 5
    while (n > 0) {
      let floor = new P.Sprite(textures['woodWindows.png'])
      floor.position.set(0, 5 + (n-- * 22))
      c.addChild(floor)
    }

    let roof = new P.Sprite(textures['woodRoofPointy.png'])
    roof.position.set(0, 0)
    c.addChild(roof)

    return c
  })()
  main.position.set(house.width, 0)
  c.addChild(main)

  house.y = Math.abs(main.height - house.height)

  return c
}
