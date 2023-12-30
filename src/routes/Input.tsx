import { Input } from "../components/library/Input"
import Container from "../components/site/Container"
import Section from "../components/site/Section"

export const InputPage = () => {
	return (
		<Container
			title="Inputs"
			description="An input is a widget that allows users to provide data or specify options, which can be submitted as part of a form or used to interact with and manipulate content on a web page."
		>
			<Section
				title="Basic"
				description="Basic input with a placeholder."
				id="input-basic"
			>
				<Input type="text" placeholder="Type things here!" />
				<Input type="text" placeholder="Disabled 😔" disabled />
			</Section>
			<Section title="Label" description="Input with a label." id="input-label">
				<Input type="email" placeholder="you@site.com" label="Email" />
			</Section>
			<Section
				title="Description"
				description="Input with description"
				id="input-description"
			>
				<Input
					type="password"
					description="We'll totally never share your deeds my friend ;)"
					placeholder="Super Secret!"
					label="Password"
				/>
			</Section>
		</Container>
	)
}
