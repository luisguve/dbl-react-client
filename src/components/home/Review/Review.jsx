import Map from './Map';
import { useTranslation } from 'react-i18next';

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

	const reviewContainerClass = "flex flex-col items-center";
	const reviewClass = reviewContainerClass +
		" border-solid border-2 border-grey-200 rounded-xl" +
		" bg-blue-50" +
		" p-3 my-4" +
		" w-11/12 sm:w-4/6 md:1/2 xl:w-2/5";
	const h2Class = "text-3xl font-extrabold";
	const h3Class = "text-base sm:text-2xl font-bold";
	const h4Class = "text-sm sm:text-base font-semibold";
	const h5Class = "text-xl font-semibold";

	if (!props.totalReviews) {
		return (
			<div className={reviewContainerClass}>
				<div className={reviewClass}>
					<h3 className={h3Class}>{props.billInfo.serialNumber} - ${props.billInfo.value} - series {props.billInfo.series}</h3>
					<h4 className={"mt-3 " + h4Class}>{t("review.noReviews")}</h4>
				</div>
			</div>
		);
	}

	if (!props.isLoggedIn) {
		return (
			<div className={reviewContainerClass}>
				<div className={reviewClass}>
					<h3 className={h3Class}>{props.billInfo.serialNumber} - ${props.billInfo.value} - series {props.billInfo.series}</h3>
					<h3 className={h3Class}>{t("review.totalReviews", { n : props.totalReviews } )}</h3>
					<h4 className={"mt-3 " + h4Class}>{t("review.userGoodReviews", { n : props.goodReviews } )}</h4>
					<h4 className={"mt-1 " + h4Class}>{t("review.userBadReviews", { n : props.badReviews } )}</h4>
					<h4 className={"mt-3 " + h4Class}>{t("review.rating")}: {props.avgRating}/5</h4>
					<h5 className={"mt-3 " + h5Class}>{t("review.moreInfo")}</h5>
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
		<div className={reviewContainerClass}>
			<div className={reviewClass}>
				<h3 className={h3Class}>{props.billInfo.serialNumber} - ${props.billInfo.value} - series {props.billInfo.series}</h3>
				<h3 className={h3Class}>{t("review.totalReviews", { n : props.totalReviews } )}</h3>
				<div className="inline-block px-3 sm:px-0">
					<h4 className={"text-left mt-3 " + h4Class}>{t("review.businessBadReviews", { n : brBR ? brBR.length : 0 } )}</h4>
					<h4 className={"text-left mt-1 " + h4Class}>{t("review.businessGoodReviews", { n : brGR ? brGR.length : 0 } )}</h4>
					<h4 className={"text-left mt-1 " + h4Class}>{t("review.userBadReviews", { n : urBR ? urBR.length : 0 } )}</h4>
					<h4 className={"text-left mt-1 " + h4Class}>{t("review.userGoodReviews", { n : urGR ? urGR.length : 0 } )}</h4>
				</div>
				<h4 className={"mt-3 " + h4Class}>{t("review.rating")}: {props.avgRating}/5</h4>
				<h4 className={"mt-3 " + h4Class}>{t("review.comments", { n: props.comments.length } )}</h4>
			</div>
			{
				myGoodReview && 
				<div className={reviewClass}>
					<h3 className={h3Class}>{t("review.myGoodReview", { date: myGoodReview.date, rating: myGoodReview.rating } )}</h3>
				</div>
			}
			{
				myBadReview &&
				<div className={reviewClass}>
					<h3 className={h3Class}>{t("review.myBadReview", { date: myBadReview.date } )}</h3>
				</div>
			}
			<h2 className={h2Class}>{t("map.heading")}</h2>
			<Map markerLocations={props.markerLocations} />
		</div>
	);
};

export default Presentation;