import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from '@nextui-org/navbar';

import { siteConfig } from '@/config/site';
import NextLink from 'next/link';

import { ThemeSwitch } from '@/components/theme-switch';
import Logo from '@/components/logo';
import NavbarItems from './components/navbar-items';

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink href="/">
            <Logo className="font-bold text-xl" />
          </NextLink>
        </NavbarBrand>
        <NavbarItems
          className="hidden lg:flex gap-5 justify-start ml-2 pt-0.5"
          size="lg"
        />
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {siteConfig.navItems && <NavbarMenuToggle />}
      </NavbarContent>

      {siteConfig.navItems && (
        <NavbarMenu>
          <NavbarItems className="flex flex-col gap-2" size="lg" />
        </NavbarMenu>
      )}
    </NextUINavbar>
  );
};
