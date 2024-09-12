import { View, Text } from 'react-native'
import React from 'react'

const MyText = ({ children }) => {
  return (
      <Text style={{
        fontSize: 15
      }} className='font-semibold text-slate-500'>{children}</Text>
  )
}

export default MyText
