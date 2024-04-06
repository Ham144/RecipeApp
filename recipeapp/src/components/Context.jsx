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

	const addToFavorite = (item) => {
		const collection = [...favorites];
		const exist = collection.findIndex((single) => {
			console.log(single.id, item.id);
			return single.id === item.id;
		});

		if (exist === -1) {
			setFavorites((prevFavorites) => setFavorites([...prevFavorites, item]));
		} else if (exist !== -1) {
			setFavorites((prevFavorites) => prevFavorites.splice(exist, 1)); // Remove using previous state
			console.log("masuk");
		}
		console.log(exist);
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
