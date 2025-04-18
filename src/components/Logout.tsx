"use client"
import { logout } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";


export function LogoutButton() {
  const router = useRouter();
  const { setAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setAuthenticated(false);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-white text-black hover:text-white rounded hover:bg-red-400 transition-colors"
    >
      Log Out
    </button>
  );
}
