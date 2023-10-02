function Button({ children, styles, type = "regular", onClick }) {
  return (
    <button
      className={`${styles} rounded-full ${
        type === "regular" ? "bg-colorBrand" : "bg-[#d1d5db]"
      } px-4 py-2 text-lg font-semibold ${
        type === "regular" ? "text-white" : "text-colorBrand"
      } duration-200 hover:opacity-[0.8]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
