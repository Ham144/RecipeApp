import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../components/Context";
import { Link } from "react-router-dom";

const Favorites = () => {
	const { favorites, ingredientsFav, fetchingFavoritesIng } =
		useContext(GlobalContext);
	const [moreDetail, setMoreDetail] = useState(
		Array(favorites.length).fill(false)
	);

	if (!favorites) {
		window.location.reload();
	}

	useEffect(() => {
		fetchingFavoritesIng();
	}, [favorites.length]);

	const handleMoreDetail = (getindex) => {
		const collection = [...moreDetail];
		collection[getindex] = !moreDetail[getindex];
		setMoreDetail(collection);
	};
	if (!ingredientsFav.length || !favorites.length) {
		return (
			<div className="w-screen min-h-screen flex flex-col justify-center items-center rounded-md bg-white shadow-lg px-5 py-3">
				No Data
				<Link className="font-light text-4xl animate-pulse" to={"/"}>
					Add favorite from Home
				</Link>
				<div className="text-center">OR</div>
				<Link className="font-light text-4xl animate-pulse" to={"/details"}>
					Add favorite from Details
				</Link>
			</div>
		);
	} else {
		return (
			<div className="md:pt-[100px] pt-[90px] flex flex-col items-center  bg-slate-200 min-h-screen  ">
				<h1 className="text-4xl font-extralight">Favorite List </h1>
				<div className="flex flex-col items-center   px-5 py-3  gap-y-5  justify-center    md:w-[50%] w-full rounded-xl">
					{favorites.map((item, index) => (
						<div className="flex flex-col  justify-start  w-full h-auto rounded-lg  px-3 py-2  shadow-lg">
							<div className="flex gap-x-6 border-t-4 border-yellow-100 hover:border-yellow-300 ">
								<img
									src={item.image_url}
									className="w-[20%] aspect-square object-cover rounded-md "
									alt=""
								/>
								<div className="flex flex-col detail items-start ">
									<p className="text-3xl font-light text-start">{item.title}</p>
									<p className="font-bold font-serif">{item.publisher}</p>

									<div className="text-2xl font-extralight border hover:scale-95">
										<button onClick={() => alert("I won't let you go")}>
											Visit source here
										</button>
									</div>
								</div>
							</div>
							<button
								onClick={() => handleMoreDetail(index)}
								className="flex justify-center px-3 border  uppercase hover:bg-yellow-100 bg-slate-300 py-2 rounded-full my-2"
							>
								More Detail
							</button>
							<div
								className={`${
									moreDetail[index] ? "flex flex-col" : "hidden"
								} bg-blue-300 rounded-lg px-3 py-6`}
							>
								<div className="">
									<p className="bg-yellow-200 rounded-md px-1 py-2 font-light text-2xl">
										Ingredients
									</p>
									{ingredientsFav[index]?.data?.recipe?.ingredients?.map(
										({ quantity, unit, description }) => (
											<p className="border-b-2">
												{description} {quantity} {unit}
											</p>
										)
									)}
								</div>
								<div className="">
									<p className="bg-yellow-200 px-1 py-2 font-light text-2xl rounded-md">
										Coocking Time
									</p>
									{ingredientsFav[index]?.data?.recipe?.cooking_time}
								</div>
								<div>
									<p className="bg-yellow-200 px-1 py-2 font-light text-2xl rounded-md">
										Servings
									</p>
									{ingredientsFav[index]?.data?.recipe?.servings}
								</div>
								peoples
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
};

export default Favorites;
