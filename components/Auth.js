import React from 'react'
import { 
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native'

class Auth extends React.Component {
  state = {
    email: '',
    password: '',
    passwordConfirmation: '',
    error: '',
  }

  canSubmit = () => {
    const { email, password, passwordConfirmation } = this.state;
    let submit = false;
    let error;
    if (email && password)
      submit = true
    if (this.props.type === 'Register') {
      if (!passwordConfirmation) {
        submit = false
      } else if ((passwordConfirmation && password) && passwordConfirmation !== password) {
        error = 'Passwords Must Match'
        submit = false
        if (!this.state.error)
          this.setState({ error })
      } else {
        if (this.state.error)
          this.setState({ error: '' })
        submit = true
      }
    }

    return submit
  }


  handleSubmit = () => {
    this.setState({ 
      email: '', 
      password: '', 
      passwordConfirmation: '',
    })
  }

  render() {
    const {
      email,
      password,
      passwordConfirmation,
      error,
    } = this.state
    const { type } = this.props
    const disabled = !this.canSubmit()
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        { error !== '' && <Text style={styles.error}>{error}</Text> }
        <Text style={styles.title}>{type}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoFocus
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={ (email) => this.setState({ email }) }
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          autoCorrect={false}
          value={password}
          onChangeText={ (password) => this.setState({ password }) }
          secureTextEntry={true}
        />
        { type === 'Register' &&
            <TextInput
              style={styles.input}
              placeholder="Password Confirmation"
              autoCapitalize="none"
              autoCorrect={false}
              value={passwordConfirmation}
              onChangeText={ (passwordConfirmation) => this.setState({ passwordConfirmation }) }
              secureTextEntry={true}
            />
        }
        <TouchableOpacity 
          onPress={ disabled ? f => f : this.handleSubmit}
        >
          <Text style={styles.button}>
            {type}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    marginBottom: 10,
    backgroundColor: '#FFF',
    width: 300,
    fontSize: 20,
  },
  button: {
    backgroundColor: 'blue',
    color: '#FFF',
    height: 40,
    fontSize: 20,
    lineHeight: 30,
    width: 300,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
  error: { color: 'red' }
})

export default Auth