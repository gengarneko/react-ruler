import { useContext } from 'react'
import { getServiceToken } from '../../utils/getServiceToken'
import { LayoutService } from '../useLayoutService'

/**
 * 对顶部组件传下来的 lines 值进行处理
 *
 * @export
 * @return
 */
export const useGuideService = () => {
  // 注入上层服务
  const layoutService = useContext(LayoutService)
  const { width, height, lines, setLines } = layoutService
  return {
    // 竖线长度
    verticalLength: height,
    // 横线长度
    horizontalLength: width,
    // 辅助线列表
    lines,
    // 辅助线更新函数
    setLines
  }
}

/* 将这个服务注册到组件顶部 */
export const GuideService = getServiceToken(useGuideService)
