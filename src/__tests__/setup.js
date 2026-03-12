import '@testing-library/jest-dom'
import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { server } from './mocks/server'

// Start MSW server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }))

// Reset handlers after each test (no cross-test pollution)
afterEach(() => {
  server.resetHandlers()
  cleanup()
})

// Close server after all tests
afterAll(() => server.close())

// Mock CSS Modules — return proxy that echoes class names
vi.mock('*.module.css', () => new Proxy({}, { get: (_, key) => key }))

// Mock lucide-react icons so SVG doesn't break jsdom
vi.mock('lucide-react', () =>
  new Proxy({}, {
    get: (_, name) => {
      const Icon = ({ size, ...props }) => `[${name}]`
      Icon.displayName = name
      return Icon
    }
  })
)

// Silence console.error noise from expected React warnings in tests
const originalError = console.error
beforeAll(() => {
  console.error = (...args) => {
    if (typeof args[0] === 'string' && args[0].includes('Warning:')) return
    originalError(...args)
  }
})
afterAll(() => { console.error = originalError })
