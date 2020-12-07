import { useTranslation } from "react-i18next";
import "./../App.css";

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function toggleNavLinks() {
	let nav = document.querySelector("nav");
	if (nav.classList.contains("responsive")) {
		nav.classList.remove("responsive");
	} else {
		nav.classList.add("responsive");
	}
	if ($session.isLoggedIn) {
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
		e.preventDefault();
		const formData = new FormData(e.target);
		signupUsername = formData.get("username");
		signupPassword = formData.get("password");
		handleLogin();
	}
	toggleForm(login, loginLabel, signup, signupLabel, submit);
}

function toggleSignup() {
	let signup = document.querySelector(".form.signup-section .right");
	let signupLabel = document.querySelector(".form.signup-section .left");
	let login = document.querySelector(".form.login-section .right");
	let loginLabel = document.querySelector(".form.login-section .left");
	const submit = e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		signupUsername = formData.get("username");
		signupPassword = formData.get("password");
		handleSignup();
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

/* Update $session to refer redux store (to be defined) */
const Nav = () => {
	const { t } = useTranslation();
	let ctaContent;
	if (!$session.isLoggedIn) {
		ctaContent = (
			<div className="forms">
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
								<input type="text" name="username" bind:value={loginUsername} required>
							</label>
							<label>
								{t("nav.password")}
								<input type="password" name="password" bind:value={loginPassword} required>
							</label>
							</div>
							<div className="btn-info">
								<button type="submit">{t("nav.submit")}</button>
								{#if loginErrMsg}
								<p>{loginErrMsg}</p>
								{/if}
							</div>
						</form>
					</div>
				</div>
				<div className="form signup-section">
					<div className="left">
						<div className="label" on:click={toggleSignup}>
							<h3>{t("nav.signup")}</h3>
						</div>
					</div>
					<div className="right">
						<form on:submit|preventDefault={handleSignup}>
							<div className="inputs">
							<label>
								{t("nav.username")}
								<input type="text" name="username" bind:value={signupUsername} required>
							</label>
							<label>
								{t("nav.password")}
								<input type="password" name="password" bind:value={signupPassword} required>
							</label>
							</div>
							<div className="btn-info">
								<button type="submit">{t("nav.submit")}</button>
								{#if signupErrMsg}
								<p>{signupErrMsg}</p>
								{/if}
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className="form-placeholder" />
		);
	} else {
		ctaContent = (
			<div className="user-info">
				<h3>{$session.username} ({$session.typeOfAccount})</h3>
				<button onClick={handleLogout}>{t("nav.logout")}</button>
			</div>
		);
	}
	return(
		<nav>
			<div className="container">
				<div className="user-cta">{ctaContent}</div>
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
			<a href="#" className="icon" onClick={toggleNavLinks}>&#9776;</a>
		</nav>
	);
};

export default Nav;