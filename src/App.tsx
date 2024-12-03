import { Fragment } from 'react/jsx-runtime'
import useRouteElements from './useRouter'

export default function App(): JSX.Element {
  const routeElements = useRouteElements()
  return <Fragment>{routeElements}</Fragment>
}
