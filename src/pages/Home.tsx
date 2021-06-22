import illustrationImg from "../assets/images/illustration.svg";
import LogoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import Button from "../components/Button";
import { useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Home() {
  const history = useHistory();
  const { user, singInWithGoogle } = useAuth();

  async function handleNewRoom() {
    if (!user) {
      await singInWithGoogle();
    }
    history.push("/rooms/new");
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="illustration" />
        <strong> Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={LogoImg} alt="letmeask" />
          <button onClick={handleNewRoom} className="create-room">
            <img src={googleIconImg} alt="google Icon" />
            crie sua dala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
