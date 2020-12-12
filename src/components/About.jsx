import { useTranslation } from "react-i18next";
import React from "react";
import "./about.css";

const About = () => {
	const { t } = useTranslation();
	const content = t("about.intro1")
		+ t("about.intro2")
		+ t("about.users")
		+ t("about.reviews")
		+ t("about.reviewsNotes")
		+ t("about.securityFeatures")
		+ t("about.motivation")
		+ t("about.author")
		+ t("about.contact");
	const about = {
		__html: content
	};
	return (
		<div className="about-container">
			<div className="row">
				<h1>DollarBlacklist</h1>
				<div dangerouslySetInnerHTML={about} />
			</div>
		</div>
	);
}

export default About;