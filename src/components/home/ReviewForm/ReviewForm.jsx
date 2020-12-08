import { useTranslation } from "react-i18next";
import { useState } from "react";
import srvAddr from "./../../../data/srv";
import "./review_form.css";

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
		return <h1>{t("reviewForm.askForLogin")}</h1>;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
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

	const commentInput = (
		<div className="container">
			<div className="row row-70">
				<label className="column">
					{t("reviewForm.comment")}
					<textarea value={comment} onChange={handleChangeComment} />
				</label>
				<button type="submit">{t("reviewForm.submit")}</button>
			</div>
		</div>
	);
	const typeInput = (
		<div className="oneline">
			<label>
				<input type="radio" value={goodReview} onChange={onChangeType}
				checked={typeOfReview === goodReview} />
				{t("reviewForm.isGenuine")}
			</label>
			<label>
				<input type="radio" value={badReview} onChange={onChangeType}
				checked={typeOfReview === badReview} />
				{t("reviewForm.isCounterfeit")}
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
			const src = `images/${img}`
			return <img alt="" src={src} key={idx}/>
		})
		const className = "defect " + idx % 2 === 0 ? "even": "odd";
		return (
			<div className={className} key={idx}>
				<h3>{defect.label}</h3>
				<label>
					<input type="checkbox" onChange={handleChangeDefects}
						value={defect.key} checked={checked} />
					<div className="desc">
						<div className="samples">{samples}</div>
						<p dangerouslySetInnerHTML={{__html: defect.desc}} />
					</div>
				</label>
			</div>
		)
	});
	const reviewInput = typeOfReview === goodReview ? (
		<div className="container">
			<div className="row row-70">
				<label>
					{t("reviewForm.billState")}
					<select value={rating} onChange={handleChangeRating}>
					{ ratingOptions }
					</select>
				</label>
			</div>
		</div>
	) : (
		<div className="defects">
			<h2>{t("reviewForm.defectsHeading")}</h2>
			{ defectOptions }
		</div>
	)

	return (
		<div className="container">
			<div className="row row-80">
				<h1>{t("reviewForm.label")}</h1>
				<form onSubmit={handleSubmit}>
					{typeInput}
					{reviewInput}
					{commentInput}
				</form>
				{
					errMsg &&
					<div className="error">
						<p>{errMsg}</p>
					</div>
				}
			</div>
		</div>
	);
};

export default Presentation;