import { describe, it, expect, vi } from 'vitest'
import { render, screen, act, waitFor } from '@testing-library/react'
import { ToastProvider, useToast } from '../../../components/ui/Toast'

function ToastTrigger({ type = 'success', message = 'Mensagem de teste' }) {
  const toast = useToast()
  return <button onClick={() => toast[type](message)}>Disparar</button>
}

function setup(type, message) {
  return render(
    <ToastProvider>
      <ToastTrigger type={type} message={message} />
    </ToastProvider>
  )
}

describe('Toast / ToastProvider', () => {
  it('não exibe toast antes de ser acionado', () => {
    setup('success', 'Olá')
    expect(screen.queryByText('Olá')).not.toBeInTheDocument()
  })

  it('exibe toast success ao clicar', async () => {
    setup('success', 'Operação concluída!')
    act(() => screen.getByRole('button').click())
    expect(await screen.findByText('Operação concluída!')).toBeInTheDocument()
  })

  it('exibe toast error', async () => {
    setup('error', 'Algo deu errado')
    act(() => screen.getByRole('button').click())
    expect(await screen.findByText('Algo deu errado')).toBeInTheDocument()
  })

  it('exibe toast info', async () => {
    setup('info', 'Informação importante')
    act(() => screen.getByRole('button').click())
    expect(await screen.findByText('Informação importante')).toBeInTheDocument()
  })

  it('remove toast após 4 segundos', async () => {
    vi.useFakeTimers()
    setup('success', 'Temporário')
    await act(async () => { screen.getByRole('button').click() })
    expect(screen.getByText('Temporário')).toBeInTheDocument()

    await act(async () => { vi.advanceTimersByTime(4500) })
    expect(screen.queryByText('Temporário')).not.toBeInTheDocument()
    vi.useRealTimers()
  })

  it('lança erro quando useToast é usado fora do provider', () => {
    const Broken = () => { useToast(); return null }
    expect(() => render(<Broken />)).toThrow('useToast must be inside ToastProvider')
  })
})
