import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([]);
  
  useEffect(() => {
    const loadRepositories = async () => {
      const response = await api.get('repositories');
      setRepositories(response.data);
    }
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    const data = {
      id: '123',
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    const response = await api.post('repositories', data);

    const repositorie = response.data;
    
    console.log(repositorie);

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    await api.delete('repositories/' + id);

    const index = repositories.findIndex(repositorie => repositorie.id === id); 

    const newRepositorie = repositories;
    newRepositorie.splice(index, 1);

    console.log(newRepositorie);
    
    setRepositories([newRepositorie]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repositorie => (
            repositorie.id && (
              <li key={repositorie.id}>
                {repositorie.title}

                    <button onClick={() => handleRemoveRepository(repositorie.id)}>
                      Remover
                    </button>
              </li>    
            )
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
