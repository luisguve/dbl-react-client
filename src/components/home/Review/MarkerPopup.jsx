import { useTranslation } from "react-i18next";

const styles = {
	width: "100%",
	textAlign: "center",
	fontWeight: "600"
};

const MarkerPopup = (props) => {
	let totalReviews = props.userReviews.goodReviews +
							props.userReviews.badReviews +
							props.businessReviews.goodReviews +
							props.businessReviews.badReviews;
	let totalGoodReviews = props.userReviews.goodReviews +
							props.businessReviews.goodReviews;
	let totalBadReviews = props.userReviews.badReviews +
							props.businessReviews.badReviews;

	const { t } = useTranslation();
	const details = (
		<div style={styles}>
			{
			props.businessReviews.badReviews &&
			<p>{t("markers.businessBadReviews", { n: props.businessReviews.badReviews })}</p>
			}
			{
			props.userReviews.badReviews &&
			<p>{t("markers.userBadReviews", { n: props.userReviews.badReviews })}</p>
			}
			{
			props.businessReviews.goodReviews &&
			<p>{t("markers.businessGoodReviews", { n: props.businessReviews.GoodReviews })}</p>
			}
			{
			props.userReviews.goodReviews &&
			<p>{t("markers.userGoodReviews", { n: props.userReviews.goodReviews })}</p>
			}
		</div>
	);
	const summary = (
		<div style={styles}>
			{t("markers.summary.total")}: {totalReviews},
			{t("markers.summary.good")}: {totalGoodReviews},
			{t("markers.summary.bad")}: {totalBadReviews}
		</div>
	);
	return (
		<div>
			{details}
			{summary}
		</div>
	);
}

export default MarkerPopup;