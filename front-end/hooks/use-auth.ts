// hooks/use-auth.ts
'use client'

import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

// Fetcher for getting the current session status
const userFetcher = (url: string) => fetch(url).then((res) => res.ok ? res.json() : null)

// Mutation fetcher for sending login credentials
async function loginRequest(url: string, { arg }: { arg: Record<string, string> }) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(arg),
    credentials: 'include'
  })
  
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Login failed')
  }
  return res.json()
}

export function useAuth() {
  // 1. Hook to keep track of global session state
  const { data: user, mutate } = useSWR('http://localhost:8080/api/v1/auth/login', userFetcher)

  // 2. Hook to handle the POST logic on submit
  const { trigger, isMutating, error } = useSWRMutation('http://localhost:8080/api/v1/auth/login', loginRequest, {
    onSuccess: (data) => {
      // Direct cache update with the new user details without a re-fetch
      mutate(data, false) 
    }
  })

  return {
    user,
    login: trigger,
    isLoggingIn: isMutating,
    loginError: error,
  }
}
