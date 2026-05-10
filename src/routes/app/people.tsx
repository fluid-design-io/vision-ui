import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/people')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/app/people"!</div>
}
