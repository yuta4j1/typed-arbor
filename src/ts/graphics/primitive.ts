import { OvalStyle, RectStyle, PathStyle, DrawStyle, FontStyle } from '../types'
import Colors from './colors'
import { RGB } from '../types'

type Point = {
    x: number,
    y: number
}

const primitives = (ctx: CanvasRenderingContext2D, _drawStyle: DrawStyle, _fontStyle: FontStyle) => {
    class Oval {
        x: number
        y: number
        w: number
        h: number
        style: OvalStyle
        constructor(
            x: number, 
            y: number, 
            w: number, 
            h: number, 
            style: any = {}
        ) {
            this.x = x
            this.y = y
            this.w = w
            this.h = h
            this.style = style
        }
    
        draw(overrideStyle: OvalStyle) {
            this._draw(0, 0, 0, 0, overrideStyle)
        }
    
        _draw(
            x: number, 
            y: number, 
            w: number, 
            h: number, 
            style: OvalStyle
        ) {
            x = this.x
            y = this.y
            w = this.w
            h = this.h
            style = Object.assign(this.style, style)
            style = Object.assign(_drawStyle, style)

            const KAPPA = .5522848
            const ox = (w / 2) * KAPPA
            const oy = (h / 2) * KAPPA
            const xe = x + w
            const ye = y + h
            const xm = x + w / 2
            const ym = y + h / 2

            ctx.save()
            ctx.beginPath()
            ctx.moveTo(x, ym)
            ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
            ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
            ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
            ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)
            ctx.closePath()

            if (style.fill) {
                if (style.alpha) {
                    ctx.fillStyle = Colors.blend(style.fill, style.alpha) as string
                } else {
                    ctx.fillStyle = Colors.encode(style.fill)
                }
                ctx.fill()
            }

            if (style.stroke) {
                ctx.strokeStyle = Colors.encode(style.stroke)
                if (!isNaN(style.width)) {
                    ctx.lineWidth = style.width
                }
            }
            ctx.restore()
        }
    }

    class Rect {
        x: number
        y: number
        w: number
        h: number
        r: number = 0
        style: RectStyle | {} = {}
        constructor(
            x: number, 
            y: number, 
            w: number, 
            h: number, 
            r?: number, 
            style?: RectStyle
        ) {
            this.x = x
            this.y = y
            this.w = w
            this.h = h
            this.r = r
            this.style = style
        }

        _draw(
            x: number,
            y: number,
            w: number,
            h: number,
            r: number,
            style: RectStyle
        ) {
            x = this.x
            y = this.y
            w = this.w
            h = this.h
            style = Object.assign(this.style, style)
            style = Object.assign(_drawStyle, style)

            if (!style.stroke && style.fill) return

            const rounded = r > 0
            ctx.save()
            ctx.beginPath()
            ctx.moveTo(x + r, y)
            ctx.lineTo(x + w - r, y)
            if (rounded) ctx.quadraticCurveTo(x + w, y, x + w, y + r)
            ctx.lineTo(x + w, y + h - r)
            if (rounded) ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
            ctx.lineTo(x + r, y + h)
            if (rounded) ctx.quadraticCurveTo(x, y + h, x, y + h - r)
            ctx.lineTo(x, y + r)
            if (rounded) ctx.quadraticCurveTo(x, y, x + r, y)

            if (style.fill) {
                if (style.alpha) {
                    ctx.fillStyle = Colors.blend(style.fill, style.alpha) as string
                } else {
                    ctx.fillStyle = Colors.encode(style.fill)
                }
                ctx.fill()
            }

            if (style.stroke) {
                ctx.strokeStyle = Colors.encode(style.stroke)
                if (!isNaN(style.width)) {
                    ctx.lineWidth = style.width
                }
                ctx.stroke()
            }
            ctx.restore()
        }
    }

    class Color {
        rgb: RGB
        constructor(
            r: number, 
            g: number, 
            b: number, 
            a: number
        ) {
            this.rgb = Colors.decode(r, g, b, a)
        }

        toString(): string {
            return Colors.encode(this.rgb)
        }
    }

    class Path {
        points: Point[]
        style: PathStyle
        constructor(
            x1: number, 
            y1: number, 
            x2: number, 
            y2: number,
            style: PathStyle
        ) {
            this.points = [
                { x: x1, y: y1 }, 
                { x: x2, y: y2 }
            ]
            this.style = style
        }
        
        draw(overrideStyle: PathStyle) {
            let sublines: Point[][]
            sublines.push(this.points)

            ctx.save()
            ctx.beginPath()
            sublines.forEach((lineseg) => {
                ctx.moveTo(lineseg[0].x + 0.5, lineseg[0].y + 0.5)
                lineseg.forEach((pt: Point, i: number) => {
                    if (i !== 0) {
                        ctx.lineTo(pt.x + 0.5, pt.y + 0.5)
                    }
                })
            })

            let style = Object.assign(_drawStyle, this.style)
            style = Object.assign(style, overrideStyle)

            if (style.closed) {
                ctx.closePath()
            }

            const alpha = (style.alpha !== void 0) ? style.alpha : 1
            if (style.fill) {
                const fillColor = Colors.decode(style.fill, alpha)
                if (fillColor) {
                    ctx.fillStyle = Colors.encode(fillColor)
                }
                ctx.fill()
            }
            if (style.stroke) {
                const strokeColor = Colors.decode(style.stroke, alpha)
                if (strokeColor) {
                    ctx.strokeStyle = Colors.encode(strokeColor)
                }
                if (!isNaN(style.width)) {
                    ctx.lineWidth = style.width
                }
                ctx.stroke()
            }
            ctx.restore()
            
        }
    }

    return {
        Oval: Oval,
        Rect: Rect,
        Color: Color,
        Path: Path
    }
}

export default primitives

