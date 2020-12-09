import Map from './Map';
import { useTranslation } from 'react-i18next';
import "./review.css";

function setMyGoodReview(userId, reviews) {
	for (let i = reviews.goodReviews.length - 1; i >= 0; i--) {
		const rv = reviews.goodReviews[i];
		if (userId === rv.userId) {
			return rv;
		}
	}
}

function setMyBadReview(userId, reviews) {
	for (let i = reviews.badReviews.length - 1; i >= 0; i--) {
		const rv = reviews.badReviews[i];
		if (userId === rv.userId) {
			return rv;
		}
	}
}

const Presentation = (props) => {
	const { t } = useTranslation();
	if (!props.billInfo) {
		return null;
	}

	if (!props.totalReviews) {
		return (
			<div className="review-container">
				<div className="no-reviews">
					<h3>{props.billInfo.serialNumber} - ${props.billInfo.value} - series {props.billInfo.series}</h3>
					<h4>{t("review.noReviews")}</h4>
				</div>
			</div>
		);
	}

	if (!props.isLoggedIn) {
		return (
			<div className="review-container">
				<div className="review">
					<h3>{props.billInfo.serialNumber} - ${props.billInfo.value} - series {props.billInfo.series}</h3>
					<h3>{t("review.totalReviews", { n : props.totalReviews } )}</h3>
					<h4>{t("review.userGoodReviews", { n : props.goodReviews } )}</h4>
					<h4>{t("review.userBadReviews", { n : props.badReviews } )}</h4>
					<h4>{t("review.rating")}: {props.avgRating}/5</h4>
					<h5>{t("review.moreInfo")}</h5>
				</div>
			</div>
		);
	}

	let myGoodReview;
	let myBadReview;

	switch (props.typeOfAccount) {
		case "regular":
		case "admin":
			if (props.userReviews) {
				if (props.userReviews.goodReviews) {
					myGoodReview = setMyGoodReview(props.userId, props.userReviews);
				}
				if (props.userReviews.badReviews) {
					myBadReview = setMyBadReview(props.userId, props.userReviews);
				}
			}
			break;
		case "business":
			if (props.businessReviews) {
				if (props.businessReviews.goodReviews) {
					myGoodReview = setMyGoodReview(props.userId, props.businessReviews);
				}
				if (props.businessReviews.badReviews) {
					myBadReview = setMyBadReview(props.userId, props.businessReviews);
				}
			}
		break;
		default:
			console.log("Unknown type of account:", props.typeOfAccount);
	}

	const brBR = props.businessReviews.badReviews;
	const brGR = props.businessReviews.goodReviews;
	const urBR = props.userReviews.badReviews;
	const urGR = props.userReviews.goodReviews;

	return (
		<div className="review-container">
			<div className="review">
				<h3>{props.billInfo.serialNumber} - ${props.billInfo.value} - series {props.billInfo.series}</h3>
				<h3>{t("review.totalReviews", { n : props.totalReviews } )}</h3>
				<div className="reviews-summary">
					<h4 className="text-left">{t("review.businessBadReviews", { n : brBR ? brBR.length : 0 } )}</h4>
					<h4 className="text-left">{t("review.businessGoodReviews", { n : brGR ? brGR.length : 0 } )}</h4>
					<h4 className="text-left">{t("review.userBadReviews", { n : urBR ? urBR.length : 0 } )}</h4>
					<h4 className="text-left">{t("review.userGoodReviews", { n : urGR ? urGR.length : 0 } )}</h4>
				</div>
				<h4>{t("review.rating")}: {props.avgRating}/5</h4>
				<h4>{t("review.comments", { n: props.comments.length } )}</h4>
			</div>
			{
				myGoodReview && 
				<div className="review">
					<h3>{t("review.myGoodReview", { date: myGoodReview.date, rating: myGoodReview.rating } )}</h3>
				</div>
			}
			{
				myBadReview &&
				<div className="review">
					<h3>{t("review.myBadReview", { date: myBadReview.date } )}</h3>
				</div>
			}
			<Map markerLocations={props.markerLocations} />
		</div>
	);
};

export default Presentation;