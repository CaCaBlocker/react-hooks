import React, { useState } from "react";

type THEME = "light" | "dark";

export const ThemeContext = React.createContext<THEME>("light");

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<THEME>("light");
  return (
    <ThemeContext.Provider value={theme}>
      <div className={"container " + theme}>
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme}
        </button>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
