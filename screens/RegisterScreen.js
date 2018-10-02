import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { register } from "../lib/store/reducer";
import { connect } from "react-redux";

import AppText from "../components/AppText";
import Label from "../components/Label";
import FullScreenContainer from "../components/FullScreenContainer";
import AuthInput from "../components/AuthInput";

class RegisterScreen extends React.Component {
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
 
		this.state = {
			username: {
				value: "",
				error: undefined
			},
			email: {
				value: "",
				error: undefined
			},
			password: {
				value: "",
				error: undefined
			},
			passwordConfirmation: {
				value: "",
				error: undefined
			}
		};
	};

	validateField(field, predicate, error) {
		if(!predicate(this.state[field].value)) {
			const update = {};

			update[field] = {...this.state[type],  error };
			this.setState(update);

			return false;
		}

		return true;
	}

	onRegisterPressed() {
		const validations = [
			this.validateField("username", value => value && value.trim().length > 0, "Please enter a username."),
			this.validateField("email", value => value && value.trim().length > 0, "Please enter your email address."),
			this.validateField("password", value => value && value.trim().length > 0, "Please enter a password."),
			this.validateField("passwordConfirmation", value => value === this.state.password.value, "Passwords do not match.")
		];

		if(validations.filter(validation => !validation)) return;

		this.props.register(this.state.email.value, this.state.username.value, this.state.password.value)
			.then(response => {
				console.log("regerr", response);
				if(response.error) {
					if(response.error.response && response.error.response.data instanceof Object) {
						Object.keys(response.error.response.data).forEach(type => {
							const update = {};

							update[type] = { ...this.state[type], error: response.error.response.data[type] };

							this.setState(update);
						});
					} else {
						this.setState({ requestError: "Something went wrong on our end. Wait a few minutes and try again."});
					}
				} else {
					this.props.navigation.navigate("App");
				}
			})
			.catch(response => {
				console.log("Failure", response);
				if(response === null) {
					this.setState({ requestError: "Unable to connect to the server. Please try again later."});
				}
			});
	}

	render() {
		let requestError;

		if(this.state.requestError) {
			requestError = (<AppText>{this.state.requestError}</AppText>);
		}

		return (
			<FullScreenContainer>
				{requestError}

				<AuthInput
					title="Username"
					textContentType="username"
					value={this.state.username.value}
					error={this.state.username.error}
					onChangeText={value => this.setState({ username: { ...this.state.username, value } })}/>

				<AuthInput
					title="Email"
					textContentType="emailAddress"
					value={this.state.email.value}
					error={this.state.email.error}
					onChangeText={value => this.setState({ email: { ...this.state.email, value } })}/>

				<AuthInput
					title="Password"
					textContentType="password"
					value={this.state.password.value}
					error={this.state.password.error}
					onChangeText={value => this.setState({ password: { ...this.state.password, value } })}/>

				<AuthInput
					title="Confirm Password"
					textContentType="password"
					value={this.state.passwordConfirmation.value}
					error={this.state.passwordConfirmation.error}
					onChangeText={value => this.setState({ passwordConfirmation: { ...this.state.passwordConfirmation, value } })}/>

				<Button
					title="Register!"
					color="#fff"
					onPress={() => this.onRegisterPressed()}/>

				<Button
					title="Return to Login"
					color="#fff"
					onPress={() => this.props.navigation.navigate("Login")}/>
			</FullScreenContainer>
		);
	}
}

const styles = StyleSheet.create({
});


const mapStateToProps = state => ({
	loading: state.userData.loading,
	requestError: state.userData.requestError
});

const mapDispatchToProps = {
	register
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);