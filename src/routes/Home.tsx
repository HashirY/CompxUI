import { Link } from "react-router-dom"
import Container from "../components/site/Container"
import { BlockLinkCard } from "../components/library/Card"
import { RxButton, RxIdCard, RxInput } from "react-icons/rx"

export const HomePage = () => {
	return (
		<Container
			title="Hashir's Components"
			description="A collection of my customized components. Built with React and Tailwind CSS. "
		>
			<div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-6">
				<BlockLinkCard
					url="/button"
					text="Button"
					widthLimit="none"
					CustomLinkComponent={Link}
					customLinkProps={{
						to: "/button",
					}}
				>
					<RxButton className="h-10 w-10" />
				</BlockLinkCard>
				<BlockLinkCard
					url="/card"
					text="Card"
					widthLimit="none"
					CustomLinkComponent={Link}
					customLinkProps={{
						to: "/button",
					}}
				>
					<RxIdCard className="h-10 w-10" />
				</BlockLinkCard>
				<BlockLinkCard
					url="/input"
					text="Input"
					widthLimit="none"
					CustomLinkComponent={Link}
					customLinkProps={{
						to: "/button",
					}}
				>
					<RxInput className="h-10 w-10" />
				</BlockLinkCard>

				{/* <Link to={"button"}>Button</Link>
				<Link to={"card"}>Card</Link>
				<Link to={"input"}>Input</Link> */}
			</div>
		</Container>
	)
}
