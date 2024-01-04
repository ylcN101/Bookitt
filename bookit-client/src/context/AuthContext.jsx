import { createContext, useReducer, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithPhoneNumber } from 'firebase/auth';
import { RecaptchaVerifier } from 'firebase/auth';

export const AuthContext = createContext();

const initialState = {
  user: null,
  isLoggedIn: false,
};

function setUpRecaptha(number) {
  const recaptchaVerifier = new RecaptchaVerifier(
    'recaptcha-container',
    {},
    auth
  );
  recaptchaVerifier.render();

  return signInWithPhoneNumber(auth, number, recaptchaVerifier);
}

// eslint-disable-next-line react-refresh/only-export-components
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch, setUpRecaptha }}>
      {children}
    </AuthContext.Provider>
  );
};
