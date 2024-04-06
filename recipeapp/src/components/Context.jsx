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

	useEffect(() => {
		fetchingData();
	}, []);

	const searchData = (e) => {
		fetchingData();
	};

	useEffect(() => {
		setFavorites(favorites);
		console.log(favorites);
	}, [favorites]);
	const addToFavorite = (item) => {
		const collection = [...favorites];
		const exist = collection.findIndex((single) => {
			return single.id === item.id;
		});
		if (exist) return collection.splice(exist, 1);

		setFavorites([...favorites, item]);
		console.log(item, favorites);
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
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
}
