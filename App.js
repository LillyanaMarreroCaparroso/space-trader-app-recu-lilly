import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from 'expo-secure-store';
import spacetraders from "./services/spacetraders";

import Screens from "./components/Screens";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Loans from "./components/Loans";
import Logout from "./components/Logout";


export default function App() {

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userAuthenticationToken, setUserAuthenticationToken] = useState("");
  const [userInformation, setUserInformation] = useState({});
  
  const TOKEN_KEY = "spaceTradersToken";  

  const getTokenFromStorage = async () => {
    let result = await SecureStore.getItemAsync(TOKEN_KEY);
    if (result) {
      return result;
    } else {
      return null;
    }
  };

  const deleteToken = async (key) => {
    await SecureStore.deleteItemAsync(key);
  };

  const exitUser = () => {
    deleteToken("");
    setUserAuthenticationToken("");
  };

  const saveUserToken = async (tokenValue) => {
    console.log(tokenValue);
    await SecureStore.setItemAsync(TOKEN_KEY, tokenValue);
    setUserAuthenticationToken(tokenValue);
    setIsUserLoggedIn(true);
    console.log(isUserLoggedIn);
    console.log(userAuthenticationToken);

    const userAccount = await spacetraders.login(userAuthenticationToken);
    if (userAccount && userAccount.user) {
      setUserInformation(userAccount.user);
    }
  };

  useEffect(() => {
    const checkStoredTokenExists = async () => {
      try {
        let tokenValue = await getTokenFromStorage();
        setUserAuthenticationToken(tokenValue);
        console.log(userAuthenticationToken);
        if (tokenValue) {
          const userAccount = await spacetraders.login(tokenValue);
          if (userAccount && userAccount.user) {
            setUserInformation(userAccount.user);
            setIsUserLoggedIn(true);
          }
        }
      } catch (err) {
        console.log("Error retrieving stored token", err);
      }
    };
    checkStoredTokenExists();
  }, []);


  const Drawer = createDrawerNavigator();
  return (
    <>
      {isUserLoggedIn ? (
        <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home">
            {() => <Home userData={userInformation} />}
          </Drawer.Screen>
          <Drawer.Screen name="Loans">
            {() => <Loans userData={userInformation} />}
          </Drawer.Screen>
          <Drawer.Screen name="Logout">
            {() => <Logout deleteUser={exitUser} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Screens" component={Screens} />
            <Drawer.Screen name="Register">
              {() => <Register saveToken={saveUserToken} />}
            </Drawer.Screen>
            <Drawer.Screen name="Login">
              {() => <Login saveUserToken={saveUserToken} />}
            </Drawer.Screen>
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
