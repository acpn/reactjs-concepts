import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {

    const response = await api.post('/repositories', {
      title: `Novo projeto ${Date.now()}`,
      url: 'http://github.com/teste',
      techs: ['React', 'Python']
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    
    const response = await api.delete(`repositories/${id}`)
      .then(response => {
        const list = repositories.filter(
          repository => repository.id !== id);
        
          setRepositories(list);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories && 
         repositories.map(
              repository => 
                <li 
                  key={repository.id}>
                  { repository.title }
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                </li>
        )}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
