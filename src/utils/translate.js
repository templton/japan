const LANGUAGE_EN = 'en';
const LANGUAGE_RU = 'ru';

export const translate = (data, language = LANGUAGE_EN) => {
    return data && data[language] ? data[language] : null;
}
