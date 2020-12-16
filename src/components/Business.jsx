import { useTranslation } from "react-i18next";
import React from "react";

const Business = () => {
	const { t } = useTranslation();
	const content = {
		__html: t("business.body")
	};
	return (
		<div className="flex flex-col items-center mb-5">
			<div className="w-2/3">
				<h1 className="text-3xl sm:text-5xl mb-5">{t("business.heading")}</h1>
				<div dangerouslySetInnerHTML={content} />
			</div>
		</div>
	);
}

export default Business;