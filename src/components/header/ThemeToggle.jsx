import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../redux/features/themeSlice";
import { useEffect } from "react";

function ThemeToggle() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div
      className="cursor-pointer bg-red-400 p-[10px]"
      onClick={() => dispatch(toggleTheme())}
    >
      Theme
    </div>
  );
}

export default ThemeToggle;
