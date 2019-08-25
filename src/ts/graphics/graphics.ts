import Colors from './colors'
import Primitives from './primitive'
import { DrawStyle, FontStyle } from '../types'

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
    ) {
        const fillColor = Colors.decode(r, g, b, a)
        if (fillColor) {
            // _drawStyle.background = fillColor
            // graphics.clear()
        }

    }

}

export default graphics



