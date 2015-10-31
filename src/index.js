/* global requestAnimationFrame */
import * as P from 'pixi.js'

let backgroundColor = 0x1099bb
let renderer = P.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor})
renderer.view.className = 'officium'

document.body.appendChild(renderer.view)

let stage = new P.Container()

P.loader
  .add('assets/tiles.png')
  .load(onLoaded)

function onLoaded (loader, res) {
  let tiles = res['assets/tiles.png'].texture
  let rectangle = new P.Rectangle(0, 178, 65, 89)
  tiles.frame = rectangle

  let tile = new P.Sprite(tiles)
  tile.position.x = 100
  tile.position.y = 200
  stage.addChild(tile)

  rectangle = new P.Rectangle(0, 178, 65, 89)
  tiles.frame = rectangle

  tile = new P.Sprite(tiles)
  tile.position.x = 170
  tile.position.y = 200
  stage.addChild(tile)
}

function gameLoop () {
  requestAnimationFrame(gameLoop)

  renderer.render(stage)
}
gameLoop()
