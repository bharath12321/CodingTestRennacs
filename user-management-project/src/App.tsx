import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  useEffect (() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/api/users?page=${page}`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetchign users: ', error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post('/api/users', {name: 'New User'});
      fetchUsers();
    } catch (error) {
      console.error('Error creating user: ', error);
    }
  };

  const removeUser = async (userId: number) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      fetchUsers();
    } catch(error) {
      console.log('Error removing user: ', error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <button onClick={createUser}>Create User</button>

      <button onClick={() => setPage(page - 1)} 
      disabled={page === 1}>
        Previous Page
      </button>
      
      <button onClick={() => setPage(page + 1)}>
        Next Page
      </button>

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <button onClick={() => removeUser(user.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
};
export default App
