import { useEffect, useState } from "react"
import { Input } from "../components/library/Input"
import Container from "../components/site/Container"
import { useDebounce } from "../hooks/useDebounce"
import Button from "../components/library/Button"

export type NpmPackage = {
	name: string
	version: string
	description?: string

	links: {
		npm?: string
		homepage?: string
		repository?: string
		bugs?: string
	}
	author?: {
		name: string
		email?: string
		url?: string
	}

	publisher: {
		username: string
		email: string
	}

	maintainers: Array<{ username: string; email: string }>
}

const NpmSearch = () => {
	const [query, setQuery] = useState("")
	const [packages, setPackages] = useState<NpmPackage[]>([])

	const fetchNpmPackages = useDebounce((searchQuery: string) => {
		if (searchQuery) {
			fetch(`https://registry.npmjs.org/-/v1/search?text=${searchQuery}`)
				.then((res) => res.json())
				.then((data) =>
					setPackages(data.objects.map((obj: any) => obj.package)),
				)
		}
	}, 500)

	useEffect(() => {
		fetchNpmPackages(query)

		return () => {
			fetchNpmPackages.cancel()
		}
	}, [query, fetchNpmPackages])

	return (
		<div>
			<Input
				type="text"
				autoComplete="off"
				onChange={(e) => setQuery(e.target.value)}
				value={query}
				placeholder="Search for package"
				className="mx-auto"
			/>
			{packages.map((pkg) => (
				<Button
					key={pkg.name}
					type="button"
					variant="tertiary"
					className="flex w-full items-center justify-between text-left"
				>
					<span>{pkg.name}</span>
				</Button>
			))}
		</div>
	)
}

const Tags = () => {
	return (
		<Container
			title="Tags"
			description="An input is a widget that allows users to provide data or specify options, which can be submitted as part of a form or used to interact with and manipulate content on a web page."
		>
			<NpmSearch />
		</Container>
	)
}

export default Tags
