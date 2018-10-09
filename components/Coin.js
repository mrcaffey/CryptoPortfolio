import React from 'react'
import { StyleSheet } from 'react-native'
import {
  ListItem,
} from 'react-native-elements'

class Coin extends React.Component {
  state = { color: 'green' }

  componentWillReceiveProps(nextProps) {
    const { price } = nextProps
    let color = this.state.color
    if (price !== this.props.price) {
      if (price > this.props.price)
        color = 'green'
        else
        color = 'red'

        this.setState({ color })
    }
  }
}


//componentDidUpdate(prevProps)

render () {
  const { symbol, price } = this.props
  const { color } = this.state
  return (
    <ListItem
      rightTitle={`$${parseFloat(price).toFixed(2)}`}
      rightTitleStyle={styles[color]}
      title={symbol}
      titleStyle={styles.title}
      />
  )
  }
}

export default Coin