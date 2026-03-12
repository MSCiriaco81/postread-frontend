import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../../../components/ui/Button'

describe('Button', () => {
  it('renderiza texto do filho', () => {
    render(<Button>Salvar</Button>)
    expect(screen.getByText('Salvar')).toBeInTheDocument()
  })

  it('chama onClick ao clicar', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Clique</Button>)
    fireEvent.click(screen.getByText('Clique'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('desabilita o botão quando loading=true', () => {
    render(<Button loading>Carregando</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('desabilita o botão quando disabled=true', () => {
    render(<Button disabled>Bloqueado</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('não chama onClick quando está desabilitado', () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Bloqueado</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renderiza como <a> quando as="a"', () => {
    render(<Button as="a" href="/rota">Link</Button>)
    expect(screen.getByRole('link')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/rota')
  })

  it('aplica tipo submit corretamente', () => {
    render(<Button type="submit">Enviar</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('passa className extra para o elemento', () => {
    render(<Button className="extra-class">OK</Button>)
    expect(screen.getByRole('button')).toHaveClass('extra-class')
  })
})
