import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Item } from "@radix-ui/react-navigation-menu"

export const NavBar = () => {
    return (
        <div className="border-b py-1 mb-4 bg-primary-foreground">
            <NavigationMenu >
                <NavigationMenuList className="px-2">
                    <Item >
                        <img className="h-11 rounded-xl" src="/icon.png" alt="icon page" />
                    </Item>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger><Icon icon="material-symbols:quiz-outline-rounded" className="text-xl me-1" /> About</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 w-[300px] ">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <div
                                            className="flex h-full w-full  rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"

                                        >
                                            <a
                                                className="flex flex-col justify-center items-center w-1/2"
                                                href="https://github.com/SamuelParrales"
                                                target="_blank"
                                            >
                                                <div>
                                                    Github
                                                </div>
                                                <Icon icon="bi:github" className="text-2xl" />
                                            </a>
                                            <a
                                                className="flex flex-col justify-center items-center w-1/2"
                                                href="https://www.linkedin.com/in/samuelparrales"
                                                target="_blank"
                                            >
                                                <div>
                                                    Linkedin
                                                </div>
                                                <Icon icon="bi:linkedin" className="text-2xl" />
                                            </a>

                                        </div>
                                    </NavigationMenuLink>
                                </li>

                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <a href="">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <Icon icon="bi:github" className="text-lg me-1" /> Repository
                            </NavigationMenuLink>
                        </a>
                    </NavigationMenuItem>

                </NavigationMenuList>
            </NavigationMenu>
        </div>

    )
}
