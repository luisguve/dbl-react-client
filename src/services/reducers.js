import { useTranslation } from "react-i18next";
import designYears from "./../data/design";
// Actions
import {
	CLEAR_REVIEW,
	LIST_REVIEW,
	LIST_DEFECTS,
	LIST_FEATURES,
	ERR_GET_REVIEW
} from "./actions";

const review = (state = {}, action) => {
	switch(action.type) {
	case CLEAR_REVIEW:
		return {};
	case LIST_REVIEW:
		return {...action.review};
	case ERR_GET_REVIEW:
		return {
			errGetReview: action.msg
		};
	default:
		return state;
	}
};

const security = (state = {}, action) => {
	switch (action.type) {
	case LIST_FEATURES:
		const { t } = useTranslation();
		const { value, series } = action;
		const designYear = designYears[value][series];
		const secFeatures = t(`usd-${value}.${designYear}`);
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
				if (defects[i] == state.possibleDefects[j].key ||
					defects[i] == state.possibleDefects[j].label) {
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
	default:
		return state;
	}
};

export { review, security, session };