// Actions
import {
	CLEAR_REVIEW,
	LIST_REVIEW,
	LIST_DEFECTS,
	LIST_FEATURES,
	LOGIN,
	LOGOUT
} from "./actions";

const review = (state = {}, action) => {
	switch(action.type) {
	case CLEAR_REVIEW:
		return {};
	case LIST_REVIEW:
		return {...action.review};
	default:
		return state;
	}
};

const security = (state = {}, action) => {
	switch (action.type) {
	case LIST_FEATURES:
		const { value, series, secFeatures } = action;
		return {
			...secFeatures,
			value,
			series
		};
	// Important: LIST_FEATURES must be dispatched before LIST_DEFECTS, since the
	// second uses possibleDefects from the state, which is set by the first.
	case LIST_DEFECTS:
		const { defects } = action;
		for (let i = 0; i < defects.length; i++) {
			for (let j = 0; j < state.possibleDefects.length; j++) {
				if (defects[i] === state.possibleDefects[j].key ||
					defects[i] === state.possibleDefects[j].label) {
					defects[i] = state.possibleDefects[j];
					break;
				}
			}
		}
		const result = Object.assign({}, state, {defects});
		return result;
	default:
		return state;
	}
};

const session = (state = {}, action) => {
	switch (action.type) {
	case LOGIN:
		return {
			...action.data
		};
	case LOGOUT:
		return {};
	default:
		return state;
	}
};

export { review, security, session };