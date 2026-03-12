import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Input, { Textarea } from '../../../components/ui/Input'

describe('Input', () => {
  it('renderiza label quando fornecida', () => {
    render(<Input label="Email" />)
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renderiza mensagem de erro quando fornecida', () => {
    render(<Input label="Email" error="Campo obrigatório" />)
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument()
  })

  it('renderiza hint quando não há erro', () => {
    render(<Input hint="Use seu email principal" />)
    expect(screen.getByText('Use seu email principal')).toBeInTheDocument()
  })

  it('não exibe hint quando há erro', () => {
    render(<Input hint="Dica" error="Erro" />)
    expect(screen.queryByText('Dica')).not.toBeInTheDocument()
    expect(screen.getByText('Erro')).toBeInTheDocument()
  })

  it('chama onChange ao digitar', () => {
    const onChange = vi.fn()
    render(<Input onChange={onChange} />)
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } })
    expect(onChange).toHaveBeenCalled()
  })

  it('aceita placeholder', () => {
    render(<Input placeholder="Digite aqui..." />)
    expect(screen.getByPlaceholderText('Digite aqui...')).toBeInTheDocument()
  })

  it('aceita value controlado', () => {
    render(<Input value="conteudo" onChange={() => {}} />)
    expect(screen.getByRole('textbox')).toHaveValue('conteudo')
  })
})

describe('Textarea', () => {
  it('renderiza textarea e label', () => {
    render(<Textarea label="Notas" />)
    expect(screen.getByText('Notas')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('exibe mensagem de erro', () => {
    render(<Textarea error="Muito longo" />)
    expect(screen.getByText('Muito longo')).toBeInTheDocument()
  })
})
