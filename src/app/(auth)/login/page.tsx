"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { login } from '@/services/auth.service'
import Cookies from "js-cookie";

const LoginPage = () => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await login(formData)
      
      if (response.success) {
        toast({
          title: "Success!",
          description: "You've successfully logged in.",
          variant: "default",
        })
        
        // Store user data if needed
        Cookies.set("ugm-jwt-token", response?.data?.token, { expires: 180 });

        
        // Redirect to dashboard or home page
        router.push('/dashboard-overview')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <Card className="w-full max-w-md border-white/5 bg-gray-900 shadow-2xl">
        <CardHeader className="space-y-2 border-b border-white/5">
          <h2 className="text-3xl font-serif text-center text-white">Welcome Back</h2>
          <p className="text-sm text-gray-400 text-center font-light">
            Please sign in to continue
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                className="h-11 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 
                  focus:border-gray-600 focus:ring-0 transition-colors"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-300">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                className="h-11 bg-gray-800 border-gray-700 text-white 
                  focus:border-gray-600 focus:ring-0 transition-colors"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-gray-400 hover:text-white transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-white/5">
            <Button 
              type="submit" 
              className="w-full h-11 bg-white hover:bg-gray-200 text-gray-900 font-medium 
                transition-colors"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage