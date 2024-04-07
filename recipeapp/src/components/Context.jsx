import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
	const [searchParam, setSearchParam] = useState("avocado");
	const [loading, setLoading] = useState(false);
	const [foodMatch, setFoodMatch] = useState([]);
	const [id, setId] = useState("");
	const navigate = useNavigate();
	const [ingredients, setIngredients] = useState();
	const [favorites, setFavorites] = useState([]);
	const [ingredientsFav, setIngredientsFav] = useState([]);

	const fetchingData = async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchParam}`
			);
			const data = await response.json();
			if (!data) {
				setLoading(false);
				return;
			} else {
				setLoading(false);
				setFoodMatch(data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchingIngredients = async (getindex) => {
		try {
			const response = await fetch(
				`https://forkify-api.herokuapp.com/api/v2/recipes/${foodMatch?.data?.recipes[getindex].id}`
			);
			const data = await response.json();
			// console.log(data?.data?.recipe);
			// console.log(favorites);
			setIngredients(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchingFavoritesIng = () => {
		const collection = [...ingredientsFav];
		favorites.map(async (favorite) => {
			try {
				const ingredient = await fetch(
					`https://forkify-api.herokuapp.com/api/v2/recipes/${favorite.id}`
				).then((data) => data.json());
				collection.push(ingredient);
			} catch (error) {
				console.log(error);
			}
		});
		setIngredientsFav(collection);
	};

	useEffect(() => {
		fetchingData();
	}, []);

	const searchData = async (e) => {
		navigate("/");
		fetchingData();
		await e?.target?.blur();
	};

	const addToFavorite = (item) => {
		const collection = [...favorites];
		const exist = collection.findIndex((single) => {
			// console.log(single.id, item.id);
			return single.id === item.id;
		});

		if (exist === -1) {
			setFavorites((prevFavorites) => setFavorites([...prevFavorites, item]));
			// console.log("tertambah");
		} else if (exist !== -1) {
			collection.splice(exist, 1);
			setFavorites(collection);
			// console.log("terhapus");
		}
		console.log(favorites.length);
	};

	return (
		<GlobalContext.Provider
			value={{
				searchParam,
				setSearchParam,
				loading,
				searchData,
				foodMatch,
				navigate,
				id,
				setId,
				ingredients,
				setIngredients,
				addToFavorite,
				favorites,
				setFavorites,
				fetchingIngredients,
				ingredientsFav,
				setIngredientsFav,
				fetchingFavoritesIng,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
