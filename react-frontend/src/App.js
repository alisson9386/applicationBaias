import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListarUsuarioComponent from './components/ListarUsuarioComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CompontenteCriarUsuario from './components/CompontenteCriarUsuario';
import VisualizarUsuarioComponent from './components/VisualizarUsuarioComponent';


function App() {
	return (
		<div>
			<Router>
				<HeaderComponent />
				<div className="container">
					<Switch>
						<Route path="/" exact component={ListarUsuarioComponent}></Route>
						<Route path="/usuarios" component={ListarUsuarioComponent}></Route>
						<Route path="/add-usuarios/:id" component={CompontenteCriarUsuario}></Route>
						<Route path="/view-usuarios/:id" component={VisualizarUsuarioComponent}></Route>
					</Switch>
				</div>
				<FooterComponent />
			</Router>
		</div>


	);
}

export default App;
