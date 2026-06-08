import { useEffect, useState } from "react";
import "./App.scss";
import Recipe from "./components/Recipe.js";

function App() {
  const APP_KEY = process.env.REACT_APP_API_KEY;

  const [query, setQuery] = useState("chicken");
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const url = `https://recipeapi.io/api/v1/recipes?apikey=${APP_KEY}&search=${query}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setRecipes(data.data);
  };

  const setSearchValue = (e) => {
    setSearch(e.target.value);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  return (
    <div className="App">
      <form onSubmit={formSubmit} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={setSearchValue}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe) => {
            return <Recipe key={recipe.id} recipe={recipe} />;
          })
        ) : (
          <div>No Results Found!</div>
        )}
      </div>
    </div>
  );
}

export default App;
