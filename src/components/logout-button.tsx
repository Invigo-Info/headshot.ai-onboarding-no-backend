'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { signOutAction } from '@/actions/auth-actions'

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    await signOutAction()
    router.push('/login')
  }

  return <Button onClick={logout}>Logout</Button>
}
