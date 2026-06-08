import { useEffect, useState } from "react";
import "./App.scss";
import Recipe from "./components/Recipe.js";

function App() {
  const APP_ID = process.env.REACT_APP_APP_ID;
  const APP_KEY = process.env.REACT_APP_APP_KEY;

  const [query, setQuery] = useState("chicken");
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const urlV2 = `https://api.edamam.com/api/recipes/v2/0123456789abcdef0123456789abcdef?type=public&app_id=${APP_ID}&app_key=${APP_KEY}&q=${query}`;
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    setRecipes(data.hits);
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
          recipes.map((data) => {
            let recipe = data.recipe;
            return <Recipe key={recipe.label} recipe={recipe} />;
          })
        ) : (
          <div>No Results Found!</div>
        )}
      </div>
    </div>
  );
}

export default App;
