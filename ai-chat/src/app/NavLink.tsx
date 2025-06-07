"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink(props: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const isActive = pathname === props.href;
  return (
    <Link {...props} className={isActive ? "text-white" : "text-gray-200"}>
      {props.title}
    </Link>
  );
}
