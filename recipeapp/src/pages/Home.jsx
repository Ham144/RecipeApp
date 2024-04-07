import React, { useContext } from "react";
import { GlobalContext } from "../components/Context";
import { FaHeart, FaStar } from "react-icons/fa";

const Home = () => {
	const { loading, foodMatch, navigate, setId, addToFavorite, favorites } =
		useContext(GlobalContext);

	const handleDetail = (getindex) => {
		setId(foodMatch?.data?.recipes[getindex]?.id);
		navigate(`/details/${getindex}`);
	};

	return (
		<div className="grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 text-5xl gap-x-2 gap-y-4 px-9 pt-[110px] cursor-pointer  bg-slate-200">
			{foodMatch?.data?.recipes.length ? (
				loading ? (
					<div className="flex flex-1 w-screen mx-auto items-center justify-center h-screen justify-items-center">
						Loading Data...
					</div>
				) : (
					foodMatch?.data?.recipes?.map((food, index) => (
						<div
							className={`${
								!food.image_url ? "hidden" : "visible"
							} drop-shadow-lg rounded-md text-center `}
							key={food.id}
						>
							<div
								className={`${
									favorites?.find((fav) => {
										return fav.id === foodMatch.data.recipes[index].id;
									})
										? "bg-yellow-200 text-yellow-500"
										: "bg-white"
								} absolute   z-10 right-2 top-2 shadow-xl   text-yellow-400 border rounded-full p-1 px-1 `}
								onClick={() => addToFavorite(foodMatch?.data?.recipes[index])}
							>
								<FaHeart className="xl:size-[30px] lg:size-[30px] size-[10px]" />
							</div>

							<img
								className="aspect-square object-cover hover:object-contain text-sm text-center transition-opacity rounded-lg drop-shadow-xl"
								src={food.image_url}
								alt="api fault"
								onClick={() => handleDetail(index)}
							/>
							<div className="">
								<p className="text-[18px] font-extralight border border-spacing-1 px-4 py-1 uppercase rounded-sm bg-yellow-300 text-nowrap overflow-hidden hover:text-wrap transition duration-1000">
									{food.title
										.split(" ")
										.filter((_, i) => i < 2)
										.join(" ")}
								</p>
							</div>
						</div>
					))
				)
			) : (
				<div className="absolute top-[50%] flex-1  mx-auto items-center justify-center justify-items-center  h-screen ">
					Nothing to show :( API limit reached
				</div>
			)}
		</div>
	);
};

export default Home;
