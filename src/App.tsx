import Layout from "./components/site/Layout"
import { InputPage } from "./routes/Input"
import { CardPage } from "./routes/Card"
import { ButtonPage } from "./routes/Button"
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom"
import { HomePage } from "./routes/Home"
import { NotFoundPage } from "./routes/NotFound"

export default function App() {
	return (
		<BrowserRouter>
			<AppRoutes />
		</BrowserRouter>
	)
}

// nested routes using outlet and as / is already booked so thats why index={true} is needed
export function AppRoutes() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout>
						<Outlet />
					</Layout>
				}
			>
				<Route index={true} element={<HomePage />} />
				<Route path="button" element={<ButtonPage />} />
				<Route path="card" element={<CardPage />} />
				<Route path="input" element={<InputPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Route>
		</Routes>
	)
}
