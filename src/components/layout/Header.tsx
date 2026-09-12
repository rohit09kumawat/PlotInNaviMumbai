import { site } from "@/content/site";
import { HeaderClient } from "./HeaderClient";

export function Header() {
  return <HeaderClient nav={site.nav} />;
}
