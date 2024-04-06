import React from "react";

const About = () => {
	return (
		<div className="flex flex-col h-screen items-center justify-center">
			<div className="w-[90%] mx-auto flex flex-col gap-y-5">
				<h1 className="text-4xl text-center">About section</h1>
				<p className="text-2xl bg-blue-100 px-9 py-3 md:rounded-full">
					This is my Simple web, thanks for visiting and this website i create
					is based on my exprerience not by other copy pasting or tutorial
					imitating sort of job. i memorized all the syntax here and type these
					all by my own except the api and end point.
				</p>
			</div>
			<p>Yafiz ham</p>
		</div>
	);
};

export default About;
