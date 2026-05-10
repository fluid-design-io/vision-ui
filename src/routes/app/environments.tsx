import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/environments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/environment"!</div>
}
