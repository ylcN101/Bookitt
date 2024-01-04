export default function createCombinedDateUTC(dateString: string): Date {
	const [datePart, timePart] = dateString.split(" ")
	const [year, month, day] = datePart.split("-").map(Number)
	const [hour, minute, second] = timePart.split(":").map(Number)
	const combinedDateUTC = new Date(
		Date.UTC(year, month - 1, day, hour, minute, second)
	)
	return combinedDateUTC
}
