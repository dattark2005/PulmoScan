import { View, Text } from 'react-native'
import React from 'react'

const MyHeader = ({ children }) => {
  return (
      <Text style={
        {
            fontWeight: 900, 
            fontStyle: 'bold', 
            fontSize: 25
        }
      }>{ children }</Text>
  )
}

export default MyHeader