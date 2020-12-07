import { connect } from "react-redux";
import Presentation from "./Nav";
import {
	LOGIN,
	LOGOUT
} from "./../../services/actions";
import sendLocation from "./../../services/location";

const login = (data) => {
	if (data.sendLocation) {
		sendLocation();
	}
	return {
		type: LOGIN,
		data: {
			isLoggedIn: true,
			username: data.session.username,
			typeOfAccount: data.session.typeOfAccount,
			userId: data.session.userId,
		}
	};
};
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
		login: (d) => {
			dispatch(login(d));
		},
		logout: () => {
			dispatch(logout());
		}
	};
};

const ContainerNav = connect(mapStateToProps, mapDispatchToProps)(Presentation);

export default ContainerNav;