import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AppText from "../components/AppText";
import GlobalStyles from "../styles/GlobalStyles";

export default class HomeScreen extends React.Component {
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<View style={GlobalStyles.container}>
				<AppText>Hello!</AppText>
			</View>
		);
	}
}

const styles = StyleSheet.create({
});

