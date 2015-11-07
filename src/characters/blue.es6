import * as P from 'pixi.js'
import {forEach, map} from 'lodash'
// import {drawText} from 'helpers'

export default class BlueAlien extends P.Sprite {
  constructor (texture) {
    super(texture)

    this.textures = P.utils.TextureCache

    this.animations = {}
    this.currentAnimation = null
    this.setAnimations()
  }

  setAnimations () {
    let def = {
      stand: ['alienBlue.png'],
      hurt: ['alienBlue_hurt.png'],
      walk: [
        'alienBlue_walk1.png',
        'alienBlue_walk2.png'
      ],
      climb: [
        'alienBlue_climb1.png',
        'alienBlue_climb2.png'
      ]
    }

    forEach(def, (frames, name) => {
      let clip = new P.extras.MovieClip(map(frames, frame => this.textures[frame]))
      clip.visible = false
      this.addChild(clip)

      this.animations[name] = clip
    })
  }

  play (name, speed = 1) {
    if (this.animations[name] == null) {
      throw new Error(`Unsupported animation: ${name}`)
    }

    if (this.currentAnimation != null) {
      this.currentAnimation.visible = false
      this.currentAnimation.stop()
    }

    this.currentAnimation = this.animations[name]
    this.currentAnimation.visible = true
    this.currentAnimation.animationSpeed = speed
    this.currentAnimation.play()
  }

// alienBlue.png
// alienBlue_climb1.png
// alienBlue_climb2.png
// alienBlue_duck.png
// alienBlue_hurt.png
// alienBlue_jump.png
// alienBlue_stand.png
// alienBlue_swim1.png
// alienBlue_swim2.png
// alienBlue_walk1.png
// alienBlue_walk2.png
}
