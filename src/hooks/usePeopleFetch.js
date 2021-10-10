import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  useEffect(() => {
    fetchUsersByCountry();
  }, [selectedCountries]);

  /**
   * The function checks if the selected country is in the array.
   *
   * If yes removes it
   * If not adds it to array.
   *
   * @param country gets the country code as a parameter
   * (e.g.: "CA" for Canada or "DE" for Germania)
   */
  const handlerSelectedCountries = (country) => {
    setSelectedCountries((prevState) => {
      const newArray = [...prevState];
      const countryIndex = newArray.indexOf(country);
      if (countryIndex >= 0) {
        newArray.splice(countryIndex, 1);
      } else {
        newArray.push(country);
      }
      return newArray;
    });
  };

  const handlerNextPage = () => {
    setPageNumber((prev) => {
      return prev + 1;
    });
  };

  const response = axios.get(
    `https://randomuser.me/api/?results=25&page=${pageNumber}&nat=${selectedCountries}`
  );

  async function fetchUsers() {
    setIsLoading(true);
    const users = await response;
    setIsLoading(false);
    setUsers((prev) => {
      const list = [];
      list.push(...prev);
      list.push(...users.data.results);
      return list;
    });
  }

  async function fetchUsersByCountry() {
    setIsLoading(true);
    const users = await response;
    setIsLoading(false);
    setUsers(() => {
      const list = [];
      list.push(...users.data.results);
      return list;
    });
  }

  return { users, isLoading, handlerSelectedCountries, handlerNextPage };
};
