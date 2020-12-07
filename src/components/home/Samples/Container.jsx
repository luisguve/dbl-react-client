import Presentation from "./Samples";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
	return {
		front: state.security.front,
		back: state.security.back,
		value: state.security.value,
		series: state.security.series,
	};
};

const ContainerSamples = connect(mapStateToProps, null)(Presentation);

export default ContainerSamples;
