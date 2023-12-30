import { SiNextdotjs, SiVite } from "react-icons/si"
import { BlockLinkCard, ContentCard } from "../components/library/Card"
import Container from "../components/site/Container"
import Section from "../components/site/Section"

export const CardPage = () => {
	return (
		<Container
			title="Card"
			description="A card is a flexible and extensible content container"
		>
			<Section
				title="Simple"
				description="Simple cards display content and can provide a distinct link that can be selected."
				id="card-simple"
			>
				<ContentCard
					title="Card Title"
					subtitle="Card Subtitle"
					plainText="Some quick example text to build on
            the card title and make up the bulk of
            the card's content."
					link={{ url: "#", text: "Card Link" }}
				></ContentCard>
			</Section>
			<Section
				title="Simple card with a header and a footer"
				description="Add an optional header and/or footer within a card."
				id="card-header-footer"
			>
				<ContentCard
					header="Featured"
					title="Card Title"
					subtitle="Card Subtitle"
					plainText="Some quick example text to build on
            the card title and make up the bulk of
            the card's content."
					link={{ url: "#", text: "Card Link" }}
				></ContentCard>
				<ContentCard
					title="Card Title"
					subtitle="Card Subtitle"
					plainText="Some quick example text to build on
            the card title and make up the bulk of
            the card's content."
					link={{ url: "#", text: "Card Link" }}
					footer="Last updated 5 mins ago"
				></ContentCard>
			</Section>
			<Section
				title="Block link"
				description="A simple card enhanced into a selectable block link."
				id="card-block-link"
			>
				<BlockLinkCard url="https://vitejs.dev/" text="Vite">
					<SiVite className="h-10 w-10" />
				</BlockLinkCard>
				<BlockLinkCard url="https://nextjs.org/" text="Next.js">
					<SiNextdotjs className="h-10 w-10" />
				</BlockLinkCard>
			</Section>
		</Container>
	)
}
