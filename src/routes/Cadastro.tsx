import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Cadastro.module.css";

type User = {
  name: string;
  email: string;
  picture: string;
};

type CadastroData = {
  nome: string;
  email: string;
  telefone?: string;
  idade?: string;
  endereco?: string;
};

const Cadastro = () => {
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState<CadastroData>({
    nome: "",
    email: "",
    telefone: "",
    idade: "",
    endereco: "",
  });

  const [jsonGerado, setJsonGerado] = useState<string>("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const parsedUser: User = JSON.parse(savedUser);
      setUser(parsedUser);

      setFormData((prev) => ({
        ...prev,
        nome: parsedUser.name,
        email: parsedUser.email,
      }));
    }
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const json = JSON.stringify(formData, null, 2);

    setJsonGerado(json);

    console.log("JSON GERADO:", formData);
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Cadastro do Usuário</h1>

        {user && (
          <div className={styles.profileBox}>
            <img
            src={user.picture}
            alt="Perfil"
            className={styles.profilePicture}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
            <p>
              Logado inicialmente como: <strong>{user.name}</strong>
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            E-mail:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Telefone (opcional):
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(xx) xxxxx - xxxx"
            />
          </label>

          <label>
            Idade:
            <input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleChange}
            />
          </label>

          <label>
            Endereço:
            <input
              type="text"
              name="endereco"
              value={formData.endereco}
              onChange={handleChange}
            />
          </label>

          <button type="submit" className={styles.btn}>
            Finalizar Cadastro
          </button>
        </form>

        {jsonGerado && (
          <div className={styles.jsonBox}>
            <h2>Seus Dados:</h2>
            <pre>{jsonGerado}</pre>
          </div>
        )}

        <div className={styles.links}>
          <Link to="/">Voltar para Home</Link>
          <Link to="/sobre">Ir para Sobre</Link>
        </div>
      </div>
    </div>
  );
};
export default Cadastro;