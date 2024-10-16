import { ErrorState, LoadingGrid } from '@app/components'
import { SearchPage } from '@app/features/search'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/search')({
  component: SearchPage,
  errorComponent: ({ error }) => (
    <ErrorState error={error}></ErrorState>
  ),
  pendingComponent: LoadingGrid,
})
