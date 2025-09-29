import { HydrationBoundary } from "@tanstack/react-query";
import { dehydrate } from "@tanstack/react-query";
import { FC } from "react";
import { HomeModule } from "@/app/(client)/modules/home";
import { getQueryClient } from "@/pkg/libraries/rest-api/service/rest-api.service";
import { popularBooksQueryOptions } from "@/pkg/libraries/rest-api/service/book.queries";

// cache
export const dynamic = 'force-static'
export const revalidate = 120

// component
const Page: FC = async () => {

  const clientQuery = getQueryClient()
  await clientQuery.prefetchQuery(popularBooksQueryOptions())

  
  return (
    <HydrationBoundary state={dehydrate(clientQuery)}>
      <HomeModule />
    </HydrationBoundary>
  );
}
export default Page