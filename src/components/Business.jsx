import { useTranslation } from "react-i18next";
import "./../App.css";

const Business = () => {
	const { t } = useTranslation();
	const content = {
		__html: t("business.body")
	};
	return (
		<div className="business container">
			<div className="row">
				<h1>{t("business.heading")}</h1>
				<div dangerouslySetInnerHTML={content} />
			</div>
		</div>
	);
}

export default Business;