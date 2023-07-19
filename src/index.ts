import { gsap } from 'gsap'
import './style.less'

const { random, floor } = Math

type Shape = 'circle' | 'matrix' | 'cross'
interface Info {
  x: number
  y: number
}

function getPosCssText(info: Info) {
  return `
    position: absolute;
    left: ${info.x}px;
    top: ${info.y}px;
    `
}

function getEl(shape: Shape, info: Info) {
  const el = document.createElement('div')
  el.classList.add(shape)
  el.style.cssText = getPosCssText(info)
  document.querySelector('body')?.appendChild(el)
  return el
}

function randomColor() {
  const r = floor(random() * 255)
  const g = floor(random() * 255)
  const b = floor(random() * 255)
  return `rgb(${r},${g},${b})`
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
    const td = random() * 10 // 平移单位
    const isShow = random() > 0.8 // 是否隐藏
    if (isShow) {
      tl.to(
        el,
        {
          x: isX ? (isPositive ? td : -td) : 0,
          y: !isX ? (isPositive ? td : -td) : 0,
          opacity: 1,
          duration: 0.1,
          repeat: -1,
        },
        i === 0 ? 0 : '+=0'
      )
    } else {
      tl.to(
        el,
        {
          opacity: 0,
          duration: 1,
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
