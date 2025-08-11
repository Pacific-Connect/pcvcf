// app/(auth)/onboarding/page.tsx  (SERVER)
import { requireUser } from "@/lib/require-user";
import OnboardingClient from "./client";

export default async function OnboardingPage() {
  await requireUser();            // signed-in only, but NOT under (protected) layout
  return <OnboardingClient />;    // render the client form
}
