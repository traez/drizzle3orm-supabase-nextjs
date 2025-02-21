import Posts from "./components/Posts";

function HomePage() {
  return (
    <main className="bg-slate-900 min-h-screen text-white p-4 flex flex-col items-center pb-20">
      <header className="font-semibold text-2xl">Infinite Scroll Posts</header>

      <Posts />
    </main>
  );
}

export default HomePage;
