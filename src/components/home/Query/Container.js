import Presentation from "./Query";
import { connect } from "react-redux";
// Actions
import {
	LIST_FEATURES,
	LIST_REVIEW,
	CLEAR_REVIEW,
	ERR_GET_REVIEW,
	LIST_DEFECTS
} from "./../../../services/actions";

// Action creators
const clearReview = () => {
	return {
		type: CLEAR_REVIEW
	};
};
const listFeatures = (value, series) => {
	return {
		type: LIST_FEATURES,
		value,
		series
	};
};
const listReview = (r) => {
	const comments = setComments(r);
	const markerLocations = setMarkerLocations(r);

	const data = {
		billInfo: r.billInfo,
		totalReviews: r.goodReviews + r.badReviews,
		goodReviews: r.goodReviews,
		badReviews: r.badReviews,
		userReviews: r.userReviews,
		businessReviews: r.businessReviews,
		avgRating: r.avgRating,
		comments,
		markerLocations
	};
	return {
		type: LIST_REVIEW,
		review: data
	};
};
const listDefects = (defects) => {
	return {
		type: LIST_DEFECTS,
		defects
	};
};
const gotErrReview = (msg) => {
	return {
		type: ERR_GET_REVIEW,
		msg
	};
};

const mapStateToProps = (state) => {
	return {
		getErrMsg: state.review.errGetReview
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearReview: () => {
			dispatch(clearReview());
		},
		listFeatures: (value, series) => {
			dispatch(listFeatures(value, series));
		},
		listReview: (r) => {
			dispatch(listReview(r));
		},
		listDefects: (d) => {
			dispatch(listDefects(d));
		},
		gotErr: (msg) => {
			dispatch(gotErrReview(msg));
		}
	};
};

export default const ContainerQuery = connect(mapStateToProps, mapDispatchToProps)(Query);

function setComments(r) {
	if (!r.businessReviews || !r.userReviews) {
		return null;
	}
	const comments = [];
	const appendComment = (content, typeOfAccount) => {
		if (content) {
			const comment = {
				typeOfAccount,
				content
			};
			comments.push(comment);
		}
	};
	r.businessReviews.goodReviews.map(rv => appendComment(rv.comment, "business"));
	r.businessReviews.badReviews.map(rv => appendComment(rv.comment, "business"));

	r.userReviews.goodReviews.map(rv => appendComment(rv.comment, "user"));
	r.userReviews.badReviews.map(rv => appendComment(rv.comment, "user"));

	return comments;
}

// Build markerLocations array with values from business and user reviews.
function setMarkerLocations(r) {
	if (!r.businessReviews || !r.userReviews) {
		return null;
	}
	const markerLocationsKeys = {};
	r.businessReviews.goodReviews.map(rv => {
		const key = rv.location.latt + "," + rv.location.longt;
		if (key in markerLocationsKeys) {
			markerLocationsKeys[key].businessReviews.goodReviews++;
		} else {
			markerLocationsKeys[key] = {
				coords: [rv.location.latt, rv.location.longt],
				userReviews: {
					goodReviews: 0,
					badReviews: 0
				},
				businessReviews: {
					goodReviews: 1,
					badReviews: 0
				}
			};
		}
	});
	r.businessReviews.badReviews.map(rv => {
		const key = rv.location.latt + "," + rv.location.longt;
		if (key in markerLocationsKeys) {
			markerLocationsKeys[key].businessReviews.badReviews++;
		} else {
			markerLocationsKeys[key] = {
				coords: [rv.location.latt, rv.location.longt],
				userReviews: {
					goodReviews: 0,
					badReviews: 0
				},
				businessReviews: {
					goodReviews: 0,
					badReviews: 1
				}
			};
		}
	});
	r.userReviews.goodReviews.map(rv => {
		const key = rv.location.latt + "," + rv.location.longt;
		if (key in markerLocationsKeys) {
			markerLocationsKeys[key].userReviews.goodReviews++;
		} else {
			markerLocationsKeys[key] = {
				coords: [rv.location.latt, rv.location.longt],
				userReviews: {
					goodReviews: 1,
					badReviews: 0
				},
				businessReviews: {
					goodReviews: 0,
					badReviews: 0
				}
			};
		}
	});
	r.userReviews.badReviews.map(rv => {
		const key = rv.location.latt + "," + rv.location.longt;
		if (key in markerLocationsKeys) {
			markerLocationsKeys[key].userReviews.badReviews++;
		} else {
			markerLocationsKeys[key] = {
				coords: [rv.location.latt, rv.location.longt],
				userReviews: {
					goodReviews: 0,
					badReviews: 1
				},
				businessReviews: {
					goodReviews: 0,
					badReviews: 0
				}
			};
		}
	});

	// Convert marker locations object into an array.
	const markerLocations = [];
	for (const key in markerLocationsKeys) {
		markerLocations.push(markerLocationsKeys[key]);
	}
	return markerLocations;
}
