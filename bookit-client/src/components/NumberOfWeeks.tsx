import React from "react"
import EmblaCarousel from "./EmblaCarousel"
import { MdOutlineUpdate } from "react-icons/md"

interface NumberOfWeeksProps {
	parentSelectedSlide: number
	handleParentSelectedSlideChange: (slide: number) => void
	handleEndDate: () => string
}

const NumberOfWeeks: React.FC<NumberOfWeeksProps> = ({
	parentSelectedSlide,
	handleParentSelectedSlideChange,
	handleEndDate,
}) => {
	return (
		<div className="flex flex-col mt-8">
			<div className="flex justify-end items-center gap-4 w-full">
				<span className="flex order-2">
					<MdOutlineUpdate size={22} />
				</span>
				<div className="flex flex-col order-1">
					<span className="flex font-semibold text-[#3C3744] ">
						מספר שבועות
					</span>
					<span className="text-sm text-gray-400">{handleEndDate()}</span>
				</div>
				<EmblaCarousel
					loop={false}
					onSelectedSlideChange={handleParentSelectedSlideChange}
					parentSelectedSlide={parentSelectedSlide}
				/>
			</div>
			<div className="border border-gray-200 mt-1 w-full"></div>
		</div>
	)
}

export default NumberOfWeeks
