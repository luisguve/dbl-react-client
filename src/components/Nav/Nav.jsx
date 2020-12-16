import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useState } from "react";
import srvAddr from "./../../data/srv";

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
			<div className="flex flex-col items-center">
				<Link to="/login">
					{t("nav.login")}/{t("nav.signup")}
				</Link>
			</div>
		);
	} else {
		ctaContent = (
			<div className="flex items-center justify-center">
				{/* user data and logout button */}
				<h3>{props.username} ({props.typeOfAccount})</h3>
				<button className="ml-2.5" onClick={handleLogout}>{t("nav.logout")}</button>
				{ logoutErr && <p>{logoutErr}</p> }
			</div>
		);
	}
	return(
		<nav className="flex border-solid border-b-2 border-blue-300">
			<div className="container flex justify-center w-full">
				<div className="flex flex-col justify-center flex-80 md:flex-50">{ctaContent}</div>
				<div className="business hidden md:flex justify-around items-center flex-100 md:flex-30 text-xl border-l-2 border-solid border-blue-300 p-2 text-center">
					<Link to="/business" className="text-left text-base sm:text-xl">
						{t("nav.business")}
					</Link>
				</div>
				<div className="links hidden md:flex md:flex-20 justify-around items-center text-xl border-l-0 sm:border-l-2 border-solid border-blue-300">
					<Link to="/about">
						{t("nav.about")}
					</Link>
					<Link to="/">
						{t("nav.home")}
					</Link>
				</div>
			</div>
			<span className="flex justify-center items-center flex-20 h-14 md:hidden" onClick={toggleNavLinks}>&#9776;</span>
		</nav>
	);
};

export default Presentation;