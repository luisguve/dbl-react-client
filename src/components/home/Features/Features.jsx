import { useTranslation } from "react-i18next";

const Presentation = (props) => {
	if (!props.features && !props.keyFeatures) {
		return null;
	}
	const setFeaturesList = (features) => {
		return features.map((f, idx) => {
			const samples = f.img.map((img, idx) => {
				const src = `images/${img}`;
				return (
					<div key={idx}>
						<img alt="" src={src}>
					</div>
				);
			});
			return (
			<li className={idx % 2 == 0 ? "even" : "odd" } key={idx}>
				<h3>{f.label}</h3>
				<div className="feature-content">
					<div className="samples">{samples}</div>
					<p dangerouslySetInnerHtml={{__html: f.desc}} />
				</div>
			</li>
			);
		});
	}
	const { t } = useTranslation();
	let keyFeatures = null;
	if (props.keyFeatures) {
		keyFeatures = (
			<div className="features">
				<h2>{t("learn.keyFeatures")}</h2>
				<ul>{setFeaturesList(props.keyFeatures)}</ul>
			</div>
		);
	}
	const features = (
		<div class="features">
			<h2>{t("learn.features")}</h2>
			<ul>{setFeaturesList(props.features)}</ul>
		</div>
	);
	return (
		<div class="container">
			<h1>{t("learn.heading")}</h1>
			{keyFeatures}
			{features}
		</div>
	);
};

export default Presentation;