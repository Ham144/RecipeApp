import React, { useContext } from "react";
import { GlobalContext } from "../components/Context";

const Favorites = () => {
	const { favorites } = useContext(GlobalContext);

	return (
		<div className="pt-[100px] flex flex-col items-center  bg-slate-200 ">
			<h1 className="text-4xl font-extralight">Favorite List :</h1>
			<div className="flex flex-col items-center gap-y-2 justify-center mx-auto w-[90%]">
				{favorites.map((item) => (
					<div>{item.id}</div>
				))}
			</div>
		</div>
	);
};

export default Favorites;
