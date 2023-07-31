import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react';
import { COLORS, SIZES, FONTS } from "../constants"

const TextButton = ({ label, containerStyle, onPress }) => {
    return (
        <TouchableOpacity style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 18,
            paddingVertical: 3,
            borderRadius: 15, backgroundColor: COLORS.gray,
            ...containerStyle
        }}
            onPress={onPress}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{label}</Text>

        </TouchableOpacity>
    )
}

export default TextButton;