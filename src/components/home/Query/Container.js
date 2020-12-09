import Presentation from "./Query";
import { connect } from "react-redux";
// Actions
import {
	LIST_FEATURES,
	LIST_REVIEW,
	CLEAR_REVIEW,
	LIST_DEFECTS
} from "./../../../services/actions";

// Action creators
const clearReview = () => {
	return {
		type: CLEAR_REVIEW
	};
};
const listFeatures = (value, series, secFeatures) => {
	return {
		type: LIST_FEATURES,
		value,
		series,
		secFeatures
	};
};

function setDefaultReviews(reviews) {
	if (!reviews) {
		return {
			goodReviews: [],
			badReviews: [],
		}
	}
	const result = Object.assign({}, reviews);
	if (!result.goodReviews) {
		result.goodReviews = [];
	}
	if (!result.badReviews) {
		result.badReviews = [];
	}
	return result;
}
const listReview = (r) => {
	const comments = setComments(r);
	const markerLocations = setMarkerLocations(r);
	const businessReviews = setDefaultReviews(r.businessReviews);
	const userReviews = setDefaultReviews(r.userReviews);

	const data = {
		billInfo: r.billInfo,
		totalReviews: r.goodReviews + r.badReviews,
		goodReviews: r.goodReviews,
		badReviews: r.badReviews,
		userReviews,
		businessReviews,
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
		listFeatures: (value, series, features) => {
			dispatch(listFeatures(value, series, features));
		},
		listReview: (r) => {
			dispatch(listReview(r));
		},
		listDefects: (d) => {
			dispatch(listDefects(d));
		}
	};
};

const ContainerQuery = connect(mapStateToProps, mapDispatchToProps)(Presentation);

export default ContainerQuery;

function setComments(r) {
	const BR = r.businessReviews;
	const UR = r.userReviews
	if (!BR || !UR) {
		return [];
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
	if (BR.goodReviews) {
		BR.goodReviews.map(rv => appendComment(rv.comment, "business"));
	}
	if (BR.badReviews) {
		BR.badReviews.map(rv => appendComment(rv.comment, "business"));
	}
	if (UR.goodReviews) {
		UR.goodReviews.map(rv => appendComment(rv.comment, "user"));
	}
	if (UR.badReviews) {
		UR.badReviews.map(rv => appendComment(rv.comment, "user"));
	}

	return comments;
}

// Build markerLocations array with values from business and user reviews.
function setMarkerLocations(r) {
	const BR = r.businessReviews;
	const UR = r.userReviews
	if (!BR || !UR) {
		return [];
	}
	const markerLocationsKeys = {};
	if (BR.goodReviews) {
		BR.goodReviews.map(rv => {
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
			return null
		});
	}
	if (BR.badReviews) {
		BR.badReviews.map(rv => {
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
			return null
		});
	}
	if (UR.goodReviews) {
		UR.goodReviews.map(rv => {
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
			return null
		});
	}
	if (UR.badReviews) {
		UR.badReviews.map(rv => {
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
			return null
		});
	}

	// Convert marker locations object into an array.
	const markerLocations = [];
	for (const key in markerLocationsKeys) {
		markerLocations.push(markerLocationsKeys[key]);
	}
	return markerLocations;
}
