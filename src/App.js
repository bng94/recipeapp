import { useEffect, useState } from "react";
import "./App.scss";
import Recipe from "./components/Recipe.js";

const CUISINES = [
  "american",
  "french",
  "greek",
  "italian",
  "japanese",
  "mexican",
  "portuguese",
  "spanish",
  "thai",
  "turkish",
];
const MEAL_TYPES = [
  "starter",
  "main",
  "dessert",
  "appetizer",
  "breakfast",
  "brunch",
  "snack",
  "side_dish",
  "soup",
  "drink",
  "sauce",
];
const DIFFICULTIES = ["easy", "medium", "hard"];
const DIETARY_TAGS = [
  "vegetarian",
  "vegan",
  "gluten_free",
  "dairy_free",
  "nut_free",
  "halal",
  "kosher",
];

const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, " ");

function App() {
  const APP_KEY = process.env.REACT_APP_API_KEY;

  const [query, setQuery] = useState("chicken");
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    cuisine: "",
    meal_type: "",
    difficulty: "",
    dietary_tags: "",
  });

  useEffect(() => {
    getRecipes();
  }, [query, filters]);

  const getRecipes = async () => {
    try {
      const params = new URLSearchParams({ apikey: APP_KEY, search: query });
      if (filters.cuisine) params.append("cuisine", filters.cuisine);
      if (filters.meal_type) params.append("meal_type", filters.meal_type);
      if (filters.difficulty) params.append("difficulty", filters.difficulty);
      if (filters.dietary_tags)
        params.append("dietary_tags", filters.dietary_tags);

      const response = await fetch(
        `https://recipeapi.io/api/v1/recipes?${params}`,
      );
      if (!response.ok) {
        setRecipes([]);
        return;
      }
      const data = await response.json();
      setRecipes(data.data ?? []);
    } catch {
      setRecipes([]);
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const setFilter = (key) => (e) =>
    setFilters((prev) => ({ ...prev, [key]: e.target.value }));

  const clearFilters = () =>
    setFilters({
      cuisine: "",
      meal_type: "",
      difficulty: "",
      dietary_tags: "",
    });

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="App">
      <div className="search-section">
        <form onSubmit={formSubmit} className="search-form">
          <input
            className="search-bar"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes..."
          />
          <button
            className="search-button"
            type="submit"
            disabled={!search.trim()}
          >
            Search
          </button>
          <button
            className={`filter-toggle${activeFilterCount > 0 ? " filter-toggle--active" : ""}`}
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            Filters
            {activeFilterCount > 0 && (
              <span className="filter-count">{activeFilterCount}</span>
            )}
          </button>
        </form>

        {showFilters && (
          <div className="filter-panel">
            <div className="filter-grid">
              <div className="filter-group">
                <label className="filter-label">Cuisine</label>
                <select
                  className="filter-select"
                  value={filters.cuisine}
                  onChange={setFilter("cuisine")}
                >
                  <option value="">All</option>
                  {CUISINES.map((c) => (
                    <option key={c} value={c}>
                      {capitalize(c)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Meal Type</label>
                <select
                  className="filter-select"
                  value={filters.meal_type}
                  onChange={setFilter("meal_type")}
                >
                  <option value="">All</option>
                  {MEAL_TYPES.map((m) => (
                    <option key={m} value={m}>
                      {capitalize(m)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Difficulty</label>
                <select
                  className="filter-select"
                  value={filters.difficulty}
                  onChange={setFilter("difficulty")}
                >
                  <option value="">All</option>
                  {DIFFICULTIES.map((d) => (
                    <option key={d} value={d}>
                      {capitalize(d)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label className="filter-label">Dietary</label>
                <select
                  className="filter-select"
                  value={filters.dietary_tags}
                  onChange={setFilter("dietary_tags")}
                >
                  <option value="">All</option>
                  {DIETARY_TAGS.map((t) => (
                    <option key={t} value={t}>
                      {capitalize(t)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button
                className="clear-filters"
                type="button"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      <div className="recipes">
        {recipes.length > 0 ? (
          recipes.map((recipe) => <Recipe key={recipe.id} recipe={recipe} />)
        ) : (
          <div>No Results Found!</div>
        )}
      </div>
    </div>
  );
}

export default App;
