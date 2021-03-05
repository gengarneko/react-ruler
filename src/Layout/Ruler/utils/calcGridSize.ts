/**
 * 根据缩放值，计算基础刻度值单位
 *
 * 例如：缩放率为 1，小刻度以 10 为单位
 *
 * @export
 * @param { number } scale
 * @return
 */
export const calcGridSize = (scale: number): number => {
  if (scale <= 0.25) return 40
  if (scale <= 0.5) return 20
  if (scale <= 1) return 10
  if (scale <= 2) return 5
  if (scale <= 4) return 2
  return 1
}
