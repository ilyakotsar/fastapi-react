import Cookies from "js-cookie";

export default function SetTheme() {
  const themeCookie = Cookies.get('theme');
  if (themeCookie !== undefined) {
    document.getElementsByTagName('body')[0].className = `${themeCookie}-theme`;
  }
  else {
    document.getElementsByTagName('body')[0].className = 'dark-theme';
  }
}
