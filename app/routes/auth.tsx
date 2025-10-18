import { usePuterStore } from "../lib/puter";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

export function meta() {
  return [
    { title: "Resumind | Auth" },
    {
      name: "description",
      content: "Login to your account to continue.",
    },
  ];
}

export default function Auth() {
  const { isLoading, error, auth } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const next = location.search.split("next=")[1];

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover flex items-center justify-center">
      <div className="gradient-border shadow-lg">
        <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
          <div className="flex flex-col gap-2 items-center text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in ...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
