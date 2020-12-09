import { connect } from "react-redux";
import Presentation from "./Nav";
import { LOGOUT } from "./../../services/actions";

const logout = () => {
	return {
		type: LOGOUT
	};
};

const mapStateToProps = state => {
	return {
		...state.session
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout: () => {
			dispatch(logout());
		}
	};
};

const ContainerNav = connect(mapStateToProps, mapDispatchToProps)(Presentation);

export default ContainerNav;