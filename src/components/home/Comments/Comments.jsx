import { useTranslation } from "react-i18next";
import "./comments.css";

const Presentation = (props) => {
	const { t } = useTranslation();
	if (!props.comments) {
		return null;
	}
	const toggleComments = () => {
		if (!props.comments.length) {
			alert(t("alerts.noComments"));
		} else {
			let c = document.querySelector(".comments");
			if (c.classList.contains("hide")) {
				c.classList.remove("hide");
			} else {
				c.classList.add("hide");
			}
		}
	}

	const buttonLabel = t("review.comments", { n: props.comments.length } );

	const comments = props.comments.map((c, idx) => {
		return (
			<p key={idx}><strong>{t("comments.id", {id: c.typeOfAccount})}</strong>{c.content}</p>
		);
	});
	return (
		<div className="comments-container">
			<div className="comments-btn">
				<button onClick={toggleComments}>{ buttonLabel }</button>
			</div>
			<div className="comments hide">{ comments }</div>
		</div>
	);
}

export default Presentation;