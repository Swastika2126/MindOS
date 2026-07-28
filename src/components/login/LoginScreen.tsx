import BrandPanel from "@/components/login/BrandPanel";
import LoginForm from "@/components/login/LoginForm";

/**
 * Centered auth card on the cream page background.
 */
export default function LoginScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg p-6">
      <div className="grid h-[min(85vh,720px)] w-full max-w-5xl overflow-hidden rounded-modal border border-border shadow-xl md:grid-cols-[1.1fr_1fr]">
        <BrandPanel />
        <LoginForm />
      </div>
    </div>
  );
}
