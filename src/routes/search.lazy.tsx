import { PageContainer } from '@app/components'
import { SearchPage } from '@app/features/search'
import { createLazyFileRoute } from '@tanstack/react-router'

function SearchPageComponent() {
  return (
    <PageContainer>
      <SearchPage />
    </PageContainer>
  )
}
export const Route = createLazyFileRoute('/search')({
  component: SearchPageComponent,
})
