/* eslint-disable no-nested-ternary */
import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import * as DropdownPrimitive from '@radix-ui/react-dropdown-menu';
import { twJoin } from 'tailwind-merge';
import { useAppContext } from './contexts/appContext';
import { ChevronDownV2SVG } from './icons/svgs';

const PublicationNavLinksDropdown = dynamic(
  () => import('./publication-nav-links-dropdown'),
  {
    ssr: false,
  },
);

import { Publication } from '../generated/graphql';
import { MAX_MAIN_NAV_LINKS } from '../utils/const';

type Props = {
  currentActiveMenuItemId?: string | null;
  isHome?: boolean | null;
} & Pick<NonNullable<Publication['preferences']>, 'enabledPages' | 'navbarItems'> & {
    navbarItems: Omit<Publication['preferences']['navbarItems'], 'series' | 'page'>;
  };

function PublicationNavLinks(props: Props) {
  const { currentActiveMenuItemId, isHome, enabledPages, navbarItems } = props;

  const navItemsRef = useRef(
    [
      { label: 'home', url: '/', isActive: !currentActiveMenuItemId && isHome },
      ...navbarItems.map((item) => {
        const isCustomMenuItemActive = currentActiveMenuItemId && item.id === currentActiveMenuItemId;
        return { ...item, isActive: isCustomMenuItemActive };
      }),
      enabledPages?.newsletter
        ? { label: 'newsletter', url: '/newsletter', isActive: currentActiveMenuItemId === 'newsletter' }
        : null
    ].filter((item: any) => item),
  );

  const extraNavItems = navItemsRef.current.slice(MAX_MAIN_NAV_LINKS);
  const activeDropdownMenuItem = extraNavItems.find((item: any) => item?.isActive);
  const isActiveItemInDropdown = !!activeDropdownMenuItem;
  const showMoreDropdown = navItemsRef.current?.length - MAX_MAIN_NAV_LINKS > 1;

  const numMainNavItemsToRender =
    navItemsRef.current?.length - MAX_MAIN_NAV_LINKS === 1 ? MAX_MAIN_NAV_LINKS + 1 : MAX_MAIN_NAV_LINKS;

  const customNavbarItems =
    navItemsRef.current && navItemsRef.current.length > 0
      ? navItemsRef.current.slice(0, numMainNavItemsToRender).map((item: any) => {
          if (!item.url) return null;

          return (
            <Link
              className={twJoin(
                item.isActive ? 'blog-nav-active' : 'blog-nav',
                'group flex items-center justify-center border-b-2 border-transparent px-3 capitalize focus:outline-none',
                item.isActive
                  ? 'border-brand-500 dark:border-brand-400'
                  : 'hover:border-brand-300 dark:hover:border-brand-600',
              )}
              key={item.label}
              href={item.url}
            >
              <span
                className={twJoin(
                  'blog-nav-text',
                  'mb-2 block rounded-lg px-3 py-2 ring-offset-2 transition-all duration-200 group-focus:ring',
                  'text-slate-900 hover:bg-brand-50 hover:text-brand-700 group-focus:ring-brand-500 group-focus:ring-offset-white dark:text-white dark:hover:bg-brand-900/20 dark:hover:text-brand-300 dark:group-focus:ring-offset-slate-800',
                  item.isActive
                    ? 'font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20'
                    : 'font-medium text-opacity-80 dark:text-opacity-80',
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })
      : null;

  return (
    <PerfectScrollbar className="overflow-hidden">
      <nav className="relative flex flex-row flex-nowrap items-end whitespace-nowrap px-2 pt-2">
        {customNavbarItems}

        {showMoreDropdown ? (
          <DropdownPrimitive.Root>
            <DropdownPrimitive.Trigger asChild>
              <button
                aria-label="Toggle more links"
                type="button"
                className={twJoin(
                  isActiveItemInDropdown ? 'blog-nav-active' : 'blog-nav',
                  'group ml-2 border-b-2 border-transparent focus:outline-none active:outline-none',
                  isActiveItemInDropdown
                    ? 'border-brand-500 dark:border-brand-400'
                    : 'hover:border-brand-300 dark:hover:border-brand-600',
                )}
              >
                <div
                  className={twJoin(
                    'blog-nav-text',
                    'mb-2 flex flex-row items-center rounded-lg px-3 py-2 ring-offset-2 transition-all duration-200 group-focus:ring',
                    'text-black hover:bg-brand-50 hover:text-brand-700 group-focus:ring-brand-500 group-focus:ring-offset-white dark:text-white dark:hover:bg-brand-900/20 dark:hover:text-brand-300 dark:group-focus:ring-offset-slate-800',
                    isActiveItemInDropdown
                      ? 'font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-900/20'
                      : 'font-medium text-opacity-80 dark:text-opacity-80',
                  )}
                >
                  <span className="capitalize">
                    {isActiveItemInDropdown ? `${activeDropdownMenuItem?.label}` : 'More'}
                  </span>
                  <ChevronDownV2SVG className="ml-1 h-5 w-5 stroke-current" />
                </div>
              </button>
            </DropdownPrimitive.Trigger>
            {/* If there's only one extra nav item, render the extra one in main nav instead of using the dropdown */}
            {showMoreDropdown ? <PublicationNavLinksDropdown extraNavbarItems={extraNavItems} /> : null}
          </DropdownPrimitive.Root>
        ) : null}
      </nav>
    </PerfectScrollbar>
  );
}

export default PublicationNavLinks;
