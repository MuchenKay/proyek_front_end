import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from './pages/About';
import Home  from './pages/Home';
import NavbarComponent from './components/Navbar';

function App() {
  return (
      <Router>
        <NavbarComponent></NavbarComponent>
            <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            </Switch>
      </Router>
  );
}

export default App;
