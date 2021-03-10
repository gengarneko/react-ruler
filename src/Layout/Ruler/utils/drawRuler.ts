import { initCanvas } from './initCanvas'
import { calcScaleValues } from './calcScaleValues'
import { drawRulerBgColor } from './drawRulerBgColor'
import { drawRulerBgShadow } from './drawRulerBgShadow'
import { drawRulerScale } from './drawRulerScale'
import { drawRulerNumber } from './drawRulerNumber'

/**
 * 刻度尺绘制函数
 *
 * @export
 * @param { CanvasRenderingContext2D } ctx 画布上下文
 * @param { number } width 宽度
 * @param { number } height 高度
 * @param { number } scale 缩放比例
 * @param { number } ratio 屏幕分辨率
 * @param { boolean | undefined } vertical 是否垂直
 * @param startPos
 * @return
 */
export const drawRuler = ({
  ctx,
  width,
  height,
  scale = 1,
  ratio,
  vertical,
  startPos
}: {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  scale: number
  ratio: number
  vertical?: boolean
  startPos: { x: number; y: number }
}) => {
  const obj = { ctx, height, width }
  const isScaleVertical = !vertical

  const {
    gridSizeSmall,
    startValueSmall,
    offsetSmall,
    gridSizeLarge,
    startValueLarge,
    offsetLarge,
    endValue
  } = calcScaleValues({ scale, start: isScaleVertical ? startPos.x : startPos.y, length: 780 }) // TODO：写死的数值，扩展为变量

  initCanvas({ ...obj, ratio })
  drawRulerBgColor({ ...obj, color: 'rgba(225,225,225, 0)' }) // TODO：写死的数值，扩展为变量
  drawRulerBgShadow({
    ctx,
    width: 200, // TODO：写死的数值，扩展为变量
    height,
    startPos, // TODO：写死的数值，扩展为变量
    color: '#E8E8E8' // TODO：写死的数值，扩展为变量
  })
  drawRulerScale({
    ctx,
    scale,
    startPos: isScaleVertical ? { x: offsetSmall, y: 20 } : { x: 20, y: offsetSmall }, // TODO：写死的数值，扩展为变量
    space: gridSizeSmall,
    length: 20 * (3 / 8), // TODO：写死的数值，扩展为变量
    isVertical: isScaleVertical,
    startValue: startValueSmall,
    endValue: endValue,
    color: '#BABBBC', // TODO：写死的数值，扩展为变量
    isSmall: true
  })
  drawRulerScale({
    ctx,
    scale,
    startPos: isScaleVertical ? { x: offsetLarge, y: 20 } : { x: 20, y: offsetLarge }, // TODO：写死的数值，扩展为变量
    space: gridSizeLarge,
    length: 20, // TODO：写死的数值，扩展为变量
    isVertical: isScaleVertical,
    startValue: startValueLarge,
    endValue: endValue,
    color: '#C8CDD0' // TODO：写死的数值，扩展为变量
  })
  drawRulerNumber({
    ctx,
    scale,
    ratio,
    startPos: isScaleVertical ? { x: offsetLarge, y: 20 } : { x: 20, y: offsetLarge }, // TODO：写死的数值，扩展为变量
    space: gridSizeLarge,
    length: 20, // TODO：写死的数值，扩展为变量
    isVertical: isScaleVertical,
    startValue: startValueLarge,
    endValue: endValue,
    color: '#BABBBC' // TODO：写死的数值，扩展为变量
  })

  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
