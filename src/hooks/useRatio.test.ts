import { renderHook } from '@testing-library/react-hooks'
import { useRatio } from './useRatio'

describe('useRatio', () => {
  it('should be defined', () => {
    expect(useRatio).toBeDefined()
  })
  it('diff device pixel ratio', () => {
    const { result } = renderHook(() => useRatio())
    expect(result.current).toEqual(window.devicePixelRatio)
  })
})
