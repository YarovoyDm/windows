import translations from "Components/I18n/translations";
import { useAppDispatch, useAppSelector } from "Store/index";
import { selectSystemLanguage } from "Store/selectors/System";
import { changeSystemLanguage } from "Store/slices/System";

const useLanguage = () => {
    const dispatch = useAppDispatch();
    const language = useAppSelector(selectSystemLanguage);

    const changeLanguage = (newLanguage: keyof typeof translations) => {
        dispatch(changeSystemLanguage(newLanguage));
    };

    const translate = (key: keyof typeof translations.en) =>
        translations[language as keyof typeof translations][key] || key;

    return { translate, changeLanguage };
};

export default useLanguage;
