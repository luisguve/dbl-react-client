import { useTranslation } from "react-i18next";
import { setFeaturesList } from "./../Features/Features";

const Presentation = (props) => {
	const { t } = useTranslation();
	if (!props.defects) {
		return null;
	}

	const featuresClass = "w-full sm:w-4/5";
	const featuresH1Class = "text-3xl sm:text-5xl mt-4 sm:mt-6";
	const featuresUlClass = "list-none p-0 sm:p-2";

	return (
		<div className="flex flex-col items-center">
			<div className={featuresClass}>
				<h1 className={featuresH1Class}>{t("review.defectsHeading")}</h1>
				<ul className={featuresUlClass}>{setFeaturesList(props.defects, "red-300", "red-50")}</ul>
			</div>
		</div>
	);
};

export default Presentation;