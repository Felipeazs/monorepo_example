import { Card, CardHeader, CardTitle } from "./ui/card"

export function ErrorComponent({ error }: { error: Error }) {
	return (
		<div className="flex w-full items-start justify-center p-5">
			<Card>
				<CardHeader>
					<CardTitle>{error.message.toUpperCase()}</CardTitle>
				</CardHeader>
			</Card>
		</div>
	)
}
