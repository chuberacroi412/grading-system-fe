import 'tailwindcss/tailwind.css'
import { StateProvider } from '../service/stateProvider'
import {initialState, reducer} from '../service/recuder'
import '../styles/global.css'
import { createContext } from 'react/cjs/react.development'

function MyApp({ Component, pageProps }) {
//   const actionTypes = {
//     SET_USER: "SET_USER",
// };

// export const intialState = {
//     user: null,
// }

// const reducer = (state, action) => {
//   switch(action) {
//       case actionTypes.SET_USER:
//           return {
//               ...state,
//               user: action.user,
//           }
//       default:
//           return state
//   }
// }

  return <StateProvider initialState={initialState} reducer={reducer}>
    <Component {...pageProps} />
  </StateProvider>
}

export default MyApp
