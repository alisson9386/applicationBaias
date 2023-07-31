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
import AdminComponent from './components/AdminComponent';
import ReplacePasswordComponent from './components/ReplacePasswordComponent';
import Layout from './components/Layout';
import PerfilComponent from './components/PerfilComponent';

function App() {
  return (
    <div>
				<Router history={history}>
						<Switch>
							<Route path="/" exact component={LoginComponent}/>
							<Route path="/replacePassword" component={ReplacePasswordComponent}/>
							<Route>
								<NavbarComponent/>
								<Switch>
								<Layout>
									<Route path="/index" component={HomeComponent}/>
									<Route path="/reserv" component={ReservasComponent}/>
									<Route path="/about" component={AboutComponent}/>
									<Route path="/contact" component={ContactComponent}/>
									<Route path="/admin" component={AdminComponent}/>
									<Route path="/perfil" component={PerfilComponent}/>
								</Layout>
								</Switch>
							</Route>
						</Switch>
				</Router>
		</div>
  );
}

export default App;
