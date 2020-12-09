import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import srvAddr from "./../../data/srv";
import "./nav.css";

const Presentation = (props) => {
	const { t } = useTranslation();
	const [ logoutErr, setLogoutErr ] = useState("");

	// Toggle between adding and removing the "responsive" class to the nav
	// when the user clicks on the icon
	function toggleNavLinks() {
		let nav = document.querySelector("nav");
		if (nav.classList.contains("responsive")) {
			nav.classList.remove("responsive");
		} else {
			nav.classList.add("responsive");
		}
	}
	const handleLogout = () => {
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

	let ctaContent;
	if (!props.isLoggedIn) {
		ctaContent = (
			<div className="login">
				<Link to="/login">
					{t("nav.login")}/{t("nav.signup")}
				</Link>
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