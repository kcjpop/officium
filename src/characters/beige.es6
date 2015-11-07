import * as P from 'pixi.js'
import {forEach} from 'lodash'

export default class BeigeAlien {
  constructor () {
    this.textures = P.utils.TextureCache
    return this.stand()
  }

  stand () {
    return new P.Sprite(this.textures['alienBeige.png'])
  }

  walk () {
    let frames = []
    forEach(['alienBeige_walk1.png', 'alienBeige_walk2.png'], frame => frames.push(this.textures[frame]))
    return new P.extras.MovieClip(frames)
  }
}
