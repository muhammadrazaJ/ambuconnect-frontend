import RegisterForm from "../components/RegisterForm"

export default function RegisterPage() {
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
          <p className="text-muted-foreground">Emergency ambulance booking made easy</p>
        </div>

        {/* Registration Card */}
        <div className="bg-card border border-border rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">Create Account</h2>

          <RegisterForm />

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/login" className="text-red-600 hover:text-red-700 font-semibold transition-colors">
                Login here
              </a>
            </p>
          </div>

          {/* Terms */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            By registering, you agree to our{" "}
            <a href="/terms" className="underline hover:no-underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="underline hover:no-underline">
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Trust Badge */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <span>🔒</span> Your data is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  )
}
