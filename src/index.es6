/* global requestAnimationFrame */
import * as P from 'pixi.js'
import Oulu from 'maps/oulu'
import {drawText} from 'helpers'
import BeigeAlien from 'characters/beige'
import BlueAlien from 'characters/blue'

let game = {
  viewport: {w: window.innerWidth, h: window.innerHeight}
}
let backgroundColor = 0x1099bb
let renderer = P.autoDetectRenderer(game.viewport.w, game.viewport.h, {backgroundColor})
renderer.view.className = 'officium'

document.body.appendChild(renderer.view)

let stage = new P.Container()
// Aliases
let textures = P.utils.TextureCache
let Sprite = P.Sprite

P.loader
  .add('assets/base.json')
  .add('assets/buildings.json')
  .add('assets/ui.json')
  .add('assets/aliens.json')
  .load(onLoaded)

function makeCityBadge () {
  let container = new P.Container()
  let t = textures['buttonLong_beige.png']
  let c = new Sprite(t)
  c.position.set(0, 0)
  container.addChild(c)

  let text = drawText('OULU', {font: 'bold 25px "Short Stack"'})
  text.position.set(50, 3)
  container.addChild(text)

  return container
}

function onLoaded (loader, res) {
  let b = new BlueAlien()
  b.vx = 2
  b.position.set(150, 150)
  stage.addChild(b)
  b.play('walk', 0.1)

  let cityBadge = makeCityBadge()
  cityBadge.position.set(10, 10)
  stage.addChild(cityBadge)

  let map = Oulu()
  map.position.set(
    Math.floor((game.viewport.w - map.width) / 2),
    Math.floor((game.viewport.h - map.height) / 2)
  )
  stage.addChild(map)

  let alien = new BeigeAlien()
  alien.vx = 2
  alien.position.set(Math.round((map.width - alien.width) / 2), map.height + alien.height)
  stage.addChild(alien)

  game.alien = alien
  game.map = map
  game.b = b

  gameLoop()
}

function state () {
  // let {alien, map} = game
  let {b, map} = game
  b.x += b.vx
  if (b.x === map.width / 2 | 0) {
    b.vx *= -1
    b.play('hurt')
  } else if (b.x === 0) {
    b.vx = 0
    b.play('stand')
  }

  // alien.x += alien.vx
  // if (alien.x <= map.x || alien.x > map.width) {
  //   alien.vx *= -1
  // }
}

function gameLoop () {
  state()

  renderer.render(stage)

  requestAnimationFrame(gameLoop)
}
