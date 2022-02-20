const translations: Record<string, string> = {
    'Ю-В': 'S-E',
    'Южный': 'East',
    'Ю-З': 'E-W',
    'Западный': 'West',
    'Переменный': 'Rotative',
    'С-З': 'N-W',
    'Северный': 'North',
    'С-В': 'S-E',
    'Восточный': 'East'
};

export let translationsCode: Record<string, number> = {};
export let translationsStrings: Record<number, string> = {};

Object.keys(translations).forEach((tName, i) => {
  translationsCode = {...translationsCode, [tName]: i}
  translationsStrings = {...translationsStrings, [i]: tName}
});

export default translations;