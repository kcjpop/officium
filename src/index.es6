/* global requestAnimationFrame */
import * as P from 'pixi.js'
import forEach from 'lodash/collection/forEach'
import CityHall from 'buildings/city-hall'
import Oulu from 'maps/oulu'

let game = {
  viewport: {w: window.innerWidth, h: window.innerHeight}
}
let backgroundColor = 0x1099bb
let renderer = P.autoDetectRenderer(game.viewport.w, game.viewport.h, {backgroundColor})
renderer.view.className = 'officium'

document.body.appendChild(renderer.view)

let stage = new P.Container()

let a = {}
// Aliases
let textures = P.utils.TextureCache
let Sprite = P.Sprite

P.loader
  .add('assets/fullTiles.json')
  .add('assets/aliens.json')
  .add('assets/buildings.json')
  .add('assets/fields.json')
  .add('assets/ui.json')
  .add('assets/characters/alienBeige.json')
  .load(onLoaded)

function makeCityBadge () {
  let container = new P.Container()
  let t = textures['buttonLong_beige.png']
  let c = new Sprite(t)
  c.position.set(0, 0)
  container.addChild(c)

  let text = new P.Text('OULU', {
    font: 'bold 25px "Short Stack"',
    fill: '#a56729',
    stroke: '#ffffff',
    strokeThickness: 5
  })
  text.position.set(50, 3)
  container.addChild(text)

  return container
}

function onLoaded (loader, res) {
  let cityBadge = makeCityBadge()
  cityBadge.position.set(10, 10)
  stage.addChild(cityBadge)

  let map = Oulu()
  console.log(map.height)
  map.position.set(
    Math.floor((game.viewport.w - map.width) / 2),
    Math.floor((game.viewport.h - map.height) / 2)
  )
  stage.addChild(map)

  let cityHall = CityHall()
  cityHall.position.set(250, 200)
  stage.addChild(cityHall)

  let frames = []
  forEach(['alienBeige_walk1.png', 'alienBeige_walk2.png'], frame => frames.push(textures[frame]))
  let alien = new P.extras.MovieClip(frames)
  alien.vx = 2
  // alien.rotation = - Math.PI / 2
  alien.anchor.set(0.5, 0.5)
  // alien.scale.set(0.7, 0.7)
  alien.animationSpeed = 0.1
  alien.position.set(200, 450)
  alien.play()
  stage.addChild(alien)

  a = alien

  gameLoop()
}

function state () {
  a.position.x += a.vx
  // if (a.position.x < 10 || a.position.x > 200) {
  if (a.position.x === 10 || a.position.x > game.viewport.w - a.width) {
    a.vx *= -1
  }
}

function gameLoop () {
  state()

  renderer.render(stage)

  requestAnimationFrame(gameLoop)
}
