import Victor from 'victor'
import * as PIXI from 'pixi.js'
import './style.less'

const mRandom = Math.random
const { innerWidth, innerHeight } = window
const randomHex = () => {
  return mRandom() * 0xffffff
}

const app = new PIXI.Application({ resizeTo: window, background: 0x000 })
document.body.appendChild(app.view as HTMLCanvasElement)

const totalParticals = 10000
const particleCon = new PIXI.ParticleContainer(totalParticals, {
  scale: true,
  position: true,
  rotation: true,
  uvs: true,
  alpha: true,
})

app.stage.addChild(particleCon)

class Particle {
  graphics: PIXI.Graphics
  x: number
  y: number
  fill: number
  constructor(x: number, y: number, fill: number) {
    this.graphics = new PIXI.Graphics()
    this.x = x
    this.y = y
    this.fill = fill
    app.stage.addChild(this.graphics)
  }
  update() {
    this.x += 0.1
  }
  render() {
    this.graphics.clear()
    this.graphics.x = this.x
    this.graphics.y = this.y
    this.graphics.beginFill(this.fill)
    this.graphics.drawCircle(0, 0, mRandom() * 40)
    this.graphics.endFill()
  }
}

const particles: Array<Particle> = []
;(function initParticles() {
  for (let i = 0; i < totalParticals; i++) {
    const x = mRandom() * innerWidth
    const y = mRandom() * innerHeight
    const c = randomHex()
    const p = new Particle(x, y, c)
    particles.push(p)
  }
})()

app.ticker.add((delta) => {
  particles.forEach((p) => {
    p.update()
    p.render()
  })
})
