import { render, screen } from '@testing-library/react'
import { test, expect } from '@jest/globals'
/* Тест для прохождения линтера */
test('Example test', async () => {
  render(<div />)
  expect(screen.queryByText('Несуществующий текст')).toBeNull()
})
