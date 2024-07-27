import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';

const CustomButton = ({ onPress, onPressIn, onPressOut, text, type }) => {
  const [pressed, setPressed] = useState(false);

  const handlePressIn = () => {
    setPressed(true);
    if (onPressIn) {
      onPressIn();
    }
  };

  const handlePressOut = () => {
    setPressed(false);
    if (onPressOut) {
      onPressOut();
    }
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.container,
        styles[`container_${type}`],
        pressed && styles.containerPressed,
      ]}
    >
      {({ pressed }) => (
        <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    padding: 15,
    marginVertical: 5,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#008ECC',
  },
  container_TERTIARY: {

    borderWidth: 1,
    borderColor: 'gray',
  },
  containerPressed: {
    opacity: 0.7,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  text_TERTIARY: {
    color: 'white',
  },
});

export default CustomButton;
