import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const Logout = ({ deleteUser }) => {
  
  return (
    <View>
      <Button title="Logout" onPress={() => deleteUser("")} />
    </View>
  );
};

export default Logout;
