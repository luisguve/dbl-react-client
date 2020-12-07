import { useTranslation } from 'react-i18next';
import "./../App.css";

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
	<div className="choose-locale">
		<div className="select">
			<select value={props.lang} onChange={switchLang}>
			{
				languages.map((lang, idx) => {
					return <option value={lang.code} key={idx}>{lang.label}</option>
				})
			}
			</select>
		</div>
	</div>
	);
}

export default LocaleSwitcher;