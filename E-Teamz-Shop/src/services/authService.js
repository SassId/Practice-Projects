export class AuthService {
    static async login(email, password) {
      console.log("appel de ma méthode login", email, password);
      const result = await fetch("../data/users.json");
      const users = await result.json();

      const userCallback = (user) => user.email == email;

      const user = users.find(userCallback);

      if (!user) {
        console.log("no user found");
        return "no user found";
      }
      if (user.password !== password) {
        console.log("no password");
        return "bad request";
      }

      const storage = window.localStorage;
      const data = {
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      };

      storage.setItem("user", JSON.stringify(data));
    }
    static logout() {
      console.log("appel de la méthode logout");
      const storage = window.localStorage;
      storage.removeItem("user");
    }
  }