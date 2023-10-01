function Button({ children }) {
  return (
    <button className="rounded-full bg-colorBrand px-4 py-2 text-lg font-semibold text-white duration-200 hover:opacity-[0.8]">
      {children}
    </button>
  );
}

export default Button;
