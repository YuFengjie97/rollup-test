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

function randomMM(min: number, max: number) {
  return parseFloat((min + (max - min) * random()).toFixed(1))
}

class Shape {
  x: number
  y: number
  el: HTMLElement
  tl: gsap.core.Timeline
  constructor(pos: Pos, className: string, cssText?: string) {
    this.x = pos.x
    this.y = pos.y
    const body = document.querySelector('body')
    this.el = document.createElement('div')
    this.el.classList.add('shape', className)
    this.el.style.cssText = `
      --left: ${this.x}px;
      --top: ${this.y}px;
      ${cssText}
    `
    body?.appendChild(this.el)

    this.tl = gsap.timeline({ repeat: -1, yoyo: true })
    this.animate()
  }
  animate() {
    const count = 10
    for (let i = 0; i < count; i += 1) {
      const isX = random() > 0.5 // 是否水平方向平移
      const isPositive = random() > 0.5 // 是否正方向平移
      const td = randomMM(2, 4) // 平移单位
      const isShow = random() > 0.5 // 是否隐藏
      const scaleXD = randomMM(0.6, 0.8)
      const scaleYD = randomMM(0.6, 0.8)
      const duration = 0.2
      this.tl.to(
        this.el,
        {
          x: `+=${isX ? (isPositive ? td : -td) : 0}`,
          y: `+=${isX ? 0 : isPositive ? td : -td}`,
          scale: scaleXD,
          scaleY: scaleYD,
          opacity: isShow ? 1 : 0.5,
          duration,
        },
        i === 0 ? '' : '+=0'
      )
    }
  }
}

class Circle extends Shape {
  constructor(
    pos: Pos,
    size: number,
    borderWidth: number,
    borderColor: string
  ) {
    const cssText = `
    --width: ${size}px;
    --height: ${size}px;
    --borderWidth: ${borderWidth}px;
    --borderColor: ${borderColor};`
    super(pos, 'circle', cssText)
  }
}

class Matrix extends Shape {
  constructor(
    pos: Pos,
    op: {
      cellSize: number
      cols: number
      rows: number
      gap: number
      color: string
    }
  ) {
    const cssText = `
    --cellSize: ${op.cellSize}px;
    --gap: ${op.gap}px;
    --color: ${op.color}
    `
    super(pos, 'matrix', cssText)

    for (let i = 0; i < op.rows; i += 1) {
      const divRow = document.createElement('div')
      this.el.appendChild(divRow)
      divRow.classList.add('row')
      for (let j = 0; j < op.cols; j += 1) {
        const divCell = document.createElement('div')
        divCell.classList.add('cell')
        divRow.appendChild(divCell)
      }
    }
  }
}

class Cross extends Shape {
  constructor(
    pos: Pos,
    op: {
      size: number // 正方形尺寸
      barWidth: number // 实心叉横条高度
      color: string
    }
  ) {
    const cssText = `
    --size: ${op.size}px;
    --barWidth: ${op.barWidth}px;
    --color: ${op.color};
    `
    super(pos, 'cross', cssText)

    const barRow = document.createElement('div')
    barRow.classList.add('row')
    const barCol = document.createElement('div')
    barCol.classList.add('col')
    this.el.appendChild(barRow)
    this.el.appendChild(barCol)
  }
}

class Bar extends Shape {
  constructor(pos: Pos, op: {
    width: number
    height: number
    color: string
  }) {
    const cssText = `
    --width: ${op.width}px;
    --height: ${op.height}px;
    --color: ${op.color};
    `
    super(pos, 'bar', cssText)
  }
}

class Drum extends Shape {
  constructor(pos: Pos) {
    super(pos, 'drum')
  }
}

window.onload = function () {
  const width = window.innerWidth
  const height = window.innerHeight
  const circleNum = 4
  const matrixNum = 4
  const corssNum = 4
  const barNum = 4

  for (let i = 0; i < circleNum; i += 1) {
    const pos = {
      x: width * random(),
      y: height * random(),
    }
    const size = randomMM(40, 80)
    const bw = randomMM(4, 8)
    const bc = '#fff'

    new Circle(pos, size, bw, bc)
  }
  for (let i = 0; i < matrixNum; i += 1) {
    const pos = {
      x: width * random(),
      y: height * random(),
    }
    const cellSize = randomMM(4, 12)
    const cols = randomMM(4, 12)
    const rows = randomMM(4, 12)
    const gap = randomMM(4, 12)

    new Matrix(pos, {
      cellSize,
      cols,
      rows,
      gap,
      color: '#fff',
    })
  }

  for (let i = 0; i < corssNum; i += 1) {
    const pos = {
      x: width * random(),
      y: height * random(),
    }
    const size = randomMM(50, 150)
    const barWidth = randomMM(20, 40)
    const color = '#fff'
    new Cross(pos, {
      size,
      barWidth,
      color,
    })
  }
  for(let i=0;i<barNum;i+=1){
    const pos = {
      x: width * random(),
      y: height * random(),
    }
    const w = randomMM(80, 340)
    const h = randomMM(1,4)
    new Bar(pos, {
      width: w,
      height: h,
      color: '#fff'
    })
  }
}
