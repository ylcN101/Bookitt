import React from "react";
import { IconType } from "react-icons";
import { FaPlus } from "react-icons/fa";

type FloatingAddButtonProps = {
	Icon?: IconType;
	onClick?: (event: any) => void;
};
export const FloatingAddButton = ({
	Icon = FaPlus,
	onClick = () => {},
}: FloatingAddButtonProps) => (
	<div
		onClick={(event) => onClick(event)}
		className="flex justify-center items-center fixed bottom-20 left-5 w-12 h-12 rounded-full bg-[#546CC9] text-white z-40"
	>
		<Icon className="text-xl" />
	</div>
);
