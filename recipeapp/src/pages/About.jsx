import React from "react";

const About = () => {
	return (
		<div className="flex flex-col h-screen items-center justify-center">
			<div className="w-[90%] mx-auto flex flex-col gap-y-5">
				<h1 className="text-4xl text-center">About section</h1>
				<p className="text-2xl bg-blue-100 px-9 py-3 md:rounded-full">
					This is my Simple web, i don't have idea for what other page i should
					create so i created this about page, this web also is just for my
					portofolio so don't really mind if it's not perfect becuase i am more
					focusing on how to make something, the steps, the tech, and the logic,
					i didn't really spend on styling because it takes more time, thanks
					for visiting and this website i create is based on my experiences not
					by other copy pasting or tutorial imitating sort of job. i memorized
					all the syntax here and type these all by my own except for the api
					and end point.
				</p>
			</div>
			<p>Yafiz ham</p>
		</div>
	);
};

export default About;
