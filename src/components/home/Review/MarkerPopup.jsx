import { useTranslation } from "react-i18next";

const styles = {
	textAlign: "center",
	fontWeight: "600",
	fontSize: 16
};

const MarkerPopup = (props) => {
	const BR = props.businessReviews;
	const UR = props.userReviews;
	const totalReviews = UR.goodReviews + UR.badReviews + BR.goodReviews + BR.badReviews;
	const totalGoodReviews = UR.goodReviews + BR.goodReviews;
	const totalBadReviews = UR.badReviews + BR.badReviews;

	const { t } = useTranslation();
	const details = (
		<div>
			{
			BR.badReviews > 0 &&
			<p style={styles}>{t("markers.businessBadReviews", { n: BR.badReviews })}</p>
			}
			{
			UR.badReviews > 0 &&
			<p style={styles}>{t("markers.userBadReviews", { n: UR.badReviews })}</p>
			}
			{
			BR.goodReviews > 0 &&
			<p style={styles}>{t("markers.businessGoodReviews", { n: BR.GoodReviews })}</p>
			}
			{
			UR.goodReviews > 0 &&
			<p style={styles}>{t("markers.userGoodReviews", { n: UR.goodReviews })}</p>
			}
		</div>
	);
	const summary = `${t("markers.summary.total")}: ${totalReviews}, ` +
		 `${t("markers.summary.good")}: ${totalGoodReviews}, ` +
		 `${t("markers.summary.bad")}: ${totalBadReviews}`;
	return (
		<div>
			{details}
			<p style={styles}>{summary}</p>
		</div>
	);
}

export default MarkerPopup;