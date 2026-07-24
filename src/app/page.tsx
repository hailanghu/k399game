import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function RootPage() {
  // Detect preferred language from cookie or default to English
  const cookieStore = cookies();
  const localeCookie = cookieStore.get("NEXT_LOCALE")?.value;
  const locale = localeCookie === "zh" ? "zh" : "en";
  redirect(`/${locale}`);
}
