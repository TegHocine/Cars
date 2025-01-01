import { signup } from "@/apis/auth.api"
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
import { useToast } from "@/hooks/use-toast"
import { signupSchema, SignupType } from "@/types/auth.type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

export function SignupPage() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const form = useForm<SignupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onError: () =>
      toast({
        title: "Registration Failed",
        description:
          "An error occurred while creating your account. Please try again later.",
        variant: "destructive",
      }),
    onSuccess: () => {
      toast({
        title: "Registration Successful",
        description:
          "Your account has been created successfully. Welcome aboard!",
      })
      navigate("/login")
    },
  })

  function onSubmit(values: SignupType) {
    mutate(values)
  }

  return (
    <div className='flex min-h-screen h-full w-full items-center justify-center px-4'>
      <Card className='mx-auto max-w-lg w-full'>
        <CardHeader>
          <CardTitle className='text-2xl'>Register</CardTitle>
          <CardDescription>
            Create a new account by filling out the form below.
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
                  name='username'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel htmlFor='username'>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          id='username'
                          placeholder='John Doe'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      <FormLabel htmlFor='password'>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          id='password'
                          placeholder='******'
                          autoComplete='new-password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='grid gap-2'>
                      <FormLabel htmlFor='confirmPassword'>
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput
                          id='confirmPassword'
                          placeholder='******'
                          autoComplete='new-password'
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
                  Register
                </Button>
              </div>
            </form>
          </Form>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{" "}
            <Link
              to='/login'
              className='underline'>
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
