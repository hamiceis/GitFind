import { useState } from "react";
import background from "../../assets/github.png";
import { Header } from "../../components/Header";
import { ItemList } from "../../components/ItemList";
import "./styles.css";

export function Home() {
  const [user, setUser] = useState("");
  const [repos, setRepos] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`http://api.github.com/users/${user}`);
    const userRepos = await fetch(`http://api.github.com/users/${user}/repos`);
    const dataUser = await userData.json();
    const dataRepos = await userRepos.json();

    if (!dataUser.name) {
      return { message: "usuário não encontrado" };
    }

    if (dataRepos.lenght <= 0) {
      return { message: "repositório vazio" };
    }
    setCurrentUser(dataUser);
    setRepos(dataRepos);
    setUser('');
  };

  return (
    <div className="home">
      <Header />
      <div className="content">
        <img src={background} alt="background app" className="background" />
        <div className="info">
          <div>
            <input
              type="text"
              name="usuario"
              placeholder="@Username"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (
            <>
              <div className="perfil">
                <img src={currentUser.avatar_url} alt="perfil" className="profile" />
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ) : null}
          {repos?.length ? <>
          <div>
            <h4 className="repositorio">Repositórios</h4>
            {repos.map(repo => (<ItemList key={repo.id}
              title={repo?.name}
              description={repo?.description}
            />))}
          </div>
          </>:null}
        </div>
      </div>
    </div>
  );
}
