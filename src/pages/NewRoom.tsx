import illustrationImg from "../assets/images/illustration.svg";
import LogoImg from "../assets/images/logo.svg";
// import googleIconImg from "../assets/images/google-icon.svg";

import "../styles/auth.scss";
import Button from "../components/Button";
import { Link } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

export default function NewRoom() {
  // const { user } = useAuth();
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
          <h2>Crie uma nova sala</h2>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
          <p>
            Quer entrar em uma sala já existente?{" "}
            <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
