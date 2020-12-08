import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import srvAddr from "./../../../data/srv";
import denominations from "./../../../data/series";
import designYears from "./../../../data/design";
import "./query.css";

const Presentation = (props) => {
	const { t } = useTranslation();
	const [ serialNumber, setSerialNumber ] = useState("MK 92243965 C");
	const [ denom, setDenom ] = useState(denominations[2]);
	const [ series, setSeries ] = useState(denominations[2].series[0]);
	const [ queryErr, setQueryErr ] = useState("");
	useEffect(() => {
		handleSubmit();
	}, []);
	useEffect(() => {
		const value = denom.value;
		if (!value || !series) {
			return;
		}
		// Update security features' language.
		const designYear = designYears[value][series];
		const featuresKey = `usd-${value}.${designYear}`;
		const secFeatures = t(featuresKey);
		props.listFeatures(value, series, secFeatures);
	}, [t]);

	const handleSerialNumber = (e) => {
		setSerialNumber(e.target.value.toUpperCase());
	};

	const handleDenom = (e) => {
		let idx;
		for (idx = denominations.length - 1; idx >= 0; idx--) {
			if (denominations[idx].value === parseInt(e.target.value)) {
				break;
			}
		}
		setDenom(denominations[idx]);
		setSeries(denominations[idx].series[0]);
	};

	const handleSeries = (e) => {
		setSeries(e.target.value);
	};

	const handleSubmit = () => {
		const value = denom.value;
		const designYear = designYears[value][series];
		const featuresKey = `usd-${value}.${designYear}`;
		const secFeatures = t(featuresKey);
		props.listFeatures(value, series, secFeatures);
		const sn = serialNumber;
		if (sn === "") {
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
					props.listDefects(result.defects);
				}
			} else {
				setQueryErr(await res.text());
			}
		}).catch(err => {
			console.log("Request failed:", err);
			setQueryErr(err);
		});
	}

	return (
		<div className="query-container uppercase">
			<h1>{t("query.label")}</h1>
			<h2 className="tip" dangerouslySetInnerHTML={{ __html: t("query.tip") }} />
			<form onSubmit={e => {e.preventDefault(); handleSubmit();}}>
				<div className="inputs">
					<label>
						{t("query.serialNumber")}
						<input type="text" value={serialNumber} onInput={handleSerialNumber} />
					</label>
					<label>
						{t("query.value")}
						<select value={denom.value} onChange={handleDenom}>
							{
								denominations.map((denom, idx) => {
									return <option value={denom.value} key={idx}>{denom.value}</option>
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
				<button type="submit" className="uppercase">{t("query.submit")}</button>
			</form>
			{
				queryErr &&
				<div className="get-err-box">
					<p>{queryErr}</p>
				</div>
			}
		</div>
	);
}

export default Presentation;