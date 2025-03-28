import {
	Legend,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
	Radar,
	RadarChart,
	ResponsiveContainer,
} from "recharts"

const data = [
	{
		subject: "Math",
		A: 120,
		B: 110,
		fullMark: 150,
	},
	{
		subject: "Chinese",
		A: 98,
		B: 130,
		fullMark: 150,
	},
	{
		subject: "English",
		A: 86,
		B: 130,
		fullMark: 150,
	},
	{
		subject: "Geography",
		A: 99,
		B: 100,
		fullMark: 150,
	},
	{
		subject: "Physics",
		A: 85,
		B: 90,
		fullMark: 150,
	},
	{
		subject: "History",
		A: 65,
		B: 85,
		fullMark: 150,
	},
]

export function RadarOne() {
	return (
		<ResponsiveContainer minWidth={400} minHeight={300} width="49%" height="50%">
			<RadarChart outerRadius={90} width={730} height={350} data={data}>
				<PolarGrid />
				<PolarAngleAxis fontSize={12} dataKey="subject" />
				<PolarRadiusAxis fontSize={12} angle={30} domain={[0, 150]} />
				<Radar
					fontSize={12}
					name="Mike"
					dataKey="A"
					stroke="#8884d8"
					fill="#8884d8"
					fillOpacity={0.6}
				/>
				<Radar
					fontSize={12}
					name="Lily"
					dataKey="B"
					stroke="#82ca9d"
					fill="#82ca9d"
					fillOpacity={0.6}
				/>
				<Legend />
			</RadarChart>
		</ResponsiveContainer>
	)
}
