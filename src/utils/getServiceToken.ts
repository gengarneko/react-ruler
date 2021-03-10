import { createContext } from 'react'

/**
 * 泛型约束，对注入数据的类型推断支持
 *
 * @export
 * @param {(...args: any) => T} useFunc
 * @param {(T | undefined)} [initialData=undefined]
 * @return
 */
export const getServiceToken = <T extends unknown>(
  useFunc: (...args: any) => T,
  initialData: T | undefined = undefined
) => {
  return createContext(initialData as T)
}
