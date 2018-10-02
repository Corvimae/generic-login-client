import React from "react";
import { StyleSheet, Text } from "react-native";
import AppText from "./AppText";

export default class Label extends React.Component {
	render() {
		return (
			<AppText style={[styles.label, this.props.style]}>{this.props.children}</AppText>
		);
	}
}

const styles = StyleSheet.create({
	label: {
		fontSize: 16,
		color: "#fff",
		alignSelf: "flex-start",
		marginBottom: 4,
		fontFamily: "System"
	}
});