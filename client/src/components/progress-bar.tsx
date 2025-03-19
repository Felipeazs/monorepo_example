import { useEffect, useState } from "react"

import { Progress } from "./ui/progress"

export function ProgressBar({ isLoading }: { isLoading: boolean }) {
	const [progress, setProgress] = useState<number>(0)

	useEffect(() => {
		let interval: Timer
		if (isLoading) {
			interval = setInterval(() => setProgress((prevState) => prevState + 1), 20)
		} else {
			setProgress(100)
		}

		return () => clearInterval(interval)
	}, [isLoading])

	return <Progress max={100} className={isLoading ? "bg-blue-300" : "bg-white"} value={progress} />
}
