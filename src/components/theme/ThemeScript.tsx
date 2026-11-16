export const THEME_STORAGE_KEY = 'theme'

/**
 * Sets data-theme on <html> while the page is still parsing, so the saved or
 * system theme is applied before the first paint (no light/dark flash).
 */
const script = `(function(){try{var s=localStorage.getItem('${THEME_STORAGE_KEY}');var t=s==='light'||s==='dark'?s:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />
}
