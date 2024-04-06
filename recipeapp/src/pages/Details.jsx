import { useContext, useEffect } from "react";
import { GlobalContext } from "../components/Context";
import { useParams } from "react-router-dom";
import {
	FaTimes,
	FaStar,
	FaArrowLeft,
	FaArrowRight,
	FaCircle,
	FaHeart,
} from "react-icons/fa";
import { MdDinnerDining } from "react-icons/md";

export default function Details() {
	const {
		foodMatch,
		navigate,
		ingredients,
		setIngredients,
		addToFavorite,
		favorites,
	} = useContext(GlobalContext);
	const { index } = useParams();

	const fetchingIngredients = async (getindex) => {
		try {
			const response = await fetch(
				`https://forkify-api.herokuapp.com/api/v2/recipes/${foodMatch?.data?.recipes[getindex].id}`
			);
			const data = await response.json();
			// console.log(data?.data?.recipe, "getindex=", index);
			setIngredients(data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleArrow = (getIndex, getPosition) => {
		if (getPosition === "right") {
			if (index == foodMatch?.data?.recipes?.length - 1) {
				navigate(`/details/0`);
			} else {
				navigate(`/details/${Number(getIndex) + 1}`);
			}
		} else {
			if (index === "0") {
				navigate(`/details/${foodMatch.data.recipes.length - 1}`);
			} else {
				navigate(`/details/${Number(index) - 1}`);
			}
		}
		fetchingIngredients(getIndex);
	};

	useEffect(() => {
		fetchingIngredients(index);
	}, [index]); //ini untuk pertama kali klik dari home atau dari navbar dan juga sangat berguna untuk mensinkronkan ingredients update

	const TestaddToFavorite = (item) => {
		console.log(item);
	};

	return (
		<div className="flex flex-col  justify-center items-center bg-slate-100  sm:px-16 mx-auto transition-opacity duration-1000 pt-[100px]">
			<h1 className="font-light text-4xl text-center ">Food's Detail</h1>

			<div className="sm:flex  justify-center  text-2xl  sm:gap-x-4 border px-4 py-5 space-y-5 bg-white">
				<div>
					<img
						className="lg:h-[600px] sm:h-[100px] rounded-md"
						src={foodMatch?.data?.recipes[index]?.image_url}
						alt=""
					/>
					<div
						className={`${
							favorites.map((e) => e.id === foodMatch.data.recipe[index].id)
								? "bg-yellow-500"
								: ""
						} absolute  z-30 right-3 text-yellow-400 border rounded-full p-2 px-2 bg-white hover:bg-slate-300`}
						onClick={() => addToFavorite(foodMatch.data.recipes[index])}
					>
						<FaHeart size={30} />
					</div>
					<div className="flex justify-around  pt-4">
						<div className="flex flex-col gap-y-4 justify-around">
							<p className="bg-yellow-200 rounded-full px-3 py-1 text-center">
								Servings
							</p>
							<div className="flex text-yellow-600 rounded-full gap-x-3 ">
								{!ingredients
									? null
									: Array(Math.floor(ingredients?.recipe?.servings))
											.fill(null)
											.map((_, i) => (
												<MdDinnerDining
													className="bg-slate-200 rounded-full "
													size={50}
												/>
											))}
							</div>
						</div>
						<div className="flex flex-col justify-around">
							<p className="bg-yellow-200 rounded-full px-3 py-1 text-center">
								Cooking time
							</p>
							<p className="text-center text-4xl">
								{ingredients?.recipe?.cooking_time} minutes
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-y-6">
					<h1 className="font-bold text-4xl">
						{foodMatch?.data?.recipes[index]?.title}
					</h1>
					<div className="border bg-yellow-200 rounded-full py-1 px-2">
						by :{foodMatch?.data?.recipes[index]?.publisher}
					</div>
					<div>
						<p>Rating *rating is not real*</p>
						<div className="flex items-center">
							<div className="flex">
								{!ingredients
									? null
									: Array(
											Math.ceil((ingredients?.recipe?.cooking_time * 5) / 100)
									  )
											.fill(null)
											.map((_, i) => (
												<div>
													<FaStar className="text-yellow-400 " />
												</div>
											))}
							</div>
							{(ingredients?.recipe?.cooking_time * 5) / 100}
						</div>
						<div>
							<p>Dificulty</p>
							<div className="flex">
								{foodMatch?.data?.recipes[index]?.title?.split(" ").length >
									0 && (
									<>
										{/* Render bars based on word count */}
										{Array(
											(ingredients?.recipe?.ingredients?.length / 2) | (+1 / 2)
										)
											.fill(null)
											.map((_, i) => (
												<FaTimes className="text-red-500" />
											))}
									</>
								)}
							</div>
						</div>
						<div className="flex flex-col gap-y-1 font-extralight">
							<p className="">Ingredients</p>
							{ingredients?.recipe?.ingredients?.map(
								({ quantity, description, unit }) => (
									<div className="flex border bg-blue-200 px-2 py-1 rounded-xl">
										<div className="text-md">
											{description} {quantity} {unit}
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="arrow">
				<div className="font-extrabold fixed left-7 top-[50%] ">
					<FaArrowLeft
						className="sm:size-16 size-10 text-yellow-400 border border-black rounded-full active:text-white"
						onClick={() => handleArrow(index, "left")}
					/>
				</div>

				<div className="font-extrabold fixed right-7 top-[50%] ">
					<FaArrowRight
						className="sm:size-16 size-10 text-yellow-400 border border-black rounded-full active:text-white"
						onClick={() => handleArrow(index, "right")}
					/>
				</div>
				<div className="sm:flex hidden  gap-x-5">
					{foodMatch?.data?.recipes.map((food, thisindex) => (
						<div className="rounded-full bg-slate-200 w-2 h-2">
							<FaCircle
								className={`${
									Number(thisindex) === Number(index) ? "text-blue-500" : ""
								} text-slate-500 border border-black rounded-full`}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
