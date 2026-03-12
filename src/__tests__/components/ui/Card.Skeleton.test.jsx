import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '../../../components/ui/Card'
import Skeleton, { SkeletonText } from '../../../components/ui/Skeleton'

describe('Card', () => {
  it('renderiza filhos corretamente', () => {
    render(<Card><p>Conteúdo do card</p></Card>)
    expect(screen.getByText('Conteúdo do card')).toBeInTheDocument()
  })

  it('aplica className extra', () => {
    render(<Card className="meu-card">Texto</Card>)
    const card = screen.getByText('Texto')
    expect(card).toHaveClass('meu-card')
  })

  it('passa atributos extras para o elemento', () => {
    render(<Card data-testid="meu-card">X</Card>)
    expect(screen.getByTestId('meu-card')).toBeInTheDocument()
  })
})

describe('Skeleton', () => {
  it('renderiza como elemento span', () => {
    const { container } = render(<Skeleton width="100px" height="16px" />)
    const el = container.querySelector('span')
    expect(el).toBeInTheDocument()
    expect(el).toHaveStyle({ width: '100px', height: '16px' })
  })

  it('tem aria-hidden para acessibilidade', () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelector('span')).toHaveAttribute('aria-hidden', 'true')
  })
})

describe('SkeletonText', () => {
  it('renderiza o número correto de linhas', () => {
    const { container } = render(<SkeletonText lines={4} />)
    expect(container.querySelectorAll('span')).toHaveLength(4)
  })

  it('renderiza 3 linhas por padrão', () => {
    const { container } = render(<SkeletonText />)
    expect(container.querySelectorAll('span')).toHaveLength(3)
  })
})
