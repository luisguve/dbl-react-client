import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import srvAddr from "./../../data/srv";
import sendLocation from "./../../services/location";

const Presentation = (props) => {
	const [ loginUsername, setLoginUsername ] = useState("");
	const [ loginPassword, setLoginPassword ] = useState("");
	const [ signupUsername, setSignupUsername ] = useState("");
	const [ signupPassword, setSignupPassword ] = useState("");
	const [ loginErr, setLoginErr ] = useState("");
	const [ signupErr, setSignupErr ] = useState("");
	const [ logoutErr, setLogoutErr ] = useState("");

	useEffect(() => {
		fetch(srvAddr, {
			method: "GET",
			credentials: "include"
		})
		.then(res => res.json())
		.then(user => { 
			if (user.sendLocation) {
				sendLocation();
			}
			props.login(user);
		})
		.catch(err => {
			console.log("Could not send request to user init:", err);
		});
	}, []);

	const handleLogin = e => {
		e.preventDefault();
		const data = {
			username: loginUsername,
			password: loginPassword
		};
		fetch(srvAddr + "/login", {
			method: "POST",
			headers: {"Content-type": "application/json; charset=UTF-8"},
			credentials: "include",
			body: JSON.stringify(data)
		}).then(async res => {
			if (res.ok) {
				props.login(await res.json());
			} else {
				setLoginErr(await res.text());
			}
		}).catch(err => {
			setLoginErr("Could not send request");
			console.log("Request to login failed:", err);
		});
	};
	const handleSignup = e => {
		e.preventDefault();
		const data = {
			username: signupUsername,
			password: signupPassword
		};
		fetch(srvAddr + "/signup", {
			method: "POST",
			headers: {"Content-type": "application/json; charset=UTF-8"},
			credentials: "include",
			body: JSON.stringify(data)
		}).then(async res => {
			if (res.ok) {
				props.login(await res.json());
			} else {
				setSignupErr(await res.text());
			}
		}).catch(err => {
			setSignupErr("Could not send request");
			console.log("Request to signup failed:", err);
		});
	};
	const handleLogout = e => {
		e.preventDefault();
		fetch(srvAddr + "/logout", {
			method: "POST",
			credentials: "include"
		}).then(() => {
			props.logout();
		}).catch(err => {
			setLogoutErr("Could not send request");
			console.log("Request to logout failed:", err);
		});
	};

	/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
	function toggleNavLinks() {
		let nav = document.querySelector("nav");
		if (nav.classList.contains("responsive")) {
			nav.classList.remove("responsive");
		} else {
			nav.classList.add("responsive");
		}
		if (props.isLoggedIn) {
			return;
		}
		// hide login and signup and remove opacity.
		let login = document.querySelector(".form.login-section .right");
		login.classList.remove("active-input");
		let signup = document.querySelector(".form.signup-section .right");
		signup.classList.remove("active-input");
		let loginLabel = document.querySelector(".form.login-section .left");
		loginLabel.style.opacity = 1;
		let signupLabel = document.querySelector(".form.signup-section .left");
		signupLabel.style.opacity = 1;
		// hide grid
		let placeholder = document.querySelector(".form-placeholder");
		placeholder.classList.remove("active-grid");
	}

	function toggleLogin() {
		let login = document.querySelector(".form.login-section .right");
		let loginLabel = document.querySelector(".form.login-section .left");
		let signup = document.querySelector(".form.signup-section .right");
		let signupLabel = document.querySelector(".form.signup-section .left");
		const submit = e => {
			const formData = new FormData(e.target);
			setLoginUsername(formData.get("username"));
			setLoginPassword(formData.get("password"));
			handleLogin(e);
		}
		toggleForm(login, loginLabel, signup, signupLabel, submit);
	}

	function toggleSignup() {
		let signup = document.querySelector(".form.signup-section .right");
		let signupLabel = document.querySelector(".form.signup-section .left");
		let login = document.querySelector(".form.login-section .right");
		let loginLabel = document.querySelector(".form.login-section .left");
		const submit = e => {
			const formData = new FormData(e.target);
			setSignupUsername(formData.get("username"));
			setSignupPassword(formData.get("password"));
			handleSignup(e);
		}
		toggleForm(signup, signupLabel, login, loginLabel, submit);
	}

	function toggleForm(prim, primLabel, sec, secLabel, submit) {
		if (window.innerWidth > 1200) {
			return;
		}
		// hide links
		let nav = document.querySelector("nav");
		if (nav.classList.contains("responsive")) {
			nav.classList.remove("responsive");
		}
		let placeholder = document.querySelector(".form-placeholder");
		placeholder.textContent = "";

		if (!prim.classList.contains("active-input")) {
			prim.classList.add("active-input");
			if (window.innerWidth <= 500) {
				if (!placeholder.classList.contains("active-grid")) {
					placeholder.classList.add("active-grid");
				}
				// copy prim to insert into placeholder.
				let prim2 = prim.cloneNode(true);
				// hide prim
				if (!prim.classList.contains("hide-below-500")) {
					prim.classList.add("hide-below-500");
				}
				prim2.classList.remove("hide-below-500");
				prim2.querySelector("form").onsubmit = submit;
				placeholder.appendChild(prim2);
				// hide the other form if it's open.
				if (sec.classList.contains("active-input")) {
					sec.classList.remove("active-input");
				}
				// add opacity to other form's label.
				secLabel.style.opacity = "0.3";
			}
		} else {
			prim.classList.remove("active-input");
			placeholder.classList.remove("active-grid");
			// remove opacity to other form's label.
			secLabel.style.opacity = "1";
		}
		// remove opacity to form's label.
		primLabel.style.opacity = "1";
	}

	const { t } = useTranslation();

	let ctaContent;
	if (!props.isLoggedIn) {
		ctaContent = (
			<div className="forms">
				{/* login and signup */}
				<div className="form login-section">
					<div className="left">
						<div className="label" onClick={toggleLogin}>
							<h3>{t("nav.login")}</h3>
						</div>
					</div>
					<div className="right">
						<form onSubmit={handleLogin}>
							<div className="inputs">
							<label>
								{t("nav.username")}
								<input
								type="text"
								name="username"
								value={loginUsername}
								required
								onChange={(e) => setLoginUsername(e.target.value)}
								/>
							</label>
							<label>
								{t("nav.password")}
								<input
								type="password"
								name="password"
								value={loginPassword}
								required
								onChange={(e) => setLoginPassword(e.target.value)}
								/>
							</label>
							</div>
							<div className="btn-info">
								<button type="submit">{t("nav.submit")}</button>
								{ loginErr && <p>{loginErr}</p> }
							</div>
						</form>
					</div>
				</div>
				<div className="form signup-section">
					<div className="left">
						<div className="label" onClick={toggleSignup}>
							<h3>{t("nav.signup")}</h3>
						</div>
					</div>
					<div className="right">
						<form onSubmit={handleSignup}>
							<div className="inputs">
							<label>
								{t("nav.username")}
								<input
								type="text"
								name="username"
								value={signupUsername}
								required
								onChange={e => setSignupUsername(e.target.value)}
								/>
							</label>
							<label>
								{t("nav.password")}
								<input
								type="password"
								name="password"
								value={signupPassword}
								required
								onChange={e => setSignupPassword(e.target.value)}
								/>
							</label>
							</div>
							<div className="btn-info">
								<button type="submit">{t("nav.submit")}</button>
								{ signupErr && <p>{signupErr}</p> }
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	} else {
		ctaContent = (
			<div className="user-info">
				{/* user data and logout button */}
				<h3>{props.username} ({props.typeOfAccount})</h3>
				<button onClick={handleLogout}>{t("nav.logout")}</button>
				{ logoutErr && <p>{logoutErr}</p> }
			</div>
		);
	}
	return(
		<nav>
			<div className="container">
				<div className="user-cta">{ctaContent}</div>
				<div className="form-placeholder" />
				<div className="business">
					<Link to="/business">
						{t("nav.business")}
					</Link>
				</div>
				<div className="links">
					<Link to="/about">
						{t("nav.about")}
					</Link>
					<Link to="/">
						{t("nav.home")}
					</Link>
				</div>
			</div>
			<i className="icon" onClick={toggleNavLinks}>&#9776;</i>
		</nav>
	);
};

export default Presentation;