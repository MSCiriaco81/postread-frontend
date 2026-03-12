import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor, act } from '@testing-library/react'
import { useFetch } from '../../hooks/useFetch'

describe('useFetch', () => {
  it('inicia em loading=true e data=null', () => {
    const fetchFn = vi.fn(() => new Promise(() => {})) // never resolves
    const { result } = renderHook(() => useFetch(fetchFn))

    expect(result.current.loading).toBe(true)
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBeNull()
  })

  it('resolve dados corretamente', async () => {
    const data = { content: [{ id: '1' }] }
    const fetchFn = vi.fn().mockResolvedValue(data)
    const { result } = renderHook(() => useFetch(fetchFn))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual(data)
    expect(result.current.error).toBeNull()
  })

  it('captura erro e expõe mensagem', async () => {
    const fetchFn = vi.fn().mockRejectedValue({ message: 'Network Error' })
    const { result } = renderHook(() => useFetch(fetchFn))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe('Network Error')
    expect(result.current.data).toBeNull()
  })

  it('usa detail da resposta quando disponível', async () => {
    const fetchFn = vi.fn().mockRejectedValue({ response: { data: { detail: 'Not found' } } })
    const { result } = renderHook(() => useFetch(fetchFn))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBe('Not found')
  })

  it('refetch re-executa a função e atualiza dados', async () => {
    let count = 0
    const fetchFn = vi.fn(() => Promise.resolve({ n: ++count }))
    const { result } = renderHook(() => useFetch(fetchFn))

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data.n).toBe(1)

    await act(async () => { await result.current.refetch() })

    expect(result.current.data.n).toBe(2)
    expect(fetchFn).toHaveBeenCalledTimes(2)
  })

  it('re-executa quando deps mudam', async () => {
    let id = 'a'
    const fetchFn = vi.fn(() => Promise.resolve({ id }))

    const { result, rerender } = renderHook(() => useFetch(fetchFn, [id]))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(fetchFn).toHaveBeenCalledTimes(1)

    id = 'b'
    rerender()
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(fetchFn).toHaveBeenCalledTimes(2)
  })
})
