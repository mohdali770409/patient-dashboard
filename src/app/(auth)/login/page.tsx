"use client"
import React from 'react'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login attempt:', formData)
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
            >
              Sign in
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default LoginPage