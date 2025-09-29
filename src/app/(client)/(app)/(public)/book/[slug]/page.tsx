import { type FC } from 'react';
import { notFound } from 'next/navigation';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { getQueryClient } from '@/pkg/libraries/rest-api/service/rest-api.service';
import { bookDetailQueryOptions } from '@/pkg/libraries/rest-api/service/book.queries';
import { openLibraryService } from '@/pkg/libraries/rest-api/service/openlibrary.service';
import { BookDetailModule } from '@/app/(client)/modules/book-detail';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const books = await openLibraryService.getPopularBooks();
    
    return books.map((book) => {
      const bookKey = openLibraryService.createSlugFromKey(book.key);
      const titleSlug = openLibraryService.createSlugFromTitle(book.title);
      
      return {
        slug: `${bookKey}-${titleSlug}`,
      };
    });
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

// interface
interface IProps {
  params: Promise<{ slug: string }>;
}

// component
const BookDetailPage: FC<Readonly<IProps>> = async ({ params }) => {
  const { slug } = await params;
  
  const bookKey = slug.split('-')[0];
  const fullKey = `/works/${bookKey}`;

  try {
    const queryClient = getQueryClient();
    
    await queryClient.prefetchQuery(bookDetailQueryOptions(fullKey));
    const book = queryClient.getQueryData(bookDetailQueryOptions(fullKey).queryKey);
    
    if (!book) {
      notFound();
    }
    // return
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <BookDetailModule bookKey={fullKey} />
      </HydrationBoundary>
    );
  } catch {
    notFound();
  }
};
export default BookDetailPage;