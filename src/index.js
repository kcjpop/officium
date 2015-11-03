/* global requestAnimationFrame */
import * as P from 'pixi.js'

let backgroundColor = 0x1099bb
let renderer = P.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor})
renderer.view.className = 'officium'

document.body.appendChild(renderer.view)

let stage = new P.Container()

let a = {}
let textures = P.utils.TextureCache

P.loader
  .add('assets/fullTiles.json')
  .add('assets/aliens.json')
  .load(onLoaded)

function onLoaded (loader, res) {
  console.log(textures)

  let n = 0
  while (n++ < 10) {
    let tile = new P.Sprite(textures['tileAutumn.png'])
    tile.position.x = 100 + (n * 65)
    tile.position.y = 500
    stage.addChild(tile)
  }

  let alien = new P.Sprite(textures['alienBlue.png'])
  alien.position.x = 200
  alien.position.y = 480
  stage.addChild(alien)

  a = alien

  gameLoop()
}

function state () {
  // a.position.x += 1
}

function gameLoop () {
  requestAnimationFrame(gameLoop)

  state()

  renderer.render(stage)
}
