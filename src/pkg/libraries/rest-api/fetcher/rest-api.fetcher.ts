import ky, { type KyInstance } from 'ky'

import { envClient } from '@/config/env'

// fetcher for internal API
export const restApiFetcher: KyInstance = ky.create({
  prefixUrl: `${envClient.NEXT_PUBLIC_CLIENT_API_URL}`,
  credentials: 'include',
  throwHttpErrors: false,
})

export const externalApiFetcher: KyInstance = ky.create({
  credentials: 'omit',
  throwHttpErrors: false,
})
