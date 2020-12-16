import { useTranslation } from 'react-i18next';
import React from "react";

const languages = [
	{code: "en-US", label: "English"},
	{code: "es-ES", label: "Español"}
];

const LocaleSwitcher = (props) => {
	const { i18n } = useTranslation();
	const switchLang = (e) => {
		i18n.changeLanguage(e.target.value);
	}

	return (
	<div className="mt-2.5 flex justify-center">
		<select value={props.lang} onChange={switchLang} className="m-4 mt-0">
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