import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, [selectedCountries]);

  /**
   * The function checks if the selected country is in the array.
   *
   * If not adds it to array.
   * If yes removes it
   *
   * @param country gets the country code as a parameter
   * (e.g.: "CA" for Canada or "DE" for Germania)
   */
  const handleSelectedCountries = (country) => {
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

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(
      `https://randomuser.me/api/?results=25&page=${pageNumber}&nat=${selectedCountries}`
    );
    setIsLoading(false);
    setUsers(response.data.results);
  }

  return { users, isLoading, handleSelectedCountries, fetchUsers };
};
