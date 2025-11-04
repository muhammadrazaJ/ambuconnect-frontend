import LoginForm from "../components/LoginForm"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">🚑</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">AmbuConnect</h1>
          <p className="text-muted-foreground">Fast emergency response at your service</p>
        </div>

        {/* Login Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Sign In</h2>

          <LoginForm />

          {/* Register Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="/register" className="text-red-600 hover:text-red-700 font-semibold transition-colors">
                Register here
              </a>
            </p>
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <span>🔒</span> Secure login with encrypted connection
          </p>
        </div>
      </div>
    </div>
  )
}
