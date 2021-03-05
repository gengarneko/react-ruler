import { calcGridSize } from './calcGridSize'

/**
 * 获取刻度精确的 起始位置、终止位置、刻度距离
 *
 * @export
 * @param { number } scale 缩放比例
 * @param { number } start 起始值
 * @param { number } 长度
 * @return
 */
export const calcScaleValues = ({ scale, start, length }: { scale: number; start: number; length: number }) => {
  // 小刻度的单位
  const gridSizeSmall = calcGridSize(scale)
  // 小刻度起始数值
  const startValueSmall = Math.floor(start / gridSizeSmall) * gridSizeSmall
  // 小刻度精确偏移值
  const offsetSmall = ((startValueSmall - start) / gridSizeSmall) * gridSizeSmall * scale

  // 大刻度的单位
  const gridSizeLarge = calcGridSize(scale) * 10
  // 大刻度起始数值
  const startValueLarge = Math.floor(start / gridSizeLarge) * gridSizeLarge
  // 大刻度精确偏移值
  const offsetLarge = ((startValueLarge - start) / gridSizeLarge) * gridSizeLarge * scale

  // 终止数值
  const endValue = start + Math.ceil(length / scale)

  return {
    gridSizeSmall,
    startValueSmall,
    offsetSmall,
    gridSizeLarge,
    startValueLarge,
    offsetLarge,
    endValue
  }
}
