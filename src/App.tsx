import { useState } from "react";
import { createContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { firebase, auth } from "./services/firebase";

import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";

type AuthContextType = {
  user: User | undefined;
  singInWithGoogle: () => Promise<void>;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

export const AuthContext = createContext({} as AuthContextType);

function App() {
  const [user, setUser] = useState<User>();

  async function singInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ user, singInWithGoogle }}>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
