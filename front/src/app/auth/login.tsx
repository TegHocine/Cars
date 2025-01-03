import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { login } from "@/apis/auth.api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { loginSchema, LoginType } from "@/types/auth.type"
import { useMutation } from "@tanstack/react-query"
import { Link, useNavigate } from "react-router-dom"

export function LoginPage() {
  const navigate = useNavigate()
  const { onLogin } = useAuth()
  const { toast } = useToast()
  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onError: () =>
      toast({
        title: "Login Failed",
        description:
          "Invalid email or password. Please check your credentials and try again.",
        variant: "destructive",
      }),
    onSuccess: (data) => {
      toast({
        title: "Login Successful",
        description: "Welcome back! You have successfully logged in.",
      })
      onLogin(data)
      navigate("/")
    },
  })

  function onSubmit(values: LoginType) {
    mutate(values)
  }

  return (
    <div className='flex flex-col min-h-screen h-full w-full items-center justify-center px-4'>
      <Card className='mx-auto max-w-lg w-full'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8'>
              <div className='grid gap-4'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel htmlFor='email'>Email</FormLabel>
                      <FormControl>
                        <Input
                          id='email'
                          placeholder='johndoe@mail.com'
                          type='email'
                          autoComplete='email'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <div className='flex justify-between items-center'>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                      </div>
                      <FormControl>
                        <PasswordInput
                          id='password'
                          placeholder='******'
                          autoComplete='current-password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type='submit'
                  className='w-full'
                  disabled={isPending}>
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <div className='mt-4 text-center text-sm'>
            Don&apos;t have an account?{" "}
            <Link
              to='/signup'
              className='underline'>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
