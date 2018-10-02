import React from "react";
import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";
import reducer from "./lib/store/reducer.js";

import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import HomeScreen from "./screens/HomeScreen";

// Redux and axios initialization
const axiosConfig = {
	baseURL: "eventual-real-server-address",
	responseType: "json"
};

if(__DEV__) {
	axiosConfig.baseURL = "https://dev.maybreak.com/api";
}

const client = axios.create(axiosConfig);

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));

if (module.hot) {
	// Enable Webpack hot module replacement for reducers
	module.hot.accept("./lib/store", () => {
		const nextRootReducer = require("./lib/store/reducer");
		store.replaceReducer(nextRootReducer);
	});
}

// Application state layout

const AppStack = createStackNavigator({
	Home: HomeScreen 
});

const AuthStack = createStackNavigator(
	{
		Login: LoginScreen,
		Register: RegisterScreen
	},
	{
		initialRouteName: "Login",
		headerMode: "none"
	}
);

const RootStack = createSwitchNavigator(
	{
		AuthLoading: AuthLoadingScreen,
		App: AppStack,
		Auth: AuthStack
	},
	{
		initialRouteName: "AuthLoading"
	}
);

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<RootStack/>
			</Provider>
		);
	}
}
