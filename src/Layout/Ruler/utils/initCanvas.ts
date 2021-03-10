/**
 * 初始化画布
 *
 * 根据像素调整缩放 & 清除画布像素
 *
 * @export
 * @param { CanvasRenderingContext2D } ctx 画布上下文
 * @param { number } width 宽度
 * @param { number } height 高度
 * @param { number } ratio 屏幕分辨率
 * @return
 */
export const initCanvas = ({
  ctx,
  width = 0,
  height = 0,
  ratio = 1
}: {
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  ratio: number
}) => {
  // 根据分辨率进行缩放转换
  ctx.scale(ratio, ratio)
  // 清除画布
  ctx.clearRect(0, 0, width, height)
}
