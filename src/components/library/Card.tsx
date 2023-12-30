// define the props for the card

import { twMerge } from "tailwind-merge"

type CardContainerProps = React.HTMLAttributes<HTMLDivElement> & {
	widthLimit?: "none" | "xs" | "sm" | "md" | "lg"
}

const cardWidths = {
	xs: "max-w-xs",
	sm: "max-w-sm",
	md: "max-w-md",
	lg: "max-w-lg",
	none: "",
}

export const CardContainer: React.FC<CardContainerProps> = ({
	className,
	children,
	widthLimit = "xs",
	...props
}) => {
	// base classes

	const baseClasses: string =
		"rounded-xl border bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:shadow-zinc-700/[.7]"

	const mergedClasses = twMerge([baseClasses, className])

	const widthClass = twMerge(["w-full", cardWidths[widthLimit]])

	return (
		<div className={widthClass} {...props}>
			<div className={mergedClasses}>{children}</div>
		</div>
	)
}

// this type of card is for showing content
export const ContentCard = ({
	header,
	footer,
	title,
	subtitle,
	widthLimit,
	plainText,
	link,
	children,
}: {
	header?: string
	footer?: string
	title?: string
	subtitle?: string
	plainText?: string
	link?: {
		url: string
		text: string
	}
	children?: React.ReactNode
	widthLimit?: CardContainerProps["widthLimit"]
}) => {
	return (
		<CardContainer widthLimit={widthLimit}>
			{header && (
				<div className="rounded-t-xl border-b bg-gray-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800 md:px-5 md:py-4">
					<p className="mt-1 text-sm text-gray-500 dark:text-zinc-500">
						{header}
					</p>
				</div>
			)}
			<div className="flex flex-col p-4 md:p-5">
				{title && (
					<h3 className="text-lg font-bold text-gray-800 dark:text-white">
						{title}
					</h3>
				)}
				{subtitle && (
					<p className="mt-1 text-xs font-medium uppercase text-gray-500 dark:text-zinc-500">
						{subtitle}
					</p>
				)}
				{plainText && (
					<p className="mt-2 text-gray-800 dark:text-zinc-400">{plainText}</p>
				)}
				{children}

				{link && (
					<a
						className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400"
						href={link.url}
					>
						{link.text}
					</a>
				)}
			</div>
			{footer && (
				<div className="rounded-b-xl border-t bg-gray-100 px-4 py-3 dark:border-zinc-700 dark:bg-zinc-800 md:px-5 md:py-4">
					<p className="mt-1 text-sm text-gray-500 dark:text-zinc-500">
						{footer}
					</p>
				</div>
			)}
		</CardContainer>
	)
}

export const BlockLinkCard = ({
	url,
	text,
	children,
	CustomLinkComponent,
	customLinkProps = {},
	widthLimit,
}: {
	url?: string
	text?: string
	children: React.ReactNode
	CustomLinkComponent?: React.ComponentType<any>
	customLinkProps?: any
	widthLimit?: CardContainerProps["widthLimit"]
}) => {
	const linkClasses: string = "flex flex-col items-center p-6 sm:p-10"

	const linkContent = (
		<>
			{children}
			{text && <p className="mt-2 font-medium">{text}</p>}
		</>
	)

	return (
		<CardContainer
			widthLimit={widthLimit}
			className="text-gray-800 transition-colors hover:bg-gray-200/50 dark:text-white dark:hover:bg-zinc-700"
		>
			{CustomLinkComponent ? (
				// this is nothing but LINK component
				<CustomLinkComponent className={linkClasses} {...customLinkProps}>
					{linkContent}
				</CustomLinkComponent>
			) : (
				<a
					href={url || "#"}
					className={linkClasses}
					target="_blank"
					{...(customLinkProps as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
				>
					{linkContent}
				</a>
			)}
		</CardContainer>
	)
}
