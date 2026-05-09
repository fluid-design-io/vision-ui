import Environment from "@/components/environment";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Environment>
      <Outlet />
    </Environment>
  );
}
