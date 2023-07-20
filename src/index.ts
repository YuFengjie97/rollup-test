import { gsap } from 'gsap'
import './style.less'

const { random, floor } = Math

interface Pos {
  x: number
  y: number
}

function randomColor() {
  const r = floor(random() * 255)
  const g = floor(random() * 255)
  const b = floor(random() * 255)
  return `rgb(${r},${g},${b})`
}

class Shpae {
  x: number
  y: number
  el: HTMLElement
  constructor(pos: Pos) {
    this.x = pos.x
    this.y = pos.y
    const body = document.querySelector('body')
    this.el = document.createElement('div')
    this.el.style.cssText = `
      position: absolute;
      left: ${this.x}px;
      top: ${this.y}px;
    `
    body?.appendChild(this.el)
  }
}

class Circle extends Shpae{
  constructor(pos: Pos, size: number, borderWidth: number, borderColor: string) {
    super(pos)
    const {cssText} = this.el.style
    this.el.style.cssText = `
      ${cssText}
      border-radius: 50%;
      width: ${size}px;
      height: ${size}px;
      border: ${borderWidth}px  solid ${borderColor};
    `
  }
}



function getCircle(
  el: HTMLElement,
  op: {
    size: number
    borderWidth: number
    borderColor: string
  }
) {
  const cssTextOld = el.style.cssText
  el.style.cssText = `
  ${cssTextOld}
  width: ${op.size}px;
  height: ${op.size}px;
  border-radius: 50%;
  border: ${op.borderWidth}px solid ${op.borderColor};`
  return el
}

function anima(el: HTMLElement, count = 10) {
  const tl = gsap.timeline()
  for (let i = 0; i < count; i += 1) {
    const isX = random() > 0.5 // 是否水平方向平移
    const isPositive = random() > 0.5 // 是否正方向平移
    const td = random() * 4 // 平移单位
    const isShow = random() > 0.8 // 是否隐藏
    const duration = 0.7
    if (isShow) {
      tl.to(
        el,
        {
          x: isX ? (isPositive ? td : -td) : 0,
          y: !isX ? (isPositive ? td : -td) : 0,
          opacity: 1,
          duration,
          repeat: -1,
        },
        i === 0 ? 0 : '+=0'
      )
    } else {
      tl.to(
        el,
        {
          opacity: 0,
          duration,
          repeat: -1,
        },
        i === 0 ? 0 : '+=0'
      )
    }
  }
}

window.onload = function () {
  const width = window.innerWidth
  const height = window.innerHeight

  for (let i = 0; i < 20; i += 1) {
    const elInfo = {
      x: width * random(),
      y: height * random(),
    }
    // const c = randomColor()
    const c = '#fff'

    const e = getEl('circle', elInfo)
    const circle = getCircle(e, {
      size: 40 + random() * 40,
      borderWidth: 2 + random() * 4,
      borderColor: c
    })
    anima(circle)
  }
}
