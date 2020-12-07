import { connect } from "react-redux";
import Presentation from "./Features";

const mapStateToProps = (state) => {
	return {
		keyFeatures: state.security.keyFeatures,
		features: state.security.features
	};
};

const ContainerFeatures = connect(mapStateToProps, null)(Presentation)

export default ContainerFeatures;