import React from 'react'
import { StyleSheet, Text } from 'react-native'
import {
  ListItem,
} from 'react-native-elements'
import Swipeout from 'react-native-swipeout'
import { removeCoin } from '../reducers/coins'
import { connect } from 'react-redux'

class Coin extends React.Component {
  state = { color: 'green' }

  componentDidUpdate(prevProps) {
    const { price } = prevProps
    let color = this.state.color
    if (price !== this.props.price) {
      if (price < this.props.price)
        color = 'green'
      else 
        color = 'red'

      this.setState({ color })
    }
  }

  //componentDidUpdate(prevProps)

  swipeButtons = () => {
    const { dispatch, id } = this.props
    return [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { dispatch(removeCoin(id))}
    }]
  }

  render() {
    const { symbol, price } = this.props
    const { color } = this.state
    return (
      <Swipeout
        right={this.swipeButtons()}
        autoClose={true}
        backgroundColor="transparent"
      >
        <ListItem
          rightTitle={`$${parseFloat(price).toFixed(2)}`}
          rightTitleStyle={styles[color]}
          title={symbol}
          titleStyle={styles.title}
          hideChevron={true}
        />
      </Swipeout>
    )
  }
}

const styles = StyleSheet.create({
  title: { color: 'white' },
  green: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 20,
    width: 100,
    padding: 5,
  },
  red: {
    backgroundColor: 'red',
    color: 'white',
    width: 100,
    fontSize: 20,
    padding: 5,
  },
})

export default connect()(Coin)