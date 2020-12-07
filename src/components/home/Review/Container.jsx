import Presentation from "./Review";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.session.isLoggedIn,
		typeOfAccount: state.session.typeOfAccount,
		userId: state.session.userId,
		...state.review
	};
}

// ContainerReview doesn't need to dispatch anything.

const ContainerReview = connect(mapStateToProps, null)(Presentation);

export default ContainerReview;
