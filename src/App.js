import { Link as ReactRouterLink, Outlet } from "react-router-dom"

function App() {
  return (
    <div>
      <h1>Starter App</h1>
      <nav
        style={{
          borderBottom: '1px solid'
        }}
        >
          <ReactRouterLink to='/'>Links</ReactRouterLink>
        </nav>
        <Outlet />
    </div>
  )
}

export default App