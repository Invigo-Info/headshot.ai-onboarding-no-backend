"use client"
import { signOutAction } from '@/actions/auth-actions'
import React from 'react'

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOutAction()
  }

  return (
    <span onClick={() => handleLogout()} className='inline-block w-full cursor-pointer text-destructive'>Log out</span>
  )
}

export default LogoutButton