import { store } from './store'
import { RouterProvider } from 'react-router-dom'
import { router } from './routing/router'
import './app.pcss'
import { Provider } from 'react-redux'

export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
