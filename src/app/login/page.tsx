"use client";

export default function LoginPage() {

  const login = () => {
    window.location.href =
      "http://localhost:3001/auth/discord";
  };


  return (
    <main>
      <h1>
        Верховный суд San Andreas
      </h1>

      <button
        onClick={login}
      >
        Войти через Discord
      </button>
    </main>
  );
}