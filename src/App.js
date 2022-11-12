import './App.css';
import {Route} from 'wouter'
import ListOfGifs from 'components/listOfGifs/listOfGifs.js'

export default function App() {
  return (
    <div className="App">
        <Route path='/' component={ListOfGifs}></Route>
        <Route path='/search/:keyword' component={ListOfGifs}></Route>
    </div>
  )
}
