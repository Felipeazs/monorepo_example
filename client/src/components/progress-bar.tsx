import { useEffect, useState } from "react"

import { Progress } from "./ui/progress"

type ProgressProps = {
	status: number
	min: number
}

export function ProgressBar({ status, min }: ProgressProps) {
	const [progress, setProgress] = useState<number>(min)

	useEffect(() => {
		const interval = setInterval(() => {
			setProgress((prevState) => {
				if (status === 0) {
					clearInterval(interval)
					return 100
				}

				return prevState + 1
			})
		}, 100)

		if (progress === 100) {
			setProgress(min)
		}

		return () => clearInterval(interval)
	}, [status])

	return (
		<Progress
			max={100}
			className={progress === 100 ? "bg-slate-300" : "bg-slate-600"}
			value={progress}
		/>
	)
}
