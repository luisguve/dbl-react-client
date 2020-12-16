import { useTranslation } from "react-i18next";
import { useState } from "react";
import srvAddr from "./../../../data/srv";

const ratings = [5, 4, 3, 2, 1];

const goodReview = "Good review";
const badReview = "Bad review";

const Presentation = (props) => {
	const { t } = useTranslation();
	const [ typeOfReview, setTypeOfReview ] = useState(goodReview);
	const [ comment, setComment ] = useState("");
	const [ defects, setDefects ] = useState([]);
	const [ rating, setRating ] = useState(ratings[0]);
	const [ errMsg, setErrMsg ] = useState("");

	if (!props.billInfo) {
		return null;
	}
	if (!props.isLoggedIn) {
		return <h1 className="text-3xl sm:text-5xl-">{t("reviewForm.askForLogin")}</h1>;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (typeOfReview === badReview && !defects.length) {
			alert(t("reviewForm.indicateDefects"));
			return;
		}
		const now = new Date().toLocaleString();
		const data = {
			billInfo: props.billInfo,
			review: {
				date: now,
				comment,
				defects,
				rating
			},
			typeOfReview
		};
		// Send request to post review.
		fetch(srvAddr + '/review', {
			method: "POST",
			headers: {"Content-type": "application/json; charset=UTF-8"},
			credentials: "include",
			body: JSON.stringify(data)
		})
		.then(async res => {
			if (res.ok) {
				alert("Review sent");
			} else {
				if (res.status === 409) {
					setErrMsg(t("reviewForm.alreadyReviewed"));
				} else {
					setErrMsg(await res.text());
				}
			}
		}).catch(err => {
			setErrMsg(err);
			console.log("Request failed:", err);
		});
	};

	const onChangeType = e => setTypeOfReview(e.target.value);
	const handleChangeRating = e => setRating(e.target.value);
	const handleChangeComment = e => setComment(e.target.value);
	const handleChangeDefects = e => {
		let found = false;
		let idx;
		for (idx = 0; idx < defects.length; idx++) {
			if (defects[idx] === e.target.value) {
				found = true;
				break;
			}
		}
		if (!found) {
			setDefects([...defects, e.target.value]);
		} else {
			const result = defects.slice(0, idx);
			result.concat(defects.slice(idx + 1));
			setDefects(result);
		}
	};

	const typeInput = (
		<div className="flex items-center justify-around mb-2.5">
			<label className="text-xl">
				<input type="radio" value={goodReview} onChange={onChangeType}
				 className="mr-1.5" checked={typeOfReview === goodReview} />
				{t("reviewForm.isGenuine")}
			</label>
			<label className="text-xl">
				<input type="radio" value={badReview} onChange={onChangeType}
				className="mr-1.5" checked={typeOfReview === badReview} />
				{t("reviewForm.isCounterfeit")}
			</label>
		</div>
	);
	const commentInput = (
		<div className="flex flex-col items-center">
			<label className="w-full sm:w-3/4 flex flex-col justify-around text-xl">
				{t("reviewForm.comment")}
				<textarea value={comment} onChange={handleChangeComment} />
			</label>
		</div>
	);
	const ratingOptions = ratings.map((rating, idx) => {
		return <option key={idx} value={rating}>{rating} / 5</option>
	});
	const defectOptions = props.possibleDefects.map((defect, idx) => {
		let checked = false;
		for (const d of defects) {
			if (d === defect.key) {
				checked = true;
			}
		}
		const samples = defect.img.map((img, idx) => {
			const src = `images/${img}`;
			return <img className="my-1" alt="" src={src} key={idx}/>;
		})
		const wrapperClass = idx % 2 === 0 ? "border-solid border-2 border-red-300 rounded-lg": "bg-red-50";
		const pClass = "text-left text-xl sm:text-2xl w-3/4 px-5 pb-3";
		return (
			<div className={"my-2.5 " + wrapperClass} key={idx}>
				<h3 className="pt-2.5 text-xl sm:text-3xl">{defect.label}</h3>
				<label className={"pb-2.5 flex flex-col items-center sm:flex-row"}>
					<input type="checkbox" className="mt-4 sm:mt-2 w-1/12"
						onChange={handleChangeDefects} value={defect.key} checked={checked} />
					<div className="flex justify-around w-4/5">
						<div className="flex flex-col items-center justify-around w-1/4">{samples}</div>
						<p className={pClass} dangerouslySetInnerHTML={{__html: defect.desc}} />
					</div>
				</label>
			</div>
		)
	});
	const reviewInput = typeOfReview === goodReview ? (
		<div className="flex flex-col items-center w-full">
			<label className="w-full sm:w-3/4 flex items-center justify-around text-xl">
				{t("reviewForm.billState")}
				<select value={rating} onChange={handleChangeRating}>
				{ ratingOptions }
				</select>
			</label>
		</div>
	) : (
		<div className="flex flex-col mt-4">
			<h2 className="text-2xl sm:text-4xl">{t("reviewForm.defectsHeading")}</h2>
			{ defectOptions }
		</div>
	);

	return (
		<div className="flex flex-col items-center w-full">
			<div className="w-full sm:w-4/5 flex flex-col">
				<h1>{t("reviewForm.label")}</h1>
				<form className="flex flex-col" onSubmit={handleSubmit}>
					{typeInput}
					{reviewInput}
					{commentInput}
					<button className="w-full sm:w-3/4 self-center mt-2" type="submit">{t("reviewForm.submit")}</button>
				</form>
				{
					errMsg &&
					<div className="self-center border-solid border-2 border-red-300 rounded-lg p-2.5">
						<p>{errMsg}</p>
					</div>
				}
			</div>
		</div>
	);
};

export default Presentation;