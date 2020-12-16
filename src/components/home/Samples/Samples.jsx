const Presentation = (props) => {
	if (!props.front) {
		return null;
	}
	const front = {
		src: `images/${props.front}`,
		alt: `front of ${props.value} series ${props.series} note`
	};
	const back = {
		src: `images/${props.back}`,
		alt: `back of ${props.value} series ${props.series} note`
	};
	return (
		<div className="flex flex-col items-center">
			<div className="mt-4 flex flex-col items-center w-full sm:w-4/5">
				<img className="max-w-full mb-3" src={front.src} alt={front.alt} />
				<img className="max-w-full" src={back.src} alt={back.alt} />
			</div>
		</div>
	);
}

export default Presentation;