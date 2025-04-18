"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { login } from "@/lib/api"
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
})

type FormData = z.infer<typeof formSchema>

export function Login() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const { setAuthenticated, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/search")
    }
  }, [isAuthenticated, router])

  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (values: FormData) => {
    setIsLoading(true)
    try {
      await login(values.name, values.email)
      setAuthenticated(true)
      router.push("/search")
    } catch (err) {
      setError("Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
                      Full Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="name"
                        type="name"
                        {...form.register("name")}
                        required
                        autoComplete="name"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-amber-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        required
                        autoComplete="current-email"
                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-amber-500  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    >
                      {isLoading ? <Loader2 className="animate-spin" /> : "Sign in"}
                    </button>
                  </div>
                </form>
  )
}
