// app/src/pages/Account.tsx
import React from 'react'

export default function Account() {
  const isLoggedIn = false // replace with real auth check

  return (
    <main className="container mx-auto px-4 py-8">
      {isLoggedIn ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Your Account</h1>
          <p>Welcome back! Here are your account details and recent orders.</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold mb-4">Account</h1>
          <p>You are not logged in.</p>
          <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded">
            Log In
          </button>
        </>
      )}
    </main>
  )
}
