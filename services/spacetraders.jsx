const endPoint = {
    space: "https://api.spacetraders.io",
  };
  
  const register = async (userName) => {
    try {
      let data;
      await fetch(`${endPoint.space}/users/${userName}/claim`, {
        method: "POST",
      })
        .then((res) => (data = res.json()))
        .catch((err) => console.log(err));
      return data;
    } catch (err) {
      console.log("Error creating account");
      return null;
    }
  };
  
  const login = async (token) => {
    try {
      const data = await fetch(`${endPoint.space}/my/account?token=${token}`);
      const userAcount = await data.json();
      return userAcount;
    } catch (err) {
      console.log("Error logging in account");
      return null;
    }
  };
  
  const getLoans = async (token) => {
    try {
      const data = await fetch(`${endPoint.space}/types/loans?token=${token}`);
      const Loans = await data.json();
      return Loans;
    } catch (err) {
      console.log("Error getting Loans");
      return null;
    }
  };
  
  const getShips = async (token) => {
    try {
      const data = await fetch(
        `${endPoint.space}/systems/OE/ship-listings?token=${token}`
      );
      const ships = await data.json();
      return ships;
    } catch (err) {
      console.log("Error getting ships");
      return null;
    }
  };
  
  export default {
    register,
    login,
    getShips,
    getLoans,
  };
  