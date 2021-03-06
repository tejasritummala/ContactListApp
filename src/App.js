import logo from './logo.svg';
import './App.css';
import ContactList from './components/ContactList';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import ContactDetails from './components/ContactDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ContactList} exact></Route>
        <Route path="/users/:name" component={ContactDetails} ></Route>
      </Switch>

    </Router>
  );
}

export default App;
