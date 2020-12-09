import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Provider } from "react-redux";
import './App.css';
import srvAddr from "./data/srv";
import sendLocation from "./services/location";
import { LOGIN } from "./services/actions";
// Components
import ContainerNav from "./components/Nav/Container";
import Home from './components/home';
import LoginContainer from './components/login/Container';
import About from './components/About';
import Business from './components/Business';
import Footer from './components/Footer';
import LocaleSwitcher from './components/LocaleSwitcher';
// App state store
import store from "./services/app_state";

const login = (data) => {
	if (data.sendLocation) {
		sendLocation();
	}
	return {
		type: LOGIN,
		data: {
			isLoggedIn: true,
			username: data.session.username,
			typeOfAccount: data.session.typeOfAccount,
			userId: data.session.userId,
		}
	};
};

function App() {
	const { i18n } = useTranslation();
	const [ isLoggedIn, setIsLoggedIn ] = useState(false);
	useEffect(() => {
		fetch(srvAddr, {
			method: "GET",
			credentials: "include"
		})
		.then(res => res.json())
		.then(user => {
			if (!user.isLoggedIn) {
				return;
			}
			store.dispatch(login(user));
		})
		.catch(err => {
			console.log("Could not send request to user init:", err);
		});
	}, []);

	store.subscribe(() => {
		const state = store.getState();
		setIsLoggedIn(state.session ? state.session.isLoggedIn : false);
	});

	return (
		<div>
			<Router>
				<Provider store={store}>
					<ContainerNav />
					<LocaleSwitcher lang={i18n.language}/>
					<main>
						<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route path="/login">
							{
								isLoggedIn ?
								<Redirect to="/" />
								:
								<LoginContainer />
							}
						</Route>
						<Route path="/about">
							<About />
						</Route>
						<Route path="/business">
							<Business />
						</Route>
						</Switch>
					</main>
				</Provider>
			</Router>
			<Footer />
		</div>
	);
}

export default App;
