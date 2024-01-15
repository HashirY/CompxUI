import { useEffect, useRef, useState } from "react"
import { Input } from "../components/library/Input"
import Container from "../components/site/Container"
import { useDebounce } from "../hooks/useDebounce"
import Button from "../components/library/Button"
import { HiMiniXCircle } from "react-icons/hi2"
import { CardContainer } from "../components/library/Card"

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
	const [tags, setTags] = useState<NpmPackage[]>([])
	const [showResults, setShowResults] = useState(false)

	const searchRef = useRef<HTMLDivElement>(null)
	const handleClickOutside = (event: MouseEvent) => {
		if (
			searchRef.current &&
			!searchRef.current.contains(event.target as Node)
		) {
			setQuery("")
			setShowResults(false)
		}
	}

	const handleEscape = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			setQuery("")
			setShowResults(false)
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", handleEscape)
		document.addEventListener("mousedown", handleClickOutside)

		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
			document.removeEventListener("keydown", handleEscape)
		}
	})

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

	const handleSelectPackage = (pkg: NpmPackage) => {
		setTags((prevTags) => [...prevTags, pkg])
		setQuery("")
	}

	const handleRemoveTags = (name: string) => {
		setTags(tags.filter((pkg) => pkg.name !== name))
	}

	useEffect(() => {
		setShowResults(packages.length > 0)
	}, [packages])

	useEffect(() => {
		if (!query) setShowResults(false)
	}, [query])

	const Tag = ({ children }: { children: React.ReactNode }) => (
		<span className="m-1 flex cursor-pointer flex-wrap items-center justify-between rounded-md bg-[#167E41] py-2 pl-4 pr-2 text-sm font-medium text-[#BEE9CD]">
			{children}
		</span>
	)

	return (
		<div>
			{tags.length > 0 && (
				<div className=" mb-3 flex flex-wrap rounded-lg bg-[#262626] px-2 pb-11 pt-2">
					{tags.map((pkg) => (
						<Tag key={pkg.name}>
							{pkg.name}
							<button onClick={() => handleRemoveTags(pkg.name)}>
								<HiMiniXCircle className=" ml-1 text-lg hover:text-red-400" />
							</button>
						</Tag>
					))}
				</div>
			)}

			<div className="mt-1 flex w-full flex-col items-center text-sm">
				<div className="relative w-full">
					<div className="w-full sm:mb-2">
						<Input
							type="text"
							autoComplete="off"
							onChange={(e) => setQuery(e.target.value)}
							value={query}
							placeholder="Search for package"
							className="mx-auto"
						/>
					</div>
					{showResults ? (
						<div ref={searchRef} className="absolute z-10 w-full ">
							<CardContainer
								className="mt-1 max-h-60  overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar-thumb]:rounded-full
								[&::-webkit-scrollbar-thumb]:bg-gray-300
								dark:[&::-webkit-scrollbar-thumb]:bg-slate-500
								[&::-webkit-scrollbar-track]:rounded-full
								[&::-webkit-scrollbar-track]:bg-gray-100
								dark:[&::-webkit-scrollbar-track]:bg-slate-700
								[&::-webkit-scrollbar]:w-2"
								widthLimit={`none`}
							>
								{packages.map((pkg) => (
									<Button
										key={pkg.name}
										type="button"
										variant="tertiary"
										className="flex w-full items-center justify-between text-left"
										onClick={() => handleSelectPackage(pkg)}
										disabled={tags.includes(pkg)}
									>
										<span>{pkg.name}</span>
									</Button>
								))}
							</CardContainer>
						</div>
					) : (
						<div></div>
					)}
				</div>
			</div>
		</div>
	)
}

const Tags = () => {
	return (
		<Container
			title="Tags"
			description="Add NPM packages as tags to
			your project, or as you see
			fit :D"
		>
			<NpmSearch />
		</Container>
	)
}

export default Tags
