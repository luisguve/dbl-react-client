import Map from './Map';
import { useTranslation } from 'react-i18next';

function setMyGoodReview(userId, reviews) {
	for (let i = reviews.goodReviews.length - 1; i >= 0; i--) {
		const rv = reviews.goodReviews[i];
		if (userId == rv.userId) {
			return rv;
		}
	}
}

function setMyBadReview(userId, reviews) {
	for (let i = reviews.badReviews.length - 1; i >= 0; i--) {
		const rv = reviews.badReviews[i];
		if (userId == rv.userId) {
			return rv;
		}
	}
}

const Presentation = (props) => {
	if (!props.billInfo) {
		return null;
	}
	const { t } = useTranslation();

	if (!props.totalReviews) {
		return (
			<div className="no-reviews">
				<h3>{props.billInfo.serialNumber} - ${props.billInfo.value} - series {props.billInfo.series}</h3>
				<h4>{t("review.noReviews")}</h4>
			</div>
		);
	}

	if (!props.isLoggedIn) {
		return (
			<div className="review">
				<h3>{props.billInfo.serialNumber} - ${props.billInfo.value} - series {props.billInfo.series}</h3>
				<h3>{t("review.totalReviews", { n : props.totalReviews } )}</h3>
				<h4>{t("review.userGoodReviews", { n : props.goodReviews } )}</h4>
				<h4>{t("review.userBadReviews", { n : props.badReviews } )}</h4>
				<h4>{t("review.rating")}: {props.avgRating}/5</h4>
				<h5>{t("review.moreInfo")}</h5>
			</div>
		);
	}

	let myGoodReview;
	let myBadReview;

	switch (props.typeOfAccount) {
		case "regular":
		case "admin":
			myGoodReview = setMyGoodReview(props.userId, props.userReviews);
			myBadReview = setMyBadReview(props.userId, props.userReviews);
			break;
		case "business":
			myGoodReview = setMyGoodReview(props.userId, props.businessReviews);
			myBadReview = setMyBadReview(props.userId, props.businessReviews);
		break;
		default:
			console.log("Unknown type of account:", sess.typeOfAccount);
	}

	return (
		<div className="review">
			<h3>{props.billInfo.serialNumber} - ${props.billInfo.value} - series {props.billInfo.series}</h3>
			<h3>{t("review.totalReviews", { n : props.totalReviews } )}</h3>
			<div className="reviews-summary">
				<h4 className="text-left">{t("review.businessBadReviews", { n : props.businessReviews.badReviews.length } )}</h4>
				<h4 className="text-left">{t("review.businessGoodReviews", { n : props.businessReviews.goodReviews.length } )}</h4>
				<h4 className="text-left">{t("review.userBadReviews", { n : props.userReviews.badReviews.length } )}</h4>
				<h4 className="text-left">{t("review.userGoodReviews", { n : props.userReviews.goodReviews.length } )}</h4>
			</div>
			<h4>{t("review.rating")}: {props.avgRating}/5</h4>
			<h4>{t("review.comments", { n: props.comments.length } )}</h4>
		</div>
		{
			props.myGoodReview && 
			<div className="review">
				<h3>{t("review.myGoodReview", { date: props.myGoodReview.date, rating: props.myGoodReview.rating } )}</h3>
			</div>
		}
		{
			props.myBadReview &&
			<div className="review">
				<h3>{t("review.myBadReview", { date: props.myBadReview.date } )}</h3>
			</div>
		}
		<Map markerLocations={props.markerLocations} />
	);
};

export default Presentation;