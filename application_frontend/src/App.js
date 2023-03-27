import React from 'react';
import './App.css';
import './assets/style.scss'
import NavbarComponent from './components/NavbarComponent'
import { Switch, Router, Route } from 'react-router-dom';
import history from './history';
import LoginComponent from './components/LoginComponent';
import HomeComponent from './components/HomeComponent';
import AboutComponent from './components/AboutComponent';
import ContactComponent from './components/ContactComponent';
import ReservasComponent from './components/ReservasComponent';

function App() {
  return (
    <div>
				<Router history={history}>
						<Switch>
							<Route path="/" exact component={LoginComponent}/>
							<Route>
								<NavbarComponent/>
								<Switch>
									<Route path="/index" component={HomeComponent}/>
									<Route path="/reserv" component={ReservasComponent}/>
									<Route path="/about" component={AboutComponent}/>
									<Route path="/contact" component={ContactComponent}/>
								</Switch>
							</Route>
						</Switch>
				</Router>
		</div>
  );
}

export default App;
