import { useEffect, useState } from "react";

const availableThemes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "darkCupcake",
  "darkBumblebee",
  "darkEmerald",
  "darkCorporate",
  "darkSynthwave",
  "darkRetro",
  "darkCyberpunk",
  "darkValentine",
  "darkHalloween",
  "darkGarden",
  "darkForest",
  "darkAqua",
  "darkLofi",
  "darkPastel",
  "cmyk",
  "black",
  "tailwind",
];

const ThemeSelector = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.setAttribute("data-theme", storedTheme);
  }, []);

  const handleChange = (e) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  return (
    <div className="flex items-center gap-2">
      {/* <label htmlFor="theme-select" className="text-sm font-medium">
        Theme:
      </label> */}
      <select
        id="theme-select"
        value={theme}
        onChange={handleChange}
        className="px-3 py-1 border rounded bg-base-100 text-base-content select focus:border-base-300 focus:outline-transparent"
      >
        {availableThemes.map((themeName) => (
          <option key={themeName} value={themeName}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
