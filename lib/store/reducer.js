export const AUTHENTICATE = "client/user/AUTHENTICATE";
export const AUTHENTICATE_SUCCESS = "client/user/AUTHENTICATE_SUCCESS";
export const AUTHENTICATE_FAIL = "client/user/AUTHENTICATE_FAIL";
export const REGISTER = "client/user/REGISTER";
export const REGISTER_SUCCESS = "client/user/REGISTER_SUCCESS";
export const REGISTER_FAIL = "client/user/REGISTER_FAIL";

const DEFAULT_STATE = {
	userData: {
		isLoading: false,
		requestError: null,
	}
};

function userData(state = DEFAULT_STATE.userData, action) {
	switch(action.type) {
		case AUTHENTICATE:
			return {
				...state,
				isLoading: true
			};
		case AUTHENTICATE_SUCCESS:
			return {
				...state,
				isLoading: false,
				...action.payload.data
			};
		case AUTHENTICATE_FAIL:
			return {
				...state,
				isLoading: false,
				loadError: action.error.response.status
			};
		case REGISTER: 
			return {
				...state,
				isLoading: true
			};
		case REGISTER_SUCCESS:
			return {
				...state,
				isLoading: false,
				...action.payload.data
			};
		case REGISTER_FAIL:
			return {
				...state,
				isLoading: false,
				loadError: action.error.response.status
			};
		default:
			return state;
	}
}

export default function reducer(state = DEFAULT_STATE, action) {
	return {
		userData: userData(state.userData, action)
	};
}

export function authenticate(email, password) {
	return request(AUTHENTICATE, "/user/authenticate", {
		method: "POST",
		data: {
			email,
			password
		}
	});

	/*return {
		type: AUTHENTICATE,
		payload: {
			request: {
				url: "/user/authenticate",
				body: {
					email,
					password
				}
			}
		}
	}*/
};

export function register(email, username, password) {
	return request(REGISTER, "/user/register", {
		method: "POST",
		data: {
			email,
			username,
			password
		}
	});
}

function request(type, url, options) {
	const request = {
		type,
		payload: {
			request: {
				url
			}
		}
	};

	Object.assign(request.payload.request, options);

	return request;
}

function requestWithAuthentication(state, type, url, options) {
	const requestData = request(type, url, options);

	if(state.userData) {
		requestData.headers = requestData.headers || {};
		requestData.headers.authentication = `Bearer ${state.userData.token}`;
	} else {
		throw new Error("User is not authenticated!");
	}

	return requestData;
}

