import Link from "next/link";

export default function Home() {
  const projects = [
    {
      title: "UsersPosts",
      description:
        "Explore user posts management with Drizzle ORM and Supabase",
      href: "/usersposts",
      icon: "📝",
    },
    {
      title: "Notes",
      description:
        "Simple note-taking app showcasing Drizzle's CRUD operations",
      href: "/notes",
      icon: "📓",
    },
    {
      title: "Profiles",
      description: "User profiles system with relations using Drizzle ORM",
      href: "/profiles",
      icon: "👤",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-91px)] bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="min-w-[320px] max-w-[1440px] mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
            Drizzle ORM + Supabase + Next.js
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Explore practical examples of Drizzle ORM implementation with
            Supabase in Next.js applications
          </p>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              "Next.js",
              "Drizzle ORM",
              "Supabase",
              "TypeScript",
              "Tailwind CSS",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-gray-700 rounded-full text-gray-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={project.href}
              className="block group"
            >
              <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 h-full">
                <div className="text-4xl mb-4">{project.icon}</div>
                <h2 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-gray-400 text-sm">{project.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-10 text-center text-gray-400 text-sm">
          <p>Built to demonstrate Drizzle ORM capabilities</p>
        </footer>
      </main>
    </div>
  );
}
