import React from "react";
import { useState } from "react";
import { ReactComponent as LightIcon } from '../icons/light.svg';
import { ReactComponent as DarkIcon } from '../icons/dark.svg';
import Cookies from "js-cookie";

export default function ThemeButton() {
  const themeCookie = Cookies.get('theme');
  const [theme, setTheme] = useState(themeCookie === undefined ? 'dark' : themeCookie);
  document.getElementsByTagName('body')[0].className = `${theme}-theme`;
  function toggleTheme() {
    if (theme === 'light') {
      document.getElementsByTagName('body')[0].className = 'dark-theme';
      setTheme(_theme => 'dark');
      Cookies.set('theme', 'dark', {secure: true, sameSite: 'strict'});
    }
    else if (theme === 'dark') {
      document.getElementsByTagName('body')[0].className = 'light-theme';
      setTheme(_theme => 'light');
      Cookies.set('theme', 'light', {secure: true, sameSite: 'strict'});
    }
  }
  return (
    <button onClick={toggleTheme} className="button icon-button">{theme === 'light' ? <LightIcon /> : <DarkIcon />}</button>
  );
}
