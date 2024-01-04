import React from "react"
import { BsArrowRight } from "react-icons/bs"

interface CircularHeaderProps {
	navigate: (path: string) => void
	shopId: string
}

const CircularHeader: React.FC<CircularHeaderProps> = ({
	navigate,
	shopId,
}) => {
	return (
		<div className="flex items-center justify-end mt-10">
			<BsArrowRight
				onClick={() => navigate(`/admin/${shopId}`)}
				className="flex cursor-pointer text-[#3C3744] text-2xl"
			/>
		</div>
	)
}

export default CircularHeader
