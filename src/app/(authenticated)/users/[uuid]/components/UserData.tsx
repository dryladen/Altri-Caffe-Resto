"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail, Edit2 } from 'lucide-react'

export default function UserData() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    username: "janedoe",
    email: "jane.doe@example.com",
    role: "Product Designer",
    image: "/placeholder.svg?height=128&width=128"
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserInfo(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
    // Here you would typically send the updated info to a server
  }

  return (
    <div className="container p-4">
      <Card>
        <CardHeader className="relative">
          <div className="absolute right-4 top-4">
            <Button variant="outline" size="icon" onClick={() => setIsEditing(!isEditing)}>
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={userInfo.image} alt={userInfo.username} />
              <AvatarFallback>{userInfo.username[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <CardTitle>{userInfo.username}</CardTitle>
              <CardDescription>{userInfo.role}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" value={userInfo.username} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={userInfo.email} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" name="role" value={userInfo.role} onChange={handleInputChange} />
              </div>
              <Button type="submit" className="w-full">Save Changes</Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{userInfo.email}</span>
              </div>
              <div className="pt-2">
                <h3 className="font-semibold mb-1">Role</h3>
                <p>{userInfo.role}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}