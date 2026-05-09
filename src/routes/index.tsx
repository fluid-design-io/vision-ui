import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col flex-1 justify-center px-4 py-8 text-center">
      <h1 className="font-medium text-xl mb-4">Fumadocs on Tanstack Start.</h1>
      <Link
        to="/app"
        className="px-3 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm mx-auto"
      >
        Open App
      </Link>
    </div>
  );
}
