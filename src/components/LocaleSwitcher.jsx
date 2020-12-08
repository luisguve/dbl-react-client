import { useTranslation } from 'react-i18next';
import React from "react";

const languages = [
	{code: "en-US", label: "English"},
	{code: "es-ES", label: "Español"}
];

const containerStyle = {
	marginTop: 10,
	display: "flex",
	justifyContent: "center"
};
const selectStyle = {
	margin: "0 1rem 1rem"
};

const LocaleSwitcher = (props) => {
	const { i18n } = useTranslation();
	const switchLang = (e) => {
		i18n.changeLanguage(e.target.value);
	}

	return (
	<div style={containerStyle}>
		<select value={props.lang} onChange={switchLang} style={selectStyle}>
		{
			languages.map((lang, idx) => {
				return <option value={lang.code} key={idx}>{lang.label}</option>
			})
		}
		</select>
	</div>
	);
}

export default LocaleSwitcher;