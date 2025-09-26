import { restApiFetcher } from '../fetcher'

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  edition_count?: number;
  subject?: string[];
}

export interface OpenLibraryResponse {
  docs: Book[];
  numFound: number;
  start: number;
}

export const openLibraryService = {
  async getPopularBooks(): Promise<Book[]> {
    try {
      const searchTopics = [
        'fiction',
        'science',
        'history',
        'fantasy',
        'mystery',
        'romance',
        'biography',
        'technology',
        'adventure',
        'classic'
      ];
      
      const topicIndex = Math.floor(Date.now() / 30000) % searchTopics.length;
      const currentTopic = searchTopics[topicIndex];
      
      const data: OpenLibraryResponse = await restApiFetcher
        .get(`search.json?subject=${currentTopic}&sort=rating desc&limit=10&fields=key,title,author_name,cover_i,first_publish_year,edition_count,subject`, {
          prefixUrl: 'https://openlibrary.org/'
        })
        .json();

      return data.docs;
    } catch (error) {
      throw error;
    }
  },

  async searchBooks(query: string): Promise<Book[]> {
    try {
      const data: OpenLibraryResponse = await restApiFetcher
        .get(`search.json?title=${encodeURIComponent(query)}&limit=20&fields=key,title,author_name,cover_i,first_publish_year,edition_count,subject`, {
          prefixUrl: 'https://openlibrary.org/'
        })
        .json();

      return data.docs;
    } catch (error) {
      throw error;
    }
  },

  async getBookByKey(key: string): Promise<Book | null> {
    try {
      const data: OpenLibraryResponse = await restApiFetcher
        .get(`search.json?q=key:${key}&fields=key,title,author_name,cover_i,first_publish_year,edition_count,subject`, {
          prefixUrl: 'https://openlibrary.org/'
        })
        .json();

      return data.docs[0] || null;
    } catch (error) {
      throw error;
    }
  },

  getCoverImageUrl(coverId: number, size: 'S' | 'M' | 'L' = 'M'): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  },

  createSlugFromTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  },

  createSlugFromKey(key: string): string {
    return key.replace('/works/', '').replace('/books/', '');
  }
};
