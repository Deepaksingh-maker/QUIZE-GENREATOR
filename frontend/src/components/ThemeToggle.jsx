import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      className="rounded-lg border px-3 py-1 text-sm dark:border-slate-700 dark:text-slate-100"
    >
      {dark ? '☀ Light' : '🌙 Dark'}
    </button>
  );
};
