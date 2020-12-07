import { useTranslation } from "react-i18next";

const Presentation = (props) => {
	if (!props.defects) {
		return null;
	}

	const defects = props.defects.map((defect, idx) => {

		const samples = defect.img.map((img, idx) => {
			const src = `images/${img}`;
			return (
				<div key={idx}>
					<img alt="" src={src}>
				</div>
			)
		});

		const className = "defect ";
		idx % 2 == 0 ? className += "even" : className += "odd";
		return (
			<li className={className} key={idx}>
				<h2>{defect.label}</h2>
				<div className="feature-content">
					<div className="samples">{samples}</div>
					<p dangerouslySetInnerHtml={{__html: defect.desc}} />
				</div>
			</li>
		);
	};

	const { t } = useTranslation();
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