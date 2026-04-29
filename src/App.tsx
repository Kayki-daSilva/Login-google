import { useState, useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import styles from "./App.module.css";

type User = {
  name: string;
  email: string;
  picture: string;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(credentialResponse: { credential?: string }) {
    if (credentialResponse.credential) {
      const decoded = jwtDecode<User>(credentialResponse.credential);

      setUser(decoded);

      localStorage.setItem("user", JSON.stringify(decoded));
    }
  }

  function logout() {
    googleLogout();
    setUser(null);

    localStorage.removeItem("user");
  }

  return (
    <div className={styles.pageWrapper}>
      {!user ? (
        <div className={styles.loginCard}>
          <div className={styles.iconBox}>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="40"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <h2>Bem-vindo</h2>
          <p>Conecte-se para ter acesso ao site</p>

          <div className={styles.googleBtnContainer}>
            <GoogleLogin
              onSuccess={login}
              onError={() => console.error("Login falhou")}
              theme="filled_blue"
              shape="pill"
              size="large"
              width="100%"
            />
          </div>
        </div>
      ) : (
        <div className={styles.userInfo}>
          <h1>Login concluído com sucesso!</h1>

          <img
            src={user.picture}
            alt="Perfil"
            className={styles.profilePicture}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />

          <h2>
            Parabéns, {user.name}! Você está logado com o Google. Explore as páginas do site usando os links abaixo.
          </h2>

          <p>{user.email}</p>

          <nav className={styles.navLinks}>
            <Link className={styles.link} to="/sobre">
              Sobre
            </Link>

            <Link className={styles.link} to="/cadastro">
              Cadastro
            </Link>
          </nav>

          <button onClick={logout} className={styles.logoutButton}>
            Sair da conta
          </button>
        </div>
      )}
    </div>
  );
}

export default App;