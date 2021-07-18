import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers({ countries, overwrite } = {}) {
    setIsLoading(true);
    
    const params = {
      nat: countries ? countries.join(',') : null,
    };
    
    const response = await axios.get(`https://randomuser.me/api/?results=25`, { params });

    const updatedUsers = overwrite
    ? response.data.results
    : [...users, ...response.data.results];

    setUsers(updatedUsers);

    setIsLoading(false);
  }

  return { users, isLoading, fetchUsers };
};
