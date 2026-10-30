"use client";

import { AnimatePresence, m } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useLocalized } from "@/hooks/useLocalized";
import { cn } from "@/lib/cn";
import type { SectionId } from "@/types/navigation";

const MOBILE_MENU_ID = "mobile-navigation";
const DESKTOP_QUERY = "(min-width: 1024px)";
const sectionIds: readonly SectionId[] = navigation.map((item) => item.id);

interface NavigationLinksProps {
  readonly activeId: SectionId | null;
  readonly className: string;
  readonly linkClassName: string;
  readonly onNavigate?: () => void;
}

function NavigationLinks({ activeId, className, linkClassName, onNavigate }: NavigationLinksProps) {
  const t = useLocalized();

  return (
    <ul className={className}>
      {navigation.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            onClick={onNavigate}
            aria-current={activeId === item.id ? "location" : undefined}
            className={cn(
              "focus-ring block whitespace-nowrap rounded-md text-sm text-muted transition-colors hover:text-ink aria-[current=location]:text-accent-strong",
              linkClassName,
            )}
          >
            {t(item.label)}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Navbar() {
  const t = useLocalized();
  const [isOpen, setIsOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const desktopQuery = window.matchMedia(DESKTOP_QUERY);
    const handleViewportChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    desktopQuery.addEventListener("change", handleViewportChange);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      desktopQuery.removeEventListener("change", handleViewportChange);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-canvas/75 backdrop-blur-md dark:border-line/40">
      <a
        href="#content"
        className="focus-ring sr-only rounded-md bg-button-to px-4 py-2 text-sm font-semibold text-on-button focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        {t(ui.skipToContent)}
      </a>
      <nav
        aria-label={t(ui.mainNavigation)}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <a
          href="#hero"
          className="focus-ring flex min-w-0 items-center gap-3 rounded-full font-semibold tracking-wide text-accent-strong sm:rounded-md"
        >
          <span
            aria-hidden="true"
            className="seal h-10 w-10 shrink-0 text-lg shadow-arcane"
          >
            {profile.monogram}
          </span>
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap sm:text-lg lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
            {profile.name}
          </span>
        </a>
        <NavigationLinks
          activeId={activeId}
          className="hidden items-center gap-1 lg:flex"
          linkClassName="px-3 py-2"
        />
        <div className="flex shrink-0 items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={t(isOpen ? ui.closeMenu : ui.openMenu)}
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/60 text-accent-strong lg:hidden"
          >
            {isOpen ? (
              <X aria-hidden="true" className="h-4 w-4" />
            ) : (
              <Menu aria-hidden="true" className="h-4 w-4" />
            )}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isOpen && (
          <m.div
            id={MOBILE_MENU_ID}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="border-t border-line/60 bg-canvas/95 px-4 pb-4 pt-2 lg:hidden dark:border-line/40"
          >
            <NavigationLinks
              activeId={activeId}
              className="flex flex-col gap-1"
              linkClassName="px-3 py-3 text-base"
              onNavigate={closeMenu}
            />
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
