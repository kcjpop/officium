/* global requestAnimationFrame */
import * as P from 'pixi.js'
import forEach from 'lodash/collection/forEach'

let backgroundColor = 0x1099bb
let renderer = P.autoDetectRenderer(window.innerWidth, window.innerHeight, {backgroundColor})
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

function makeCityHall () {
  let c = new P.Container()

  let base = new Sprite(textures['stoneGateRight.png'])
  base.position.set(0, 6 * 22 + 5)
  c.addChild(base)

  let n = 5
  while (n > 0) {
    let floor = new Sprite(textures['stoneWindows.png'])
    floor.position.set(0, 5 + (n-- * 22))
    c.addChild(floor)
  }

  let roof = new Sprite(textures['stoneRoofPointy.png'])
  roof.position.set(0, 0)
  c.addChild(roof)

  return c
}

function onLoaded (loader, res) {
  let cityBadge = makeCityBadge()
  cityBadge.position.set(10, 10)
  stage.addChild(cityBadge)

  let n = 0
  while (n < 20) {
    let tile = new Sprite(textures['tileRock.png'])
    tile.position.set((n++ * 65), 500)
    stage.addChild(tile)
  }

  n = 0
  while (n < 19) {
    let tile = new Sprite(textures['tileDirt_full.png'])
    tile.position.set((n++ * 65) + 32, 428)
    stage.addChild(tile)
  }

  n = 0
  while (n < 19) {
    let tile = new Sprite(textures['tileDirt_full.png'])
    tile.position.set((n++ * 65) + 32, 407)
    stage.addChild(tile)
  }

  n = 0
  while (n < 19) {
    let tile = new Sprite(textures['tileGrass.png'])
    tile.position.set((n++ * 65) + 32, 386)
    stage.addChild(tile)
  }

  let tower = new Sprite(textures['tileStone_full.png'])
  tower.position.set(65 * 20, 500)
  stage.addChild(tower)

  n = 0
  while (n < 5) {
    let part = new Sprite(textures['tileStone_full.png'])
    part.position.set(65 * 20, 500 - (n++ * 21))
    stage.addChild(part)
  }

  let cityHall = makeCityHall()
  cityHall.position.set(250, 200)
  cityHall.interactive = true
  cityHall.on('mousedown', e => console.log('clicked', e))
  stage.addChild(cityHall)

  let top = new Sprite(textures['tileSnow.png'])
  top.position.set(65 * 20, 500 - (5 * 21))
  stage.addChild(top)

  let frames = []
  forEach(['alienBeige_walk1.png', 'alienBeige_walk2.png'], frame => frames.push(textures[frame]))
  let alien = new P.extras.MovieClip(frames)
  // alien.scale.set(0.7, 0.7)
  alien.animationSpeed = 0.1
  alien.position.set(200, 450)
  alien.play()
  stage.addChild(alien)

  a = alien

  gameLoop()
}

function state () {
  a.position.x += 2
}

function gameLoop () {
  state()

  renderer.render(stage)

  requestAnimationFrame(gameLoop)
}
