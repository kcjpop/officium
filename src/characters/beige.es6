/* global $ */
import * as P from 'pixi.js'
import {forEach} from 'lodash'
import {drawText} from 'helpers'

export default class BeigeAlien {
  constructor () {
    this.textures = P.utils.TextureCache
    return this.stand()
  }

  stand () {
    let sprite = new P.Sprite(this.textures['alienBeige.png'])
    let t = drawText('Moi!')
    t.position.set(sprite.width, -20)
    sprite.addChild(t)

    sprite.interactive = true
    sprite.on('click', () => $('#js-character-modal').modal('show'))
    return sprite
  }

  walk () {
    let frames = []
    forEach(['alienBeige_walk1.png', 'alienBeige_walk2.png'], frame => frames.push(this.textures[frame]))
    return new P.extras.MovieClip(frames)
  }
}
