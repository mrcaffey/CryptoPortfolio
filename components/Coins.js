import React, { Fragment } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native'
import { connect } from 'react-redux'
import { getCoins, addCoin } from '../reducers/coins'
import { Icon } from 'react-native-elements'
import Coin from './Coin'

class Coins extends React.Component {
  state = { showForm: false, coin: '' }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getCoins())

    this.interval = setInterval( () => dispatch(getCoins()), 60000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  toggleForm = () => {
    this.setState( state => ({ showForm: !state.showForm }) )
  }

  handleChange = (coin) => {
    const scrubbed = coin.toLowerCase().replace(' ', '')
    this.setState({ coin: scrubbed })
  }

  searchCoin = () => {
    const { coin } = this.state
    this.props.dispatch(addCoin(coin))
    this.setState({ coin: '', showForm: false })
  }

  render() {
    const { coins } = this.props
    const { showForm, coin } = this.state
    let color = "green"
    let name = "plus"

    if (showForm) {
      color = "red"
      name = "minus"
    }

    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          My Portfolio
        </Text>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          { coins.map( coin => <Coin key={coin.id} {...coin} /> ) }
        </ScrollView>
        <KeyboardAvoidingView behavior="padding" style={styles.buttonContainer}>
          { showForm &&
              <Fragment>
                <TextInput
                  style={styles.search}
                  value={coin}
                  onChangeText={(coin) => this.handleChange(coin)}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={this.searchCoin}
                >
                  <Text style={styles.button}>
                    Add Coin
                  </Text>
                </TouchableOpacity>
              </Fragment>
          }
          <TouchableOpacity onPress={this.toggleForm}>
            <Icon
              color={color}
              name={name}
              type="font-awesome"
              reverse={true}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 40,
    fontSize: 20,
    alignSelf: 'stretch',
    textAlign: 'center',
    marginTop: 5,
  },
  search: {
    backgroundColor: 'white',
    height: 50,
    fontSize: 20,
    flexDirection: 'column',
    alignSelf: 'stretch',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end'
  },
  contentContainer: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  header: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  list: { marginBottom: 20 },
})


const mapStateToProps = (state) => {
  return { coins: state.coins }
}


export default connect(mapStateToProps)(Coins)