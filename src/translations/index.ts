const translations: Record<string, string> = {
  // S-E
  'Ю-В': '135',
  // South 
  'Южный': '180',
  // S-W
  'Ю-З': '225',
  // West 
  'Западный': '270',
  // just change to С-В
  // N-E
  'Переменный': '45',
  // N-W
  'С-З': '315',
  // North
  'Северный': '360',
  // N-E
  'С-В': '45',
  // East 
  'Восточный': '90'
};

export let translationsCode: Record<string, number> = {};
export let translationsStrings: Record<number, string> = {};

Object.keys(translations).forEach((tName, i) => {
translationsCode = {...translationsCode, [tName]: i}
translationsStrings = {...translationsStrings, [i]: tName}
});

export default translations;