import ThemeToggle from "@/components/themeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import React, { useState, useEffect } from 'react';
import Profile from '../../../app/(auth)/profile/page';
export default function NavBar() {
     const [profile, setProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileClick = () => {
    setShowProfile(true);
    fetch('http://localhost:8000/api/users/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access')}`,
      },
    })
      .then(response => response.json())
      .then(data => setProfile(data))
      .catch(error => console.error(error));
  };
    const navItems = [
        {
            name: "Home",
            href: "/homepage",
        },
        {
            name: "Jobs",
            href: "/job",
        },
        {
            name: "Category",
            href: "#",
        },

        {
            name: "Login",
            href: "/login",
        },
    ];
    return (

        <main>
            <header className="w-full sticky top-0 border-1">
                <div className="flex w-full px-4">
                    <div className="flex-1 flex justify-center">
                        <NavigationMenu>
                            <NavigationMenuList>
                                {navItems.map((item, index) => (
                                    <NavigationMenuItem key={index} className="pt-2 pb-2 pr-7 pl-7">
                                        <a href={item.href}>{item.name}</a>
                                    </NavigationMenuItem>
                                ))}
                                <form className="">
                                    <input type="text" placeholder="search" className="border- gap-4" />
                                    <button type="submit" className="bg-green-400 p-2 rounded-md">Go</button>
                                </form>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="flex items-center space-x-4 ml-auto mr-3">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <button onClick={handleProfileClick} className="bg-green-400 p-2 rounded-md">Profile</button>
                    </div>
                    <ThemeToggle />
                </div>
            </header>
            {showProfile && profile && (
        <Profile profile={profile} />
      )}
        </main>
    )
}
