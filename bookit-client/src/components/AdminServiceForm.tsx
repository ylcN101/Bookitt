import { MdEdit } from "react-icons/md"
import { useTranslation } from "react-i18next"
import React, { ChangeEvent, useRef } from "react"

interface SelectedService {
	serviceImage: string
	name: string
	price: string
	duration: string
}

interface AdminServiceFormProps {
	selectedService: SelectedService
	setSelectedService: (selectedService: SelectedService) => void
	handleEditClick: () => void
	handleFormSubmit: () => void
	nameRef: React.RefObject<HTMLInputElement>
	priceRef: React.RefObject<HTMLInputElement>
	imageRef: React.RefObject<HTMLInputElement>
	uploadImage: (e: ChangeEvent<HTMLInputElement>) => void
}

const AdminServiceForm: React.FC<AdminServiceFormProps> = ({
	selectedService,
	setSelectedService,
	handleEditClick,
	handleFormSubmit,
	nameRef,
	priceRef,
	imageRef,
	uploadImage,
}) => {
	const { t } = useTranslation(["admin"])

	return (
		<>
			<form className="flex flex-col justify-between w-full">
				<div className="flex justify-center mt-6 relative">
					<img
						src={selectedService.serviceImage}
						alt="service"
						className="w-28 h-28 object-fill"
						onClick={() => imageRef.current?.click()}
					/>
					<input
						type="file"
						className="hidden"
						ref={imageRef}
						onChange={uploadImage}
					/>
				</div>

				<div className="mt-6 flex flex-col w-full text-[#3C3744]">
					<label className="text-sm font-bold ">{t("service-name")}</label>
					<div className="flex justify-between">
						<input
							type="text"
							className="text-md bg-inherit leading-6 font-bold text-[#3C3744] w-full outline-none"
							value={selectedService.name}
							onChange={(e) =>
								setSelectedService({
									...selectedService,
									name: e.target.value,
								})
							}
							ref={nameRef}
						/>
						<MdEdit
							onClick={handleEditClick}
							size={20}
							className="text-[#3C3744] cursor-pointer"
						/>
					</div>
				</div>
				<div className="border border-gray-200 mt-1 w-full"></div>
				<div className="mt-6 flex flex-col w-full text-[#3C3744]">
					<label className="text-sm font-bold ">{t("service-price")}</label>
					<div className="flex justify-between">
						<input
							type="number"
							className="text-md bg-inherit leading-6 font-bold text-[#3C3744] w-full outline-none"
							value={selectedService.price}
							onChange={(e) =>
								setSelectedService({
									...selectedService,
									price: e.target.value,
								})
							}
							ref={priceRef}
						/>
						<MdEdit
							onClick={handleEditClick}
							size={20}
							className="text-[#3C3744] cursor-pointer"
						/>
					</div>
				</div>
			</form>
			<div className="border border-gray-200 mt-1 w-full"></div>
			<div className="mt-6 flex flex-col w-full text-gray-400">
				<h2 className="text-sm font-bold text-gray-400">
					{t("service-duration")}
				</h2>
				<h2 className="text-md leading-6 font-bold w-full outline-none">
					{t("minutes")} {selectedService.duration}
				</h2>
			</div>
			<div className="border border-gray-200 mt-1 w-full"></div>

			<div className="flex justify-center mt-6">
				<button
					onClick={handleFormSubmit}
					className="bg-[#546CC9] text-white rounded-md px-4 py-2 mx-2"
				>
					{t("save")}
				</button>
			</div>
		</>
	)
}

export default AdminServiceForm
