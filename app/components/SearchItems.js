import routes from '../constants/routes';

function isCurrentRoute(route) {
  return (location.pathname) === route ? "primary" : "default";
}

export const BUTTONS = [
  {name: '设置', route: routes.CONFIG},
  {name: '单词本', route: routes.HISTORY}
];

BUTTONS.getColor = (route) => {
  isCurrentRoute(route);
};
