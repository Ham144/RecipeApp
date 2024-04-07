import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/Context";

const Favorites = () => {
	const { favorites } = useContext(GlobalContext);
	const [ingredientsFav, setIngredientsFav] = useState([]);

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
		fetchingFavoritesIng();
	}, [favorites.length]);

	console.log(ingredientsFav);
	return (
		<div className="pt-[100px] flex flex-col items-center justify-center   bg-slate-200 min-h-screen">
			<h1 className="text-4xl font-extralight">Favorite List :</h1>
			<div className="flex flex-col items-center border border-black  px-5 py-3  gap-y-5  justify-center    md:w-[50%] w-full rounded-xl">
				{favorites.map((item, index) => (
					<div className="flex gap-x-2 justify-start  w-full rounded-lg px-3 py-2  shadow-lg">
						<img
							src={item.image_url}
							className="w-[20%] aspect-square object-cover rounded-md "
							alt=""
						/>
						<div className="flex flex-col detail items-start ">
							<p className="text-3xl font-light text-start">{item.title}</p>
							<p className="font-bold font-serif">{item.publisher}</p>
						</div>
						{ingredientsFav[index].data.recipe.map(
							({ units, quantity, description }) => (
								<p>{description}</p>
							)
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default Favorites;
