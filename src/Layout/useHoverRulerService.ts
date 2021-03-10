import { useState } from 'react'
import { getServiceToken } from '../utils/getServiceToken'

/**
 * 鼠标移到 ruler 区域，可以操作 guide lines
 * 鼠标移出 ruler 区域，guide lines 不可被操作
 *
 * @export
 * @return
 */
export const useHoverRulerService = () => {
  const [isRulerHovered, setIsRulerHovered] = useState<boolean>(false)
  const toggleRulerHovered = (status?: boolean) => setIsRulerHovered(status ?? !isRulerHovered)
  return { isRulerHovered, toggleRulerHovered }
}

/* 将这个服务注册到 Ruler 和 Guide 组件上层 */
export const HoverRulerService = getServiceToken(useHoverRulerService)
