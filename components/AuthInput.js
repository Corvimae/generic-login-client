import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Label from "./Label";
import AppText from "./AppText";

export default class AuthInput extends React.Component {	
	render() {
		let errorMessage;

		if(this.props.error) {
			errorMessage = (<AppText style={styles.errorMessage}>{this.props.error}</AppText>);
		}

		return (
			<View style={[this.props.containerStyle, styles.inputContainer]}>
				<Label style={this.props.labelStyle}>{this.props.title}</Label>
				<TextInput
					textContentType={this.props.textContentType}
					style={[styles.input, this.props.inputStyle]}
					value={this.props.value}
					onChangeText={this.props.onChangeText}/>

				{errorMessage}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	inputContainer: {
		width: "100%",
		marginBottom: 24
	},
	input: {
		width: "100%",
		height: 50,
		textAlign: "center",
		fontSize: 28,
		backgroundColor: "rgba(255, 255, 255, 0.25)",
		borderRadius: 25,
		marginBottom: 4
	},
	errorMessage: {
		color: "#ff0000",
		fontSize: 20,
		marginLeft: 8
	}
});