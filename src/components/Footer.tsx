export default function Footer() {
  return (
    <>
      <footer className="p-2 flex flex-row justify-center items-center gap-4 sm:gap-8 text-xs sm:text-sm border-t-2 border-solid border-gray-800 bg-[#b0bbba] text-blue-900 w-full max-w-[1440px]">
        <a
          href="https://github.com/traez/drizzle3orm-supabase-nextjs"
          target="_blank"
          rel="noopener noreferrer"
          className=" hover:underline hover:text-blue-900 font-bold text-black"
        >
          Source Code
        </a>
        <b>
          <span>© {new Date().getFullYear()}</span> Trae Zeeofor
        </b>
      </footer>
    </>
  );
}
