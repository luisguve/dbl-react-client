import { connect } from "react-redux";
import Presentation from "./Defects"

const mapStateToProps = (state) => {
	return {
		defects: state.security.defects
	};
};

const ContainerDefects = connect(mapStateToProps, null)(Presentation);

export default ContainerDefects;