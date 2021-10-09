import React from "react";

export const FavoritesContext = React.createContext({
  updateFavorites: (user) => {
    const favoritesList = fetchFromStorage();

    // We check if the favorite user has already been saved.
    // If Yes, then delete it and finish execution
    for (const item of favoritesList) {
      if (item.login.uuid === user.login.uuid) {
        const itemIndex = favoritesList.indexOf(item);
        favoritesList.splice(itemIndex, 1);
        saveInStorage(favoritesList);
        return;
      }
    }

    // If the user is not saved then we add it to the array and save
    // new array in local storage
    favoritesList.push(user);
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
