import { render, screen } from '@testing-library/react'
import { HomePage } from './home-page'

const content = 'HomePage'

test('Example test', async () => {
  render(<HomePage />)
  expect(screen.getByText(content)).toBeDefined()
})
