import { useTranslation } from "react-i18next";
import { useState } from "react";
import srvAddr from "./../../data/srv";
import "./login.css";

const Presentation = (props) => {
	const { t } = useTranslation();
	const [ loginUsername, setLoginUsername ] = useState("");
	const [ loginPassword, setLoginPassword ] = useState("");
	const [ signupUsername, setSignupUsername ] = useState("");
	const [ signupPassword, setSignupPassword ] = useState("");
	const [ loginErr, setLoginErr ] = useState("");
	const [ signupErr, setSignupErr ] = useState("");

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

	const loginSection = (
		<div className="form-section">
			<h1>{t("nav.login")}</h1>
			<form onSubmit={handleLogin}>
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
					onChange={e => setLoginPassword(e.target.value)}
					/>
				</label>
				<div className="btn-info">
					<button type="submit">{t("nav.submit")}</button>
					{ loginErr && <p>{loginErr}</p> }
				</div>
			</form>
		</div>
	);

	const signupSection = (
		<div className="form-section">
			<h1>{t("nav.signup")}</h1>
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
	);

	return (
		<div className="form-container">
			{loginSection}
			{signupSection}
		</div>
	);
};

export default Presentation;