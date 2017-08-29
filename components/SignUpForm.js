import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'
import axios from 'axios'

const ROOT_URL = 'https://us-central1-one-time-password-d0881.cloudfunctions.net'

class SignUpForm extends Component {
  // state inside or oursite constructor is equivalent

  // constructor(props) {
  //   super(props)

  //   this.state = { phone: '' }
  // }

  state = { phone: '' }

  // We do not have to bind the context of the callback anymore
  // because the arrow function takes care of it for us
  handleSubmit = () => {
    axios.post(`${ROOT_URL}/createUser`, {
      phone: this.state.phone
    })
      .then(() => {
        axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
      })
  }

  // handleSubmit() {
  // }

  // 'onChangeText': event handler to update our state when a user adds some text
  // 'bind(this)': we are binding the context here because it is an event handler
  render() {
    return (
        <View>
          <View style={{ marginBottom: 10 }}>
            <FormLabel>Enter Phone Number</FormLabel>
            <FormInput 
              value={this.state.phone}
              onChangeText={phone => this.setState({ phone })}
            />
          </View>
            <Button onPress={this.handleSubmit} title="Submit" />
        </View>
    )
  }
}

export default SignUpForm