import illustrationImg from "../assets/images/illustration.svg";
import LogoBranco from "../assets/images/logo-branco.svg";
import LogoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import { MdWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

import "../styles/auth.scss";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FormEvent } from "react";
import { useState } from "react";
import { database } from "../services/firebase";
import { useTheme } from "../hooks/useTheme";

export default function Home() {
  const history = useHistory();
  const [roomCode, setRoomCode] = useState("");
  const { user, singInWithGoogle } = useAuth();
  const { theme, toggleTheme } = useTheme();

  async function handleNewRoom() {
    if (!user) {
      await singInWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already close");
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  return (
    <div id="page-auth" className={theme}>
      <aside>
        <img src={illustrationImg} alt="illustration" />
        <strong> Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>

      <main className="main-auth">
        <div className="main-content">
          <img src={theme === "dark" ? LogoBranco : LogoImg} alt="letmeask" />
          <button onClick={toggleTheme} className="toggle">
            {theme === "dark" ? (
              <MdWbSunny className="sun" />
            ) : (
              <FaMoon className="moon" />
            )}
          </button>
          <button onClick={handleNewRoom} className="create-room">
            <img src={googleIconImg} alt="google Icon" />
            crie sua dala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
