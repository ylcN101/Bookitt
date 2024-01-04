import React, { useState, useEffect } from "react"
import ScheduleProgressBar from "../components/ScheduleProgressBar"
import dayjs from "dayjs"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { ArrowLeftIcon, ArrowRightIcon } from "@mui/x-date-pickers"
import ServiceList from "../components/ServiceList"
import { WeeklyDatePicker } from "../components/WeeklyDatePicker"
import ConfirmModal from "../components/ConfirmModal"
import HoursCalender from "../components/HoursCalender"
import { useTranslation } from "react-i18next"

const ScheduleMeeting: React.FC = () => {
	const { t } = useTranslation(["common"])
	const [key, setKey] = useState<number>(0)
	const [isActiveService, setIsActiveService] = useState<boolean>(false)
	const [isActiveDate, setIsActiveDate] = useState<boolean>(false)
	const [isActiveMeeting, setIsActiveMeeting] = useState<boolean>(false)
	const [calender, setCalender] = useState<boolean>(false)
	const [hoursCalender, setHoursCalender] = useState<boolean>(false)
	const [openModal, setOpenModal] = useState<boolean>(false)
	const [value, setValue] = useState<any>(null)

	useEffect(() => {
		setValue(dayjs())
	}, [])

	const handleServiceClick = () => {
		setIsActiveService(true)
		setIsActiveDate(true)
		setCalender(true)
		setHoursCalender(true)
		const service = JSON.parse(localStorage.getItem("selectedService") || "{}")
		service.date = dayjs().format("DD/MM/YYYY")
		localStorage.setItem("selectedService", JSON.stringify(service))
	}

	const changeDate = (dir: "left" | "right") => {
		const service = JSON.parse(localStorage.getItem("selectedService") || "{}")
		return () => {
			const newValue =
				dir === "left" ? value?.subtract(1, "week") : value.add(1, "week")
			setValue(newValue)
			service.date = newValue.format("DD/MM/YYYY")
			localStorage.setItem("selectedService", JSON.stringify(service))
		}
	}

	const handleDatePick = (date: Date) => {
		const dateString = dayjs(date).format("DD/MM/YYYY")
		const service = JSON.parse(localStorage.getItem("selectedService") || "{}")
		service.date = dateString
		localStorage.setItem("selectedService", JSON.stringify(service))
		setHoursCalender(true)
		setKey((prevKey) => prevKey + 1)
	}

	const handleHourPick = (hour: string) => {
		const service = JSON.parse(localStorage.getItem("selectedService") || "{}")
		service.hour = hour
		localStorage.setItem("selectedService", JSON.stringify(service))
		setOpenModal(true)
		setIsActiveMeeting(true)
	}

	const handleStepBackward = () => {
		setIsActiveService(false)
		setIsActiveDate(false)
		setIsActiveMeeting(false)
		setCalender(false)
		setHoursCalender(false)
	}

	return (
		<section>
			<nav>
				<ScheduleProgressBar
					stepBackward={handleStepBackward}
					isActiveService={isActiveService}
					isActiveDate={isActiveDate}
					isActiveMeeting={isActiveMeeting}
				/>
			</nav>
			<main className="flex flex-col items-center">
				{!calender && (
					<>
						<div className="flex flex-col items-center justify-center mt-4">
							<h2 className="text-3xl font-bold text-[#3C3744]">
								{t("select-service")}
							</h2>
						</div>
						<ServiceList setStep={handleServiceClick} />
					</>
				)}
				{calender && (
					<div className="mt-8">
						<div className="flex flex-col items-center justify-center mt-8 ">
							<div className="flex items-center">
								<div
									className="flex items-center justify-center mr-2 w-6 h-6 rounded-full mt-2 bg-gray-200 cursor-pointer"
									onClick={changeDate("left")}
								>
									<ArrowLeftIcon className="text-gray-500 hover:text-gray-900" />
								</div>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={["DatePicker"]}>
										<DatePicker
											format="DD/MM/YYYY"
											views={["day"]}
											label={t("select-date")}
											value={value}
											defaultValue={value}
											closeOnSelect={true}
											className="text-2xl font-bold text-gray-700"
											onChange={(newValue) => {
												setValue(newValue)
											}}
										/>
									</DemoContainer>
								</LocalizationProvider>
								<div
									className="flex items-center justify-center ml-2 w-6 h-6 mt-2 rounded-full bg-gray-200 cursor-pointer"
									onClick={changeDate("right")}
								>
									<ArrowRightIcon className="text-gray-500 hover:text-gray-900" />
								</div>
							</div>
							<WeeklyDatePicker initialValue={value} onClick={handleDatePick} />
						</div>
					</div>
				)}
				{hoursCalender && (
					<HoursCalender handleHourPick={handleHourPick} key={key} />
				)}
				{openModal && (
					<ConfirmModal openModal={openModal} setOpenModal={setOpenModal} />
				)}
			</main>
		</section>
	)
}

export default ScheduleMeeting
