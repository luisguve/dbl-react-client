import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ReactRedux from "react-redux";
import './App.css';
// Components
import Home from './components/home/Home';
import About from './components/About';
import Business from './components/Business';
import Nav from "./components/Nav";
import Footer from './components/Footer';
import LocaleSwitcher from './components/LocaleSwitcher';
// App state store
import store from "./services/app_state";

function App() {
	const { i18n } = useTranslation();
	return (
	<Suspense fallback="loading">
		<Router>
			<Provider store={store}>
				<Nav />
				<LocaleSwitcher lang={i18n.language}/>
				<main>
					<Switch>
					<Route exact path="/">
						<Home />
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
	</Suspense>
	);
}

export default App;
