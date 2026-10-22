# Stack My Ticket

Check my ticket in Tanstack + react

## Reasoning

- Greater composition over larger codebase
- Greater ecosystem

### List

- Layout
  - Sidebar Layout
    - [x] Sidebar with vertical nav

  - Header Layout
    - [ ] Header with nav for desktop
    - [ ] Drawer for mobile
  - [ ] Search bar
  - [ ] Breadcrumbs

- Pages
  - [ ] Search
  - [ ] Tickets
    - [ ] Table view
    - [ ] Kanban view
  - [ ] Single ticket // Shared by search?item=$item and /$item pages
    - [ ] "Chat" view
  - [ ] Create
    - [ ] editing
    - [ ] marketo
    - [ ] PIM
    - [ ] Analytics
    - [ ] Translation
  - [ ] Settings / Preferences

- Components
  - [x] Theme switcher
  - [ ] Layout switcher
  - [ ] Color scheme switcher // nice to have

- Tanstack DB
```ts
// records-store.ts
import {
  createCollection,
  createTransaction,
  localStorageCollectionOptions,
} from '@tanstack/react-db'

export type RecordItem = {
  id: string
  name: string
  status: 'active' | 'inactive'
}

type RecordsCacheMeta = {
  id: 'records'
  fetchedAt: number
}

export const recordsCollection = createCollection(
  localStorageCollectionOptions<RecordItem, string>({
    id: 'records',
    storageKey: 'my-app:records',
    getKey: (record) => record.id,
  }),
)

const recordsCacheMetaCollection = createCollection(
  localStorageCollectionOptions<RecordsCacheMeta, 'records'>({
    id: 'records-cache-meta',
    storageKey: 'my-app:records-cache-meta',
    getKey: (meta) => meta.id,
  }),
)

export const TEN_MINUTES = 10 * 60 * 1000

export function isRecordsCacheFresh() {
  const fetchedAt = recordsCacheMetaCollection.get('records')?.fetchedAt ?? 0

  return (
    recordsCollection.toArray.length > 0 &&
    Date.now() - fetchedAt < TEN_MINUTES
  )
}

export function getCachedRecords() {
  return recordsCollection.toArray
}

export async function replaceAllRecords(nextRecords: Array<RecordItem>) {
  const tx = createTransaction({
    mutationFn: async ({ transaction }) => {
      await recordsCollection.utils.acceptMutations(transaction)
    },
  })

  tx.mutate(() => {
    for (const record of recordsCollection.toArray) {
      recordsCollection.delete(record.id)
    }

    for (const record of nextRecords) {
      recordsCollection.insert(record)
    }
  })

  await tx.commit()

  const currentMeta = recordsCacheMetaCollection.get('records')

  if (currentMeta) {
    recordsCacheMetaCollection.update('records', (draft) => {
      draft.fetchedAt = Date.now()
    })
  } else {
    recordsCacheMetaCollection.insert({
      id: 'records',
      fetchedAt: Date.now(),
    })
  }
}

export function clearRecordsCache() {
  recordsCollection.utils.clearStorage()
  recordsCacheMetaCollection.utils.clearStorage()
}
```


```ts
// routes/records.tsx
import { Await, createFileRoute } from '@tanstack/react-router'
import {
  getCachedRecords,
  isRecordsCacheFresh,
  replaceAllRecords,
} from '~/stores/records-store'

export const Route = createFileRoute('/records')({
  // Router-memory freshness for navigation within this SPA session
  staleTime: 10 * 60 * 1000,

  loader: () => {
    const recordsPromise = isRecordsCacheFresh()
      ? Promise.resolve(getCachedRecords())
      : fetch('/api/records')
          .then(async (response) => {
            if (!response.ok) {
              throw new Error('Failed to load records')
            }

            return response.json() as Promise<Array<RecordItem>>
          })
          .then(async (records) => {
            await replaceAllRecords(records)
            return records
          })

    // Keep this promise unresolved: <Await> owns the loading state.
    return { recordsPromise }
  },

  component: RecordsPage,
})

function RecordsPage() {
  const { recordsPromise } = Route.useLoaderData()

  return (
    <Await promise={recordsPromise} fallback={<p>Loading records…</p>}>
      {(records) => <RecordsList records={records} />}
    </Await>
  )
}
```