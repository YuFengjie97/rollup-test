import {gsap} from 'gsap'

console.log(gsap)

type Shape = 'circle' | 'matrix' | 'cross'
interface Info {
  x: number
  y: number
  w: number
  h: number
}

function getPosCssText(info: Info) {
  return `
    position: absolute;
    left: ${info.x}px;
    top: ${info.y}px;
    width: ${info.w}px;
    height: ${info.h}px
    `
}

function getEl(shape: Shape, info: Info) {
  const el = document.createElement('div')
  el.classList.add(shape)
  el.style.cssText = getPosCssText(info)
  document.querySelector('body')?.appendChild(el)
  return el
}

window.onload = function () {
  const e = getEl('circle', { x: 100, y: 100, w: 100, h: 100 })
  console.log(e);
  
  gsap.to(e, {
    x: 200,
    duration: 1,
  })
}
