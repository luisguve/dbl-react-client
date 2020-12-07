import { connect } from "react-redux";
import Presentation from "./ReviewForm.jsx"

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.session.isLoggedIn,
		billInfo: state.review.billInfo,
		possibleDefects: state.security.possibleDefects
	};
};

const ContainerReviewForm = connect(mapStateToProps, null)(Presentation);

export default ContainerReviewForm;