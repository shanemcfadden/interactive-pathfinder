import type { PropsWithChildren } from "react";

interface LinkProps {
  href: string;
}
export const Link = ({ href, children }: PropsWithChildren<LinkProps>) => (
  <a
    className="text-blue-500 visited:text-purple-500 underline"
    href={href}
    rel="noreferrer"
    target="_blank"
  >
    {children}
  </a>
);
