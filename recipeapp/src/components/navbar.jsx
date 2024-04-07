import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useContext, useState } from "react";
import { GlobalContext } from "./Context";

export default function Navbar() {
	const { searchParam, setSearchParam, searchData, navigate } =
		useContext(GlobalContext);
	const [showSidebar, setshowSidebar] = useState(false);

	return (
		<nav className="navbar px-5 fixed z-20 w-screen backdrop-blur-sm  py-[20px] flex justify-between items-center border-b-2">
			<div className="logo">
				<img
					className="hover:rotate-180 duration-1000 md:flex hidden"
					src="https://cdn-icons-png.flaticon.com/128/2276/2276931.png"
					alt="logo"
					onClick={() => navigate("/")}
					width={60}
					height={60}
				/>
				<img
					className="size-[40%] md:hidden border-x-black active:border-y-black active:border-x-0  border-4 rounded-full "
					src="https://cdn-icons-png.flaticon.com/128/2276/2276931.png"
					alt="logo"
					onClick={() => setshowSidebar(!showSidebar)}
					width={60}
					height={60}
				/>

				<div
					className={`sidebar md:hidden ${
						showSidebar ? "translate-x-[200px]" : "hidden"
					}  absolute  left-[-200px] w-[40%] top-[95px] z-[-10] h-screen bg-slate-300 transition-opacity duration-300  rounded-md`}
					onClick={() => setshowSidebar(!showSidebar)}
				>
					<div className="flex flex-col items-start px-3   gap-y-4 font-light">
						<Link
							className="border-b-2 w-full hover:font-bold hover:scale-105 drop-shadow-lg font-bold"
							to={"/"}
						>
							Home
						</Link>

						<Link
							className="border-b-2 w-full hover:font-bold hover:scale-105  font-bold drop-shadow-lg"
							to={"/details/0"}
						>
							Details
						</Link>
						<Link
							className="border-b-2 w-full hover:font-bold hover:scale-105  font-bold drop-shadow-lg"
							to={"/favorites"}
						>
							Favorites
						</Link>
						<Link
							className="border-b-2 w-full hover:font-bold hover:scale-105  font-bold  drop-shadow-lg"
							to={"/about"}
						>
							About
						</Link>
					</div>
				</div>
			</div>
			<div className="flex gap-x-14   Navigation md:visible max-md:hidden xl:translate-x-[200px] xl:text-[3vh] text-md duration-500 text-black">
				<Link
					className="hover:border-b-2 hover:font-bold hover:scale-105 drop-shadow-lg font-bold"
					to={"/"}
				>
					Home
				</Link>

				<Link
					className="hover:border-b-2 hover:font-bold hover:scale-105  font-bold drop-shadow-lg"
					to={"/details/0"}
				>
					Details
				</Link>
				<Link
					className="hover:border-b-2 hover:font-bold hover:scale-105  font-bold drop-shadow-lg"
					to={"/favorites"}
				>
					Favorites
				</Link>
				<Link
					className="hover:border-b-2 hover:font-bold hover:scale-105  font-bold  drop-shadow-lg"
					to={"/about"}
				>
					About
				</Link>
			</div>
			<div className="search flex items-center">
				<input
					type="text"
					className="px-2 py-1 w-[290px] h-[40px] rounded-full text-black bg-slate-300"
					placeholder="ex: egg/banana/avocado"
					value={searchParam}
					onChange={(e) => setSearchParam(e.target.value)}
					onKeyDown={(key) => (key.key === "Enter" ? searchData() : null)}
				/>
				<span className="translate-x-[-30px]">
					<FaSearch />
				</span>
			</div>
		</nav>
	);
}
