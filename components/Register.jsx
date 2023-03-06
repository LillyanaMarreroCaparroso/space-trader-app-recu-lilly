import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";
import spacetraders from "../services/spacetraders";

const Register = ({ saveToken }) => {
  
  const [userName, setUserName] = useState("")

  const setInputText = (text) => {
    setUserName(text);
  }

  const handlerRegister = async () => {
    try {
      const userData = await spacetraders.register(userName);
      console.log("userdat", userData);
      setUserName(userData.user);
      saveToken(userData.token)
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please write your user</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setInputText(text)}
        placeholder="Enter your user"
        placeholderTextColor="black"
      ></TextInput>
      <Button title="Register" onPress={handlerRegister}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "70%",
    height: "7%",
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    marginBottom: 10,
    borderRadius: 10,
    color: "black",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold"
  },
});

export default Register;
