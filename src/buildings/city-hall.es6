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

  // Tree
  let tree = new P.Sprite(textures['pineGreen_low.png'])
  tree.position.set(house.width + main.width - 10, main.height - tree.height)
  c.addChild(tree)

  let text = new P.Text('City Hall', {
    font: 'bold 18px "Short Stack"',
    fill: '#a56729',
    stroke: '#ffffff',
    strokeThickness: 3
  })
  text.visible = false
  c.addChild(text)

  c.interactive = true
  c.on('mouseover', () => text.visible = true)
  c.on('mouseout', () => text.visible = false)

  // Reposition
  house.y = Math.abs(main.height - house.height)
  text.x = Math.floor((c.width - text.width) / 2)

  return c
}
