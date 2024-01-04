import React from "react"
import { BsCheck } from "react-icons/bs"
import {
	FaArrowAltCircleLeft,
	FaArrowAltCircleRight,
	FaCalendarAlt,
	FaFlag,
} from "react-icons/fa"
import { MdOutlineMiscellaneousServices } from "react-icons/md"

interface ScheduleProps {
	isActiveService: boolean
	isActiveDate: boolean
	isActiveMeeting: boolean
	stepBackward: () => void
}

const Schedule: React.FC<ScheduleProps> = ({
	isActiveService,
	isActiveDate,
	isActiveMeeting,
	stepBackward,
}) => {
	return (
		<section>
			<div className="bg-[#ffff] flex justify-between items-center h-24 text-center px-4 shadow-sm">
				<div className="flex gap-4 justify-center items-center">
					<FaArrowAltCircleLeft
						onClick={stepBackward}
						size={30}
						className="flex text-slate-400 cursor-pointer"
					/>
					<span
						className={`bg-[#546CC9] text-white rounded-full h-8 w-8 flex items-center justify-center font-bold mr-2 ${
							isActiveService ? "active" : ""
						} ${isActiveDate ? "activated" : ""}`}
					>
						{isActiveDate ? <BsCheck /> : <MdOutlineMiscellaneousServices />}
					</span>
				</div>
				<hr
					className={`border-[0.7px] border-slate-300 w-full ${
						isActiveDate ? "active-hr" : ""
					}`}
				/>
				<div className="flex justify-center items-center pl-2">
					<span
						className={`border-2 border-slate-400 rounded-full h-8 w-8 flex items-center justify-center font-bold text-slate-400 mr-2 ml-2 ${
							isActiveService ? "active" : ""
						} ${isActiveMeeting ? "activated" : ""}`}
					>
						{isActiveMeeting ? <BsCheck /> : <FaCalendarAlt />}
					</span>
				</div>
				<hr className="border-[0.7px] border-slate-300 w-full" />
				<div className="flex justify-center items-center pl-2">
					<span
						className={`border-2 border-slate-400 rounded-full h-8 w-8 flex items-center justify-center font-bold text-slate-400 bg-white transition duration-300 ease-in-out mr-2 ${
							isActiveMeeting ? "active" : ""
						}`}
					>
						<FaFlag />
					</span>
				</div>
			</div>
		</section>
	)
}

export default Schedule
