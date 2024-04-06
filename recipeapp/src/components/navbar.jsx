import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useContext } from "react";
import { GlobalContext } from "./Context";

export default function Navbar() {
	const { searchParam, setSearchParam, searchData, navigate } =
		useContext(GlobalContext);

	return (
		<nav className="navbar px-5 fixed z-20 w-screen backdrop-blur-sm  py-[20px] flex justify-between items-center border-b-2">
			<div className="logo">
				<img
					className="hover:rotate-180 duration-1000"
					src="https://cdn-icons-png.flaticon.com/128/2276/2276931.png"
					alt="logo"
					onClick={() => navigate("/")}
					width={60}
					height={60}
				/>
			</div>
			<div className="flex gap-x-14   Navigation md:visible max-md:hidden xl:translate-x-[300px] duration-500">
				<Link
					className="hover:border-b-2 hover:font-bold hover:scale-105 "
					to={"/"}
				>
					Home
				</Link>

				<Link
					className="hover:border-b-2 hover:font-bold hover:scale-105 "
					to={"/details/0"}
				>
					Details
				</Link>
				<Link
					className="hover:border-b-2 hover:font-bold hover:scale-105 "
					to={"/favorites"}
				>
					Favorites
				</Link>
				<Link
					className="hover:border-b-2 hover:font-bold hover:scale-105 "
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
