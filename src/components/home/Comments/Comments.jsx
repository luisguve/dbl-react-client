import { useTranslation } from "react-i18next";

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
			if (c.classList.contains("hidden")) {
				c.classList.remove("hidden");
			} else {
				c.classList.add("hidden");
			}
		}
	}

	const buttonLabel = t("review.comments", { n: props.comments.length } );

	const comments = props.comments.reverse().map((c, idx) => {
		return (
			<p className="text-xl md:text-2xl" key={idx}><strong>{t("comments.id", {id: c.typeOfAccount})}:</strong> {c.content}</p>
		);
	});
	return (
		<div className="flex flex-col items-center mb-5">
			<div className="flex flex-col w-3/4 sm:w-2/5 md:w-1/3">
				<button
					className="p-3 my-4 text-lg"
					onClick={toggleComments}
				>{ buttonLabel }</button>
			</div>
			<div className="comments block rounded bg-blue-50 p-4 w-full sm:w-4/5 text-left hidden">{ comments }</div>
		</div>
	);
}

export default Presentation;