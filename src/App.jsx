
import './App.css'
import ErrorBoundary from './components/Errorhandling/ErrorBoundry'
import Pokedex from './components/Pokedex/Pokedex'

function App() {


  return (
    <>
    <ErrorBoundary>
    <Pokedex/>
    </ErrorBoundary>
   
   
    </>
  )
}

export default App
