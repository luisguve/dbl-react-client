import { useTranslation } from "react-i18next";
import "./../Features/features.css";

const Presentation = (props) => {
	const { t } = useTranslation();
	if (!props.defects) {
		return null;
	}

	const defects = props.defects.map((defect, idx) => {

		const samples = defect.img.map((img, idx) => {
			const src = `images/${img}`;
			return (
				<div key={idx}>
					<img alt="" src={src} />
				</div>
			)
		});

		const className = "defect " + idx % 2 === 0 ? "even" : "odd";
		return (
			<li className={className} key={idx}>
				<h2>{defect.label}</h2>
				<div className="feature-content">
					<div className="samples">{samples}</div>
					<p dangerouslySetInnerHTML={{__html: defect.desc}} />
				</div>
			</li>
		);
	});

	return (
		<div className="container">
			<div className="features">
				<h1>{t("review.defectsHeading")}</h1>
				<ul>{defects}</ul>
			</div>
		</div>
	);
}

export default Presentation;