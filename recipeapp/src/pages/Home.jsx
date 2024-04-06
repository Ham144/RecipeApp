import React, { useContext } from "react";
import { GlobalContext } from "../components/Context";
import { FaStar } from "react-icons/fa";

const Home = () => {
	const { loading, foodMatch, navigate, setId, id } = useContext(GlobalContext);

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
							onClick={() => handleDetail(index)}
						>
							<div className="absolute flex z-10 text-yellow-400 ">
								{Array(Math.floor(Math.random() * 5) + 1)
									.fill(null)
									.map((_, index) => (
										<FaStar
											key={index}
											className="drop-shadow-lg rotate-45"
											size={22}
										/>
									))}
							</div>

							<img
								className="aspect-square object-cover hover:object-contain text-sm text-center transition-opacity rounded-lg drop-shadow-xl"
								src={food.image_url}
								alt="api fault"
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
				<div className="flex flex-1 w-screen mx-auto items-center justify-center justify-items-center h-screen text-7xl">
					We cant found it
				</div>
			)}
		</div>
	);
};

export default Home;
