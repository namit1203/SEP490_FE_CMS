import { Method } from 'axios'

export const METHOD_TYPE: { [key: string]: Method } = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
}
