import Dropdown from "@/components/custom/navigation/dropdownMenu";
import ThemeToggle from "@/components/auth/themeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import React, { useState, useEffect } from 'react';
import Profile from '../../../app/(auth)/profile/page';

export default function NavBar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/users/profile/', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
          },
        });
        const data = await response.json();
        setIsAdmin(data.is_superuser || data.is_staff);
      } catch (error) {
        console.error(error);
      }
    };
    getProfile();
  }, []);

  const navItems = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
  ];

  const adminNavItems = [
    {
      name: "Dashboard",
      href: "/Adminjobs",
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
                {isAdmin && adminNavItems.map((item, index) => (
                  <NavigationMenuItem key={index} className="pt-2 pb-2 pr-7 pl-7">
                    <a href={item.href}>{item.name}</a>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center space-x-4 ml-auto mr-3">
            <Dropdown />
          </div>
          <ThemeToggle />
        </div>
      </header>
    </main>
  )
}
