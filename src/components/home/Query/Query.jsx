import { useTranslation } from "react-i18next";
import { useState } from "react";
import srvAddr from "./../../../data/srv";
import denominations from "./../../../data/series";

const Presentation = (props) => {
	let [ serialNumber, setSerialNumber ] = useState("MK 92243965 C");
	let [ denom, setDenom ] = useState(denominations[2]);
	let [ series, setSeries ] = useState("");

	const handleSerialNumber = (e) => {
		setSerialNumber(e.target.value.toUpperCase());
	};

	const handleDenom = (e) => {
		setDenom(e.target.value);
		setSeries(denom.series[0]);
	};

	const handleSeries = (e) => {
		setSeries(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const value = denom.value;
		props.listFeatures(value, series);
		const sn = serialNumber;
		if (sn == "") {
			// This is a query only for security features.
			props.clearReview();
			return;
		}
		// Send request to get review.
		fetch(srvAddr + `/review?sn=${sn}&value=${value}&series=${series}`, {
			method: "GET",
			headers: {"Content-type": "application/json; charset=UTF-8"},
			credentials: "include"
		}).then(async res => {
			if (res.ok) {
				const result = await res.json();
				props.listReview(result);

				if (result.defects) {
					props.listDefects(defects);
				}
			} else {
				props.gotErr(await res.text());
			}
		}).catch(err => {
			props.gotErr(err);
			console.log("Request failed:", err);
		});
	}

	const { t } = useTranslation();
	return (
		<div className="query-container uppercase">
			<h1>{t("query.label")}</h1>
			<h2 className="tip" dangerouslySetInnerHtml={{ __html: t("query.tip") }} />
			<form onSubmit={handleSubmit}>
				<div className="inputs">
					<label>
						{t("query.serialNumber")}
						<input type="text" value={serialNumber} onInput={handleSerialNumber} />
					</label>
					<label>
						{t("query.value")}
						<select value={denom} onChange={handleDenom}>
							{
								denominations.map((denomination, idx) => {
									return <option value={denomination} key={idx}>{denomination.value}</option>
								})
							}
						</select>
					</label>
					<label>
						{t("query.series")}
						<select value={series} onChange={handleSeries}>
							{
								denom.series.map((series, idx) => {
									return <option value={series} key={idx}>{series}</option>
								})
							}
						</select>
					</label>
				</div>
				<button type=submit className="uppercase">{t("query.submit")}</button>
			</form>
		</div>
		{
			props.getErrMsg &&
			<div className="get-err-box">
				<p>{props.getErrMsg}</p>
			</div>
		}
	);
}

export default Presentation;