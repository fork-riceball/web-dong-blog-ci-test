/**
 * Checks System preference and LocalStorage if the global theme is set to dark.
 * @returns whether the global theme is set to dark.
 */
export function isGlobalThemeDark() {
  const isSystemPerferDark = !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isLocalStorageDark = localStorage.theme === 'dark';
  return isLocalStorageDark || isSystemPerferDark;
}

/**
 * Returns the current global theme.
 * If a global theme is provided, it is returned.
 * Otherwise, the site default theme ('light') is returned.
 *
 * @param globalTheme - The global theme to be returned.
 * @returns The current global theme.
 */
export function getCurrentGlobalTheme(globalTheme?: string): string {
  const siteDefaultTheme = 'light';
  return globalTheme || siteDefaultTheme;
}

/**
 * Toggles the global theme between 'dark' and 'light'.
 * @param currentTheme - The current theme ('dark' or 'light').
 */
export function toggleGlobalTheme(currentTheme: string) {
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setGlobalTheme(newTheme, currentTheme);
}

/**
 * Sets the global theme for the application.
 * @param newTheme - The new theme to be set.
 * @param oldTheme - (Optional) The old theme to be removed.
 */
export function setGlobalTheme(newTheme: string, oldTheme?: string) {
  localStorage.theme = newTheme;
  const HTMLElement = document.documentElement;

  const themeMap: { [key: string]: { expressiveCodeBlock: string } } = {
    light: {
      expressiveCodeBlock: 'github-light',
    },
    dark: {
      expressiveCodeBlock: 'github-dark',
    },
  };

  oldTheme && HTMLElement.classList.remove(oldTheme);
  HTMLElement.classList.add(newTheme);
  if (themeMap[newTheme]) {
    HTMLElement.dataset.theme = themeMap[newTheme]?.expressiveCodeBlock;
  }
  window.dispatchEvent(new Event('updateTheme'));
}
