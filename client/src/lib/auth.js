const apiUrl = process.env.REACT_APP_SERVER_URL;
export const login = async (userInput) => {
  try {
    const response = await fetch(`${apiUrl}/user/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (userInput) => {
  try {
    const response = await fetch(`${apiUrl}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
