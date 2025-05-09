import { Outlet } from 'react-router'
import SearchHeader from './components/SearchHeader'

function App() {
  return (
    <>
      <SearchHeader />
      <Outlet />
    </>
  )
}

export default App
