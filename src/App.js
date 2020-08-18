import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `New Project ${Date.now()}`,
      url: 'https://projetolink.com',
      techs: 'Minhas techs',
    });

    const newRepository = response.data;
    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);

    if (response.status !== 204) {
      alert('Error');
    }

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    if (repositoryIndex < 0) {
      return alert('Error');
    }

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repository) => {
          return (
            <div key={repository.id}>
              <li>
                <h1>{repository.title}</h1>
              </li>
              <li>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            </div>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
