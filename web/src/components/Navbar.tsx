'use client';
import { useEffect } from 'react';
import {
  BsFillMoonFill,
  BsFillSunFill,
  BsPlusCircleFill,
} from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5';
import { useAuth, useModal } from '../hooks';

export const NavBar = (): JSX.Element => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const { openModal } = useModal();
  const { signOut } = useAuth();

  /* -------------------------------------------------------------------------- */
  /*                                   EFFECTS                                  */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'dracula';
    setTheme(currentTheme);
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */
  const handleThemeChange = (): void => {
    const currentTheme = localStorage.getItem('theme') || 'dracula';
    const nextTheme = currentTheme === 'dracula' ? 'valentine' : 'dracula';

    localStorage.setItem('theme', nextTheme);

    setTheme(nextTheme);
  };

  const setTheme = (theme: string): void => {
    const htmlElement = document.querySelector('html');
    htmlElement?.setAttribute('data-theme', theme);
  };

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <div className="navbar rounded-box sticky top-3 z-10 flex justify-between bg-base-200 pl-5 pr-10 shadow-xl md:pl-6">
      <a className="btn btn-ghost gap-0 text-lg font-bold normal-case md:text-xl">
        Kaypoh
        <span className="text-custom-red">SG</span>
      </a>
      <div className="flex space-x-3">
        <button
          className="text-2xl hover:text-primary-focus"
          onClick={openModal}
        >
          <BsPlusCircleFill />
        </button>
        <label className="swap swap-rotate hover:text-primary-focus">
          <input type="checkbox" />
          <div
            onClick={handleThemeChange}
            className="swap-on flex items-center justify-center text-lg"
          >
            <BsFillMoonFill />
          </div>
          <div
            className="swap-off flex items-center justify-center text-2xl"
            onClick={handleThemeChange}
          >
            <BsFillSunFill />
          </div>
        </label>
        <button className="text-2xl hover:text-primary-focus" onClick={signOut}>
          <IoLogOut />
        </button>
      </div>
    </div>
  );
};
