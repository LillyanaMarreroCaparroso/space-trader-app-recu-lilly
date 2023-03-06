import  { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";
import spacetraders from "../services/spacetraders";


const Login = ({ saveUserToken }) => {
  const [wrongUser, setWrongUser] = useState(false);
  const [userToken, setUserToken] = useState("");

  const handlerLogin = async () => {
    try {
      const userData = await spacetraders.login(userToken);
      console.log(userData);
      saveUserToken(userToken);
      alert("Successfully logged in");

    } catch (error) {
      alert(error.message);
      setWrongUser(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.text}>Welcome to SpaceTraders!</Text>
        <TextInput
          style={
            wrongUser ? [styles.input, { borderColor: "red" }] : styles.input
          }
          placeholder="Enter your token"
          placeholderTextColor="black"
          onChangeText={(text) => setUserToken(text)}
        ></TextInput>
        {wrongUser && (
          <Text style={styles.errorText}>
            Error, please try again.
          </Text>
        )}
        <Button title="Login" onPress={handlerLogin}></Button>
      </View>
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
  loginContainer: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
  },
  input: {
    height: 40,
    width: "90%",
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    marginBottom: 20,
    borderRadius: 10,
    color: "black",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Login;
