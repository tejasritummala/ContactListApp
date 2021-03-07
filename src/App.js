import './App.css';
import ContactList from './components/ContactList';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import ContactDetails from './components/ContactDetails';
import FavoriteContacts from './components/FavoriteContacts';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={ContactList} exact></Route>
        <Route path="/users/:name" component={ContactDetails} ></Route>
        <Route path="/favorites" component={FavoriteContacts} ></Route>
      </Switch>
    </Router>
  );
}

export default App;
