import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from './useAuthContext'
import { useMutation } from '@tanstack/react-query'
import { httpService } from '../utils/http.service'

export const useLogin = () => {
  const navigate = useNavigate()
  const { dispatch } = useAuthContext()
  const [error, setError] = useState(null)

  const loginMutation = useMutation((data) => httpService.post('auth/login', data), {
    onSuccess: (res) => {
      const user = res
      dispatch({ type: 'LOGIN', payload: user })
      const miniUser = {
        id: user._id,
        shopId: user.shopId,
        uid: user.uid,
        isAdmin: user.isAdmin,
      }
      console.log(miniUser)
      localStorage.setItem('user', JSON.stringify(miniUser))
      //update state

      if (user.isAdmin) {
        navigate(`/admin/${user.shopId}`)
      } else {
        navigate(`/${user.shopId}`)
      }
    },
    onError: (err) => {
      setError(err.response)
    },
  })

  return { loginMutation, error }
}
