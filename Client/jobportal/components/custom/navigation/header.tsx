import ThemeToggle from "@/components/themeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

export default function NavBar() {
    const navItems = [
        {
            name: "Home",
            href: "/homepage",
        },
        {
            name: "Jobs",
            href: "#",
        },
        {
            name: "Category",
            href: "#",
        },

        {
            name: "Login",
            href: "/",
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
                    </div>
                    <ThemeToggle />
                </div>
            </header>
        </main>
    )
}