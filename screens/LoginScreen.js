import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import AppText from "../components/AppText";
import Label from "../components/Label";
import AuthInput from "../components/AuthInput";
import FullScreenContainer from "../components/FullScreenContainer";
import GlobalStyles from "../styles/GlobalStyles";
import { authenticate } from "../lib/store/reducer";
import { connect } from "react-redux";

const styles = StyleSheet.create({
	orText: {
		fontSize: 12,
		marginTop: 4,
		marginBottom: 4,
		color: "#fff"
	},
	errorMessage: {
		fontSize: 20,
		color: "#fff",
		marginBottom: 4,
		textAlign: "center"
	}
});

class LoginScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: ""
		};

		if(__DEV__) {
			this.state.email = "may@maybreak.com";
			this.state.password = "123456";
		}
	};

	signIn = async () => {
		this.props.authenticate(this.state.email, this.state.password)
			.then(response => {
				if(response.error) {
					if(response.error.response && response.error.response.status === 401) {
						this.setState({ requestError: "We couldn't find an account with that email and password. Double-check and try again, or register for an account."});
					} else {
						this.setState({ requestError: "Something went wrong on our end. Wait a few minutes and try again."});
					}
				} else {
					this.props.navigation.navigate("App");
				}
			})
			.catch(response => {
				if(response === null) {
					this.setState({ requestError: "Unable to connect to the server. Please try again later."});
				}
			});
	}

	render() {
		let requestError;

		if(this.state.requestError) {
			requestError = (<AppText style={styles.errorMessage}>{this.state.requestError}</AppText>);
		}

		return (
			<FullScreenContainer>
				{requestError}

				<AuthInput
					title="Email"
					textContentType="emailAddress"
					value={this.state.email}
					onChangeText={text => this.setState({ email: text })}/>

				<AuthInput
					title="Password"
					textContentType="password"
					value={this.state.password}
					onChangeText={text => this.setState({ password: text })}/>

				<Button
					title="Sign In"
					color="#fff"
					onPress={this.signIn}/>
				<AppText style={styles.orText}>or</AppText>
				<Button
					title="Create a Account"
					color="#fff"
					onPress={() => this.props.navigation.navigate("Register")}/>
			</FullScreenContainer>
		);
	}
}

const mapStateToProps = state => ({
	loading: state.userData.loading,
	requestError: state.userData.requestError
});

const mapDispatchToProps = {
	authenticate
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
