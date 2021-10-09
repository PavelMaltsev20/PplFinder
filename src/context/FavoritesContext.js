import React from "react";

/**
 * The database from the server does not contain ids.
 * So to save and delete the favorite user we use favEmail and favCall.
 *
 * The function receives two paremetes so that
 * we can reduce the likelihood of an error.
 *
 * But still there is a possibility that there will be two users with
 * one email and with one 'call' number.
 *
 * In real project we will use ids.
 *
 */
export const FavoritesContext = React.createContext({
  updateFavorites: (favEmail, favCell) => {
    const favoritesList = fetchFromStorage();

    // We check if the favorite user has already been saved.
    // If Yes, then delete it and finish execution
    for (const item of favoritesList) {
      if (item.email === favEmail && item.cell === favCell) {
        const itemIndex = favoritesList.indexOf(item);
        favoritesList.splice(itemIndex, 1);
        saveInStorage(favoritesList);
        return;
      }
    }

    // If the user is not saved then we add it to the array and save
    // new array in local storage
    favoritesList.push({ email: favEmail, cell: favCell });
    saveInStorage(favoritesList);
  },
  fetchFavorites: () => {
    return fetchFromStorage();
  },
});

const fetchFromStorage = () => {
  const savedJSON = localStorage.getItem("favorites");
  if (savedJSON === null) {
    return [];
  } else {
    return JSON.parse(savedJSON);
  }
};

const saveInStorage = (list) => {
  const json = JSON.stringify(list);
  localStorage.setItem("favorites", json);
};
