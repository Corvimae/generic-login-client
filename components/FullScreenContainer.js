import React from "react";
import { View } from "react-native";
import GlobalStyles from "../styles/GlobalStyles";

export default class FullScreenContainer extends React.Component {
	render() {
		return (
			<View style={[this.props.style, GlobalStyles.rootContainer, GlobalStyles.container]}>
				{this.props.children}
			</View>
		);
	}
}