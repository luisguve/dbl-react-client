import { useTranslation } from "react-i18next";

const Presentation = (props) => {
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
	const { t } = useTranslation();

	const buttonLabel = t("review.comments", { n: $review.comments.length } );

	const comments = props.comments.map((c, idx) => {
		return (
			<p key={idx}><strong>{t("comments.id", {id: comment.typeOfAccount})}</strong>{c.content}</p>
		);
	});
	return (
		<div className="container">
			<div className="comments-btn">
				<button onClick={toggleComments}>{ buttonLabel }</button>
			</div>
			<div className="comments hide">{ comments }</div>
		</div>
	);
}

export default Presentation;