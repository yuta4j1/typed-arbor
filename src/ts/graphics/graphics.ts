import Colors from './colors'
import Primitives from './primitive'
import { nano } from '../helper'
import { RGB, DrawStyle, FontStyle, TextStyle, FigureStyle, OvalStyle, PathStyle } from '../types'

const dom = document.getElementsByTagName("canvas")
const ctx = dom[0].getContext('2d')

let _bounds = null

const _colorMode = "rgb"
const _coordMode = "origin"

let _drawLibrary = {}


let _drawStyle: DrawStyle = {
    background: null,
    fill: null,
    stroke: null,
    width: 0
}

let _fontLibrary = {}

let _fontStyle: FontStyle = {
    font: 'sans-serif',
    size: 12,
    align: 'left',
    color: Colors.decode('black'),
    alpha: 1,
    baseline: "ideographic"
}

let _lineBuffer = []

const primitives = Primitives(ctx, _drawStyle, _fontStyle)
const _Oval = primitives.Oval
const _Rect = primitives.Rect
const _Color = primitives.Color
const _Path = primitives.Path

const graphics = {
    init: () => {
        if (!ctx) return null
        return graphics
    },

    size (width: number, height: number) {
        dom[0].setAttribute("width", String(width))
        dom[0].setAttribute("height", String(height))
        return {
            width: width,
            height: height
        }
    },

    clear(
        x: number = 0,
        y: number = 0,
        w: number = Number(dom[0].getAttribute("width")),
        h: number = Number(dom[0].getAttribute("height"))
    ) {
        ctx.clearRect(x, y, w, h)
        if (_drawStyle.background) {
            ctx.save()
            ctx.fillStyle = Colors.encode(_drawStyle.background)
            ctx.fillRect(x, y, w, h)
            ctx.restore()
        }
    },

    bacground (
        r: number,
        g: number,
        b: number,
        a: number
    ): void {
        const fillColor = Colors.decode(r, g, b, a)
        if (fillColor) {
            _drawStyle.background = fillColor
            graphics.clear()
        }
    },
    noFill(): void {
        _drawStyle.fill = null
    },
    fill(
        r: number,
        g: number,
        b: number,
        a: number
    ): void {
        const fillColor = Colors.decode(r, g, b, a)
        _drawStyle.fill = fillColor
        ctx.fillStyle = Colors.encode(fillColor)
    },
    noStroke(): void {
        _drawStyle = null
        ctx.stroke = null
    },
    stroke(
        r: number,
        g: number,
        b: number,
        a: number
    ): void {
        const strokeColor = Colors.decode(r, g, b, a)
        _drawStyle.stroke = strokeColor
        ctx.strokeStyle = Colors.encode(strokeColor)
    },
    strokeWidth(ptSize: number): void {
        _drawStyle.width = ptSize
        ctx.lineWidth = ptSize
    },
    Color(clr: string) {
        const rgb: RGB = Colors.decode(clr)
        return new _Color(rgb.r, rgb.g, rgb.b, rgb.alpha)
    },
    drawStyle(style: DrawStyle) {

    },
    // TODO styleの型
    _drawStyle(styleName: string, style: DrawStyle): void {
        // const textColor = Colors.decode(style.)
    },
    textWidth(text: string, style: TextStyle): number {
        const txtStyle = Object.assign(_fontStyle, style)
        ctx.save()
        ctx.font = nano("{size}px {font}", style)
        const width = ctx.measureText(text).width
        ctx.restore()
        return width
    },
    Rect(
        x: number,
        y: number,
        w: number,
        h: number,
        r: number,
        style: FigureStyle
    ) {
        return new _Rect(x, y, w, h, r, style)
    },
    rect(
        x: number,
        y: number,
        w: number,
        h: number,
        r: number,
        style: FigureStyle
    ): void {
        _Rect.prototype._draw(x, y, w, h, r, style)
    },
    Oval(
        x: number,
        y: number,
        w: number,
        h: number,
        style: OvalStyle
    ) {
        return new _Oval(x, y, w, h, style)
    },
    oval(
        x: number,
        y: number,
        w: number,
        h: number,
        style: OvalStyle
    ): void {
        _Oval.prototype._draw(x, y, w, h, style)
    },
    line(
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        style: PathStyle
    ): void {
        const p = new _Path(x1, y1, x2, y2)
        p.draw(style)
    },
    lines(
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ): void {
        _lineBuffer.push([
            { x: x1, y: y1 },
            { x: x2, y: y2 }
        ])
    },
    drawLines(style: PathStyle): void {
        // コンストラクタの前に、コンストラクタ引数形式に変換する関数をかます
        // const p = new _Path(_lineBuffer)
    }

}

export default graphics



