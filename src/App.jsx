import React from 'react'
import { routes } from './router'
import { useRoutes } from 'react-router-dom'

const App = () => {
  const routers = useRoutes(routes)
  return routers
}

export default App