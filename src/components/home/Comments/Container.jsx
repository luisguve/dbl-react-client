import Presentation from "./Comments";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		comments: state.review.comments
	};
};

const ContainerComments = connect(mapStateToProps, null)(Presentation);

export default ContainerComments;
