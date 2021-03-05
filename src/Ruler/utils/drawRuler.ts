import { initCanvas } from './initCanvas'
import { calcScaleValues } from './calcScaleValues'
import { drawRulerBgColor } from './drawRulerBgColor'
import { drawRulerBgShadow } from './drawRulerBgShadow'
import { drawRulerScale } from './drawRulerScale'

/**
 * 刻度尺绘制函数
 *
 * @export
 * @param { CanvasRenderingContext2D } ctx 画布上下文
 * @param { number } width 宽度
 * @param { number } height 高度
 * @param { number } scale 缩放比例
 * @param { number } ratio 屏幕分辨率
 * @param { 'vertical' | 'horizontal' } direction 方向：竖 或 横
 * @return
 */
export const drawRuler = ({
  ctx,
  width,
  height,
  scale = 1,
  ratio,
  direction = 'horizontal'
}: {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  scale: number
  ratio: number
  direction: 'vertical' | 'horizontal'
}) => {
  const obj = { ctx, height, width }

  const isScaleVertical = !(direction === 'vertical')

  const {
    gridSizeSmall,
    startValueSmall,
    offsetSmall,
    gridSizeLarge,
    startValueLarge,
    offsetLarge,
    endValue
  } = calcScaleValues({ scale, start: -23, length: 780 })

  initCanvas({ ...obj, ratio })
  drawRulerBgColor({ ...obj, color: 'rgba(225,225,225, .3)' })
  drawRulerBgShadow({
    ctx,
    width: 200,
    height,
    startPos: { x: 50, y: 0 },
    color: '#E8E8E8'
  })
  drawRulerScale({
    ctx,
    scale,
    startPos: isScaleVertical
      ? { x: offsetSmall, y: 20 }
      : { x: 20, y: offsetSmall },
    space: gridSizeSmall,
    length: 20 * (3 / 8),
    isVertical: isScaleVertical,
    startValue: startValueSmall,
    endValue: endValue,
    color: '#BABBBC',
    isSmall: true
  })
  drawRulerScale({
    ctx,
    scale,
    startPos: isScaleVertical
      ? { x: offsetLarge, y: 20 }
      : { x: 20, y: offsetLarge },
    space: gridSizeLarge,
    length: 20,
    isVertical: isScaleVertical,
    startValue: startValueLarge,
    endValue: endValue,
    color: '#C8CDD0'
  })

  ctx.setTransform(1, 0, 0, 1, 0, 0)
}
