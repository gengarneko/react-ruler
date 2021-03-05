/**
 * 绘制标尺激活的阴影区域
 *
 * @export
 * @param { CanvasRenderingContext2D } ctx 画布上下文
 * @param { {x: number, y: number} } startPos 起始坐标
 * @param { number } width 宽度
 * @param { number } height 高度
 * @param { string } color 颜色
 * @return
 */
/* eslint-disable */
export const drawRulerBgShadow = ({
  ctx,
  startPos,
  width,
  height,
  color
}: {
  ctx: CanvasRenderingContext2D
  startPos: {
    x: number
    y: number
  }
  width: number
  height: number
  color: string
}) => {
  // 填充阴影色
  ctx.fillStyle = color
  // 绘制阴影区域
  ctx.fillRect(startPos.x, startPos.y, width, height)
}
