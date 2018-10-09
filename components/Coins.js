import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getCoins } from '../reducers/coins'

class Coins extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCoins())
  }

  render() {
    const { coins } = this.props
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          My Portfolio
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center'
  }
})


const mapStateToProps = (state) => {
  return { coins: state.coins }
}


export default connect(mapStateToProps)(Coins)
