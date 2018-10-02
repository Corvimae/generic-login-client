import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";

export default class AuthLoadingScreen extends React.Component {
	constructor(props) {
		super(props);
		this.bootstrapAsync();
	}
	
	bootstrapAsync = async () => {
		const authToken = await AsyncStorage.getItem("authToken");

		this.props.navigation.navigate(authToken ? "App" : "Auth");
	}

	render() {
		return (
			<View style={styles.container}>
				<AppText>Loading...</AppText>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#6e4a78",
		paddingLeft: 20,
		paddingRight: 20,
		width: "100%"
	}
});

