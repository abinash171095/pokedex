
import { Link } from 'react-router'
import './App.css'

import CustomRoutes from './routes/CustomRoutes'

function App() {


  return (
    <div className='Outer-pokedex'>
    <h1 id="pokedex-heading"><Link to='/'>Pokedex</Link></h1>
  <CustomRoutes/>
   
   
    </div>
  )
}

export default App
