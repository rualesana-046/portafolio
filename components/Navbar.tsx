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
import { getInitials } from "@/lib/text";
import type { SectionId } from "@/types/navigation";

const MOBILE_MENU_ID = "mobile-navigation";
const DESKTOP_QUERY = "(min-width: 768px)";
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
              "focus-ring block rounded-md text-sm text-muted transition-colors hover:text-ink aria-[current=location]:text-accent-strong",
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
        className="focus-ring sr-only rounded-md bg-accent-strong px-4 py-2 text-sm font-semibold text-canvas focus:not-sr-only focus:absolute focus:left-4 focus:top-3"
      >
        {t(ui.skipToContent)}
      </a>
      <nav
        aria-label={t(ui.mainNavigation)}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <a
          href="#hero"
          className="focus-ring flex min-w-0 items-center rounded-full font-title font-semibold tracking-wider text-accent-strong sm:rounded-md"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-full border border-accent/70 bg-surface/60 text-sm shadow-arcane sm:hidden"
          >
            {getInitials(profile.name)}
          </span>
          <span className="sr-only truncate sm:not-sr-only sm:text-lg">{profile.name}</span>
        </a>
        <NavigationLinks
          activeId={activeId}
          className="hidden items-center gap-1 md:flex"
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
            className="focus-ring inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/60 text-accent-strong md:hidden"
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
            className="border-t border-line/60 bg-canvas/95 px-4 pb-4 pt-2 md:hidden dark:border-line/40"
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
