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
  // handleSubmit() { - normal vanila function
  // }
  handleSubmit = async () => {
    // 'async': tells babbel that the code the function is going to contain some async code
    // Two requests are running in sequence and the second will not be executed unless the first one is successful
    // 'await': a little bit of a cheat, hack
    // Tell our compiler after first line of code is executed and the promise has been returned (1st request is completed) = .then()
    // Go on 2nd request
    try {
      await axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
    } catch (err) { // Take over the failed network request, response will be passed in the 'err' object and we can just console log see what happens.
      console.log(err)
    }
  }
  /*
  handleSubmit = () => {
    // Two requests are running in sequence and the second will not be executed unless the first one is successful
    axios.post(`${ROOT_URL}/createUser`, {
      phone: this.state.phone
    })
      .then(() => {
        axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
      })
      .catch(() => console.log(err))
  } */

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