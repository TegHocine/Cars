"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Login() {
  const googleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google"
  }

  return (
    <div className='flex flex-col min-h-screen h-full w-full items-center justify-center px-4'>
      <Card className='mx-auto max-w-sm w-full'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            variant='outline'
            className='w-full'
            onClick={googleLogin}>
            Login with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
