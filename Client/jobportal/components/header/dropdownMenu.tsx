import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useEffect, useState } from "react"
import { User } from "@/interface"

const Dropdown = () => {
    const router = useRouter()
    const [user, setUser] = useState<User>()
    const handleLogout = () => {
        localStorage.removeItem('access');
        router.push('/login')
    }

    const getProfile = () => {
        fetch('http://localhost:8000/api/users/profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
        })
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error(error));
      }

      useEffect(() => {
        getProfile()
      }, [])

    const handleProfile = () => {
        router.push('/profile')
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="bg-slate-400 flex items-center justify-center">
                    <p className="capitalize font-bold">{user?.username.charAt(0)}</p>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown