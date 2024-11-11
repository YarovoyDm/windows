import translations from "Components/I18n/translations";
import { useAppDispatch, useAppSelector } from "Store/index";
import { selectSystemLanguage } from "Store/selectors/System";
import { changeSystemLanguage } from "Store/slices/System";

type Language = keyof typeof translations;

const useLanguage = () => {
    const dispatch = useAppDispatch();
    const language = useAppSelector(selectSystemLanguage) as Language;

    const changeLanguage = (newLanguage: keyof typeof translations) => {
        dispatch(changeSystemLanguage(newLanguage));
    };

    const translate = (key: keyof (typeof translations)["en"]) =>
        translations[language][key] || key;

    return { translate, changeLanguage };
};

export default useLanguage;
