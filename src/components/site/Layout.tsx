import React from "react"
import Navbar from "./Navbar"

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="relative   min-h-[100vh] bg-white font-ubuntu dark:bg-zinc-900">
			<Navbar />
			<main className="p-10 sm:px-16 lg:px-44">
				<div className="mx-auto max-w-3xl space-y-20">{children}</div>
			</main>
		</div>
	)
}

export default Layout
