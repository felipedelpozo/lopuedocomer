'use client';

import { NavbarMenuItem } from '@nextui-org/navbar';
import { Link, LinkProps } from '@nextui-org/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

type NavbarItem = keyof typeof siteConfig.navItems;

type NavbarItemsProps = LinkProps & {
  className?: string;
};

const NavbarItems: React.FC<NavbarItemsProps> = ({ className, ...props }) => {
  const t = useTranslations('navbar');
  const locale = useLocale();
  const path = usePathname();

  const isCurrent = (href: string) =>
    path === `/${locale}${href}` || `${path}/` === `/${locale}${href}`;

  return (
    <ul className={className}>
      {siteConfig.navItems &&
        siteConfig.navItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="relative"
              color="foreground"
              href={item.href}
              size="sm"
              {...props}
            >
              {isCurrent(item.href) && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 top-full block h-[1px] w-full bg-foreground"
                />
              )}
              {t(item.label as NavbarItem)}
            </Link>
          </NavbarMenuItem>
        ))}
    </ul>
  );
};

export default NavbarItems;
