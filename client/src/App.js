import './App.css';
import { BrowserRouter, Route,  Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import DogDetail from './components/DogDetail';
import CreateDog from './components/CreateDog';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component= {Landing}/>
          <Route path='/home' component= {Home}/>
          <Route exact path="/DogDetail/:id" component={DogDetail}/>
          <Route path='/CreateDog' component={CreateDog}/> 
           
          


        </Switch>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
