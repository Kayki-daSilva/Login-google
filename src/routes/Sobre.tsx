import styles from "./Sobre.module.css";
import { Link, useLocation } from "react-router-dom";

const Sobre = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
       <h1>Olá! Me chamo Kayki e tenho 17 anos.</h1>
<h2>Sou o desenvolvedor desta aplicação que você está utilizando.</h2>

<ul>
  <li>
    Sou estudante do curso Técnico em Informática para Internet na FAETEC, onde desenvolvi um grande interesse pela programação.
  </li>
  <li>
    Possuo conhecimento em HTML, CSS, JavaScript, React, Node.js e outras tecnologias voltadas para o desenvolvimento web.
  </li>
          <Link to="/" className={styles.link}>
            Voltar para Home da aplicaçao
          </Link>
          <Link className={styles.link} to="/cadastro" state={{ user }}>
             Ir para página de cadastro
        </Link>
        </ul>
      </div>
        <div className={styles.content2}>
            <h1>Rede Social</h1>
            <p>Me siga nas minhas redes sociais para acompanhar meus projetos e novidades!</p>
           <Link to="https://github.com/Kayki-daSilva" className={styles.link}>
            GitHub
          </Link>
          <Link to="https://www.linkedin.com/in/kayki-da-silva-de-oliveira-93a7823ab/" className={styles.link}>
            LinkedIn
          </Link>
         </div>
    </div>
  );
};

export default Sobre;