import { useTranslation } from "react-i18next";
import React from "react";
import "./business.css";

const Business = () => {
	const { t } = useTranslation();
	const content = {
		__html: t("business.body")
	};
	return (
		<div className="container">
			<div className="row">
				<h1>{t("business.heading")}</h1>
				<div dangerouslySetInnerHTML={content} />
			</div>
		</div>
	);
}

export default Business;