import { LayoutProps } from './Layout'
import { getServiceToken } from '../utils/getServiceToken'

interface UseLayoutServiceProps extends LayoutProps {
  startPoint: {
    x: number
    y: number
  }
}

/**
 * 接收标尺组件参数，返回处理数据
 *
 * @param { LayoutProps } props 组件参数
 * @return
 */
export const useLayoutService = (props: UseLayoutServiceProps) => {
  return props
}

/* 将这个服务注册到组件顶部 */
export const LayoutService = getServiceToken(useLayoutService)
