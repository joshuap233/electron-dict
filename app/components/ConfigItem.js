import route from "../constants/routes";

export const DICT_LIST = [
  {route: route.WEB_DICT, name: "网页字典"},
  {route: route.BRIEF_DICT, name: "简洁字典"},
];

export const TEXTFIELD = [
  {label: '唤醒快捷键', name: 'globalWakeUp'},
  {label: '查词快捷键', name: 'searchWord'}
];

export const CHECKBOX = [
  {checkbox:[{type: 'webDict', name: 'bing',label:'有道词典'}, {type: 'briefDict', name: 'bing',label:'必应词典'}],label:'网页词典'},
  {checkbox:[{type: 'webDict', name: 'youdao',label:'有道词典'}, {type: 'briefDict', name: 'youdao',label:'必应词典'}],label:'简洁词典'}
];
