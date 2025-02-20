import Dropdown from "@/components/dropdownMenu";
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
            href: "/",
        },
        // {
        //     name: "Jobs",
        //     href: "job",
        // },
        {
            name: "About",
            href: "/about",
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
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    <div className="flex items-center space-x-4 ml-auto mr-3">
                        {/* <button onClick={handleProfileClick}>Profile</button> */}
                        <Dropdown />
                    </div>
                    <ThemeToggle />
                </div>
            </header>
            {/* {showProfile && profile && (
        <Profile profile1={profile} />
      )} */}
        </main>
    )
}
