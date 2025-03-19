import { useEffect, useState } from "react"

import { Progress } from "./ui/progress"

export function ProgressBar({ isLoading }: { isLoading: boolean }) {
	const [progress, setProgress] = useState<number>(0)

	useEffect(() => {
		if (isLoading) {
			setProgress((prevState) => prevState + 10)
		} else {
			setProgress(100)
		}
	}, [isLoading])

	return <Progress max={100} className={isLoading ? "bg-blue-300" : "bg-white"} value={progress} />
}
