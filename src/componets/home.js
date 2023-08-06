

// import React, { useState, useEffect } from "react";
// import Recipe from "./Recipe";
// import { Link, useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import LogoutIcon from '@mui/icons-material/Logout';
// import "../App.css";
// import './Recipe.css';
// import { Logout } from "@mui/icons-material";
// import { auth } from '../firebase';
// import './home.css';

// function Home() {
//   const [recipes, setRecipes] = useState([]);
//   const [search, setSearch] = useState("");
//   const [query, setQuery] = useState("pizza");
//   const [pagination, setPagination] = useState({
//     from: 0,
//     to: 9, // Show 9 recipes per page
//   });
//   const [filter, setFilter] = useState({
//     type: '',
//     food: '',
//   });
//   const navigate = useNavigate();

//   const YOUR_APP_ID = `b3b300c4`;
//   const YOUR_APP_KEY = "5085223673a4997aa464bb69c5f5bdf8";

//   useEffect(() => {
//     getRecipes();
//   }, [query, pagination, filter]);

//   const getRecipes = async () => {
//     const typeParam = filter.type;
//     const foodParam = filter.food ? `&food=${filter.food}` : '';
//     const response = await fetch(
//         `https://api.edamam.com/search?q=${query}&health=${typeParam}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=${pagination.from}&to=${pagination.to}`
   
   
//         );
//     const data = await response.json();
//     setRecipes(data.hits);
//   };
//    const updateSearch = (e) => {
//     setSearch(e.target.value);
//   };
//  const getSearch = (e) => {
//     e.preventDefault();
//     setQuery(search);
//     setPagination({ from: 0, to: 9 }); // Reset pagination when searching
//   };
//  const handleCompleteRecipeClick = (recipeUri) => {
//     const recipeId = encodeURIComponent(recipeUri.split('#recipe_')[1]);
//     navigate(`/complaterecipe/${recipeId}`);
//   };
//   const handleLogout = async () => {
//     const shouldLogout = window.confirm('Do you want to logout?');
//     if (shouldLogout) {
//       try {
//         await auth.signOut();
//         console.log('user log out successfully ===>');
//         navigate('/login');
//         // The user is now logged out.
//       } catch (error) {
//         console.error('Error during logout:', error);
//       }
//     }
//   };
//    const handlePageChange = (page) => {
//     const from = (page - 1) * 9; // 9 recipes per page
//     setPagination({ from, to: from + 9 });
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter((prevFilter) => ({
//       ...prevFilter,
//       [name]: value,
//     }));
//     setPagination({ from: 0, to: 9 }); // Reset pagination when changing filters
//   };
//   return (
//     <div className="App">
//       <h1>SEARCH FOR A RECIPE OF YOUR CHOICE</h1>
//       <div className="cart_Item" onClick={handleLogout}>
//         <LogoutIcon />
//       </div>
//       <form onSubmit={getSearch} className="search-form">
//         <input
//           className="search-bar"
//           type="text"
//           value={search}
//           onChange={updateSearch}
//         />
//         <button className="search-button" type="submit">
//           Search
//         </button>
//       </form>

//       <div className="filter">
//         <select name="type" value={filter.type} onChange={handleFilterChange}>
//           <option value="">Select Type</option>
//           <option value="veg">Veg</option>
//           <option value="non-veg">Non-Veg</option>
//           <option value="fast-food">Fast Food</option>
//         </select>
//         <select name="food" value={filter.food} onChange={handleFilterChange}>
//           <option value="">Select Food</option>
//           <option value="matar-paneer">Matar Paneer</option>
//           <option value="burger">Burger</option>
//           <option value="pizza">Pizza</option>
//         </select>
//       </div>
//    <div className="recipes" >
//         {recipes && recipes?.length > 0 ? (
//           recipes.map((recipe) => (
//             <div key={uuidv4()} className="recipe-card" onClick={() => handleCompleteRecipeClick(recipe.recipe.uri)}>
//               <h2>{recipe.recipe.label}</h2>
//               <img src={recipe.recipe.image} alt={recipe.recipe.label} />
//               <button onClick={() => handleCompleteRecipeClick(recipe.recipe.uri)}>
//                 Complete Recipe
//              </button>
//             </div>
//           ))
//         ) : (
//           <p>No recipes found.</p>
//         )}
//       </div>

//       <div className="pagination">
//        {recipes &&
//          [...Array(Math.ceil(recipes.length / 9)).keys()].map((page) => (
//           <button key={page + 1} onClick={() => handlePageChange(page + 1)}>
//         {page + 1}
//       </button>
//     ))}
//   </div>

//     </div>
//   );
// }
// export default Home;



import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../firebase';
import './home.css';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState();
  const [query, setQuery] = useState('burger');
  const [pagination, setPagination] = useState({
    from: 0,
    to: 9, // Show 9 recipes per page
  });
  const [filter, setFilter] = useState({
    type: 'vegan',
    food: '',
  });
  const navigate = useNavigate();

  const YOUR_APP_ID = `b3b300c4`;
  const YOUR_APP_KEY = "5085223673a4997aa464bb69c5f5bdf8";

  useEffect(() => {
    getRecipes();
  }, [query, pagination, filter]);

  // const getRecipes = async () => {
  //   const typeParam = filter.type;
  //   const foodParam = filter.food ? `&q=${filter.food}` : '';
  //   const response = await fetch(
  //     `https://api.edamam.com/search?q=${filter.food}&health=${typeParam}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=${pagination.from}&to=${pagination.to}`
  //   );
  //   const data = await response.json();
  //   setRecipes(data.hits);
  // };

  const getRecipes = async () => {
    const typeParam = filter.type ;
    const foodParam = filter.food ? `&q=${filter.food}` : query ? `&q=${query}` : '';
    const response = await fetch(
      `https://api.edamam.com/search?health=${typeParam}${foodParam}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=${pagination.from}&to=${pagination.to}`
    );
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };


  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setPagination({ from: 0, to: 9 }); // Reset pagination when searching
    // You can add any additional logic here if needed
  };


  const handleCompleteRecipeClick = (recipeUri) => {
    const recipeId = encodeURIComponent(recipeUri.split('#recipe_')[1]);
    navigate(`/complaterecipe/${recipeId}`);
  };

  const handleLogout = async () => {
    const shouldLogout = window.confirm('Do you want to logout?');
    if (shouldLogout) {
      try {
        await auth.signOut();
        console.log('user log out successfully ===>');
        navigate('/login');
        // The user is now logged out.
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  };

  const handlePageChange = (page) => {
    const from = (page - 1) * 9; // 9 recipes per page
    setPagination({ from, to: from + 9 });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
    setPagination({ from: 0, to: 9 }); // Reset pagination when changing filters
  };

  return (
    <div className="App">
      <h1>SEARCH FOR A RECIPE OF YOUR CHOICE</h1>
      <div className="cart_Item" onClick={handleLogout}>
        <LogoutIcon />
      </div>
      {/* <form onSubmit={getSearch} className="search-form">
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={updateSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form> */}

      <div className="filter">
        <select name="type" value={filter.type} onChange={handleFilterChange}>
          <option value="">Select Type</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          {/* Add other health types if needed */}
        </select>
        <select name="food" value={filter.food} onChange={handleFilterChange}>
          <option value="">Select Food</option>
          <option value="matar-paneer">Matar Paneer</option>
          <option value="burger">Burger</option>
          <option value="pizza">Pizza</option>
          {/* Add other food options if needed */}
        </select>
      </div>

       <div className="recipes">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={uuidv4()} className="recipe-card" onClick={() => handleCompleteRecipeClick(recipe.recipe.uri)}>
              <h2>{recipe.recipe.label}</h2>
              <img src={recipe.recipe.image} alt={recipe.recipe.label} />
              <button onClick={() => handleCompleteRecipeClick(recipe.recipe.uri)}>
                Complete Recipe
              </button>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>

      <div className="pagination">
        {recipes && [...Array(Math.ceil(recipes.length / 9)).keys()].map((page) => (
          <button key={page + 1} onClick={() => handlePageChange(page + 1)}>
            {page + 1}
          </button>
        ))}
      </div>

    </div>
  );
}

export default Home;

