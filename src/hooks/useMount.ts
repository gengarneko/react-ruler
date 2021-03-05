import { useEffect } from 'react'

/**
 * 只加载执行一次
 *
 * @export
 * @param { () => void } fn 执行函数
 * @return
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn()
  }, [])
}
