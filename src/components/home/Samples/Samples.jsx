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
		<div className="container">
			<div className="samples">
				<div className="sample-note">
					<img src={front.src} alt={front.alt} />
				</div>
				<div className="sample-note">
					<img src={back.src} alt={back.alt} />
				</div>
			</div>
		</div>
	);
}

export default Presentation;