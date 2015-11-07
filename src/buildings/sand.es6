import * as P from 'pixi.js'
import {drawText} from 'helpers'

export default function () {
  let textures = P.utils.TextureCache
  let c = new P.Container()

  let building = (() => {
    let container = new P.Container()

    let x = 0
    let y = 0
    let modify = 22

    // build base
    let gate = new P.Sprite(textures['sandGateRight.png'])
    gate.position.set(x, y)
    container.addChild(gate)

    // build 4 floor
    let i = 0
    while (i < 4) {
      ++i
      let window1 = new P.Sprite(textures['sandWindowBlinds.png'])
      window1.position.set(x, y - modify * i)
      container.addChild(window1)

      ++i

      let window2 = new P.Sprite(textures['sandWindows.png'])
      window2.position.set(x, y - modify * i)
      container.addChild(window2)

    }

    // build roof
    ++i
    let roof = new P.Sprite(textures['sandRoofRounded.png'])
    roof.position.set(x, y - modify * i)
    container.addChild(roof)

    return container
  })()
  building.position.set(0, 0)
  building.interactive = true
  c.addChild(building)

  let text = drawText('Oulun Energia')
  text.visible = false
  c.addChild(text)
  text.position.set(building.width, 0)

  building.on('mouseover', () => text.visible = true)
  building.on('mouseout', () => text.visible = false)

  return c
}
