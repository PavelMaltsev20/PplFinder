import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const pageNumber = 1;
    setIsLoading(true);
    const response = await axios.get(
      `https://randomuser.me/api/?results=25&page=${pageNumber}&nat=${country}`
    );
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, fetchUsers };
};
