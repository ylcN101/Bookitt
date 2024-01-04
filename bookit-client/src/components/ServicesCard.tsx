import React from "react"
import { useTranslation } from "react-i18next"

interface Service {
	name: string
	description: string
	serviceImage?: string
	duration: number
	price: number
}

interface ServicesCardProps {
	service: Service
	onClick: () => void
}

const ServicesCard: React.FC<ServicesCardProps> = ({ service, onClick }) => {
	const { t } = useTranslation(["common"])
	return (
		<div
			onClick={onClick}
			className="bg-white flex shadow-md rounded-lg min-h-[5em] px-2 py-2 w-full md:px-4"
		>
			<div className="flex items-center gap-4 w-full md:justify-between ">
				<div className="flex items-center w-[16em]">
					<img
						src={service.serviceImage || "/images/noavatar.jpg"}
						alt={service.name}
						className="w-12 h-12 rounded-full"
					/>
					<div className="ml-4 flex flex-col flex-grow">
						<h2 className="text-lg font-bold text-[#232c33]">{service.name}</h2>
						<p className="text-sm text-[#232c33]">{service.description}</p>
					</div>
					<div className="flex border border-[#E4E4E7] h-[4em]"></div>
				</div>
				<div className="flex flex-col items-center justify-center">
					<p className="flex text-sm text-[#232c33]">
						{service.duration} {t("minutes")}
					</p>
					<p className="text-sm text-[#232c33]">₪ {service.price}</p>
				</div>
			</div>
		</div>
	)
}

export default ServicesCard
