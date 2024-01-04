import React, { useState } from "react"
import { EmblaOptionsType } from "embla-carousel-react"
import { IosPickerItem } from "./EmblaCarouselIosPickerItem"

type EmblaCarouselPropType = {
	loop?: boolean
	onSelectedSlideChange: (slideIndex: number) => void
	parentSelectedSlide: number
}

const EmblaCarousel: React.FC<EmblaCarouselPropType> = (
	props: EmblaCarouselPropType
) => {
	const { loop, onSelectedSlideChange } = props

	return (
		<>
			<div className="embla">
				<IosPickerItem
					slideCount={25}
					perspective="left"
					loop={loop}
					slideIndex={props.parentSelectedSlide}
					onSelectedSlideChange={onSelectedSlideChange}
				/>
			</div>
		</>
	)
}

export default EmblaCarousel
