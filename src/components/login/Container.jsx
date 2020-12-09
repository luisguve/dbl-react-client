import { connect } from "react-redux";
import Presentation from "./Login";
import { LOGIN } from "./../../services/actions";
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

const mapStateToProps = state => {
	return {
		...state.session
	};
};

const mapDispatchToProps = dispatch => {
	return {
		login: (d) => {
			dispatch(login(d));
		}
	};
};

const ContainerLogin = connect(mapStateToProps, mapDispatchToProps)(Presentation);

export default ContainerLogin;