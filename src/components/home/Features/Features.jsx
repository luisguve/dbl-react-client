import { useTranslation } from "react-i18next";
import "./features.css";

const Presentation = (props) => {
	const { t } = useTranslation();
	if (!props.features && !props.keyFeatures) {
		return null;
	}
	const setFeaturesList = (features) => {
		return features.map((f, idx) => {
			const samples = f.img.map((img, idx) => {
				const src = `images/${img}`;
				return (
					<div key={idx}>
						<img alt="" src={src} />
					</div>
				);
			});
			const className = idx % 2 === 0 ? "even" : "odd" ;
			return (
			<li className={className} key={idx}>
				<h3>{f.label}</h3>
				<div className="feature-content">
					<div className="samples">{samples}</div>
					<p dangerouslySetInnerHTML={{__html: f.desc}} />
				</div>
			</li>
			);
		});
	};
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
		<div className="features">
			<h2>{t("learn.features")}</h2>
			<ul>{setFeaturesList(props.features)}</ul>
		</div>
	);
	return (
		<div className="container">
			<h1>{t("learn.heading")}</h1>
			{keyFeatures}
			{features}
		</div>
	);
};

export default Presentation;