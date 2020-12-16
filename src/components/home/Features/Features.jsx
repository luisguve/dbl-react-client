import { useTranslation } from "react-i18next";

const setFeaturesList = (features, borderColor, bgColor) => {
	const imgClass = "max-w-11/12 sm:my-1.5";
	const samplesClass = "flex flex-row items-center justify-around sm:flex-col sm:items-center sm:justify-around " +
	" w-full sm:w-1/4 px-5 sm:px-0 space-x-2 mt-2 sm:mt-0";
	const pClass = "text-left text-xl sm:text-2xl w-full sm:w-2/3 px-5 pb-3";

	return features.map((f, idx) => {
		const samples = f.img.map((img, idx) => {
			const src = `images/${img}`;
			return (
				<div key={idx}>
					<img alt="" src={src} className={imgClass}/>
				</div>
			);
		});
		const liClass = idx % 2 === 0 ? `even border-solid border-2 border-${borderColor} rounded-lg` : `odd bg-${bgColor}`;
		const contentClass = idx % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse";
		return (
		<li className={"my-3 " + liClass} key={idx}>
			<h3 className="pt-2.5 text-xl sm:text-3xl font-bold">{f.label}</h3>
			<div className={"pb-2.5 flex flex-col sm:justify-around " + contentClass}>
				<div className={samplesClass}>{samples}</div>
				<p className={pClass} dangerouslySetInnerHTML={{__html: f.desc}} />
			</div>
		</li>
		);
	});
};

const Presentation = (props) => {
	const { t } = useTranslation();
	if (!props.features && !props.keyFeatures) {
		return null;
	}

	const featuresClass = "w-full sm:w-4/5";
	const featuresUlClass = "list-none p-0 sm:p-2";
	const featuresH2Class = "text-2xl sm:text-4xl mt-4 sm:mt-6";

	let keyFeatures = null;
	if (props.keyFeatures) {
		keyFeatures = (
			<div className={featuresClass}>
				<h2 className={featuresH2Class}>{t("learn.keyFeatures")}</h2>
				<ul className={featuresUlClass}>{setFeaturesList(props.keyFeatures, "blue-300", "blue-50")}</ul>
			</div>
		);
	}
	const features = (
		<div className={featuresClass}>
			<h2 className={featuresH2Class}>{t("learn.features")}</h2>
			<ul className={featuresUlClass}>{setFeaturesList(props.features, "blue-300", "blue-50")}</ul>
		</div>
	);
	return (
		<div className="flex flex-col items-center">
			<h1 className="text-2xl sm:text-5xl font-bold">{t("learn.heading")}</h1>
			{keyFeatures}
			{features}
		</div>
	);
};

export default Presentation;
export { setFeaturesList };