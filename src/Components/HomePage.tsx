import { signIn } from '@/auth';
import Image from 'next/image';
import { CiLock } from 'react-icons/ci';
import { CiSettings } from 'react-icons/ci';
import { LuFileSpreadsheet } from 'react-icons/lu';
import { FaArrowRight } from 'react-icons/fa';

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          <h1 className="font-sans text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent leading-tight tracking-tight">
            Seamless Form Submission with Google Sheets Integration
          </h1>
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-black/5 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-medium text-gray-600">
                Made with
              </span>
              <div className="flex items-center px-2 py-1 bg-black rounded">
                <Image
                  src="/assets/next.png"
                  alt="Next.js logo"
                  className="h-5 w-5 mr-1"
                  height={100}
                  width={100}
                />
                <span className="text-sm font-semibold text-white">
                  Next.js
                </span>
              </div>
            </div>
          </div>

          <p className="font-sans text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Submit and store your information securely with our
            Google-authenticated form system. Direct integration with Google
            Sheets for easy data management.
          </p>

          {/* Main CTA */}
          <div className="pt-4">
            <form
              action={async () => {
                'use server';
                await signIn('google', { redirectTo: '/form' });
              }}
            >
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] space-x-2"
              >
                <Image
                  src="/assets/g.png"
                  alt="Google logo"
                  className="h-5 w-5"
                  height={100}
                  width={100}
                />
                <span>Get Started with Google</span>
                <FaArrowRight className="ml-2 h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <CiLock className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Secure Authentication
            </h3>
            <p className="text-gray-600">
              Protected by Google&apos;s secure authentication system. Your data
              stays safe and private.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
              <LuFileSpreadsheet className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Google Sheets Integration
            </h3>
            <p className="text-gray-600">
              Data automatically syncs to Google Sheets for easy organization
              and analysis.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <CiSettings className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Easy Management
            </h3>
            <p className="text-gray-600">
              Access and manage your submitted data anytime through Google
              Sheets interface.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-8">
            {/* Step 1 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Sign in with Google
                </h3>
                <p className="text-gray-600">
                  Securely authenticate using your Google account
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Fill the Form
                </h3>
                <p className="text-gray-600">
                  Enter your information in our user-friendly form interface
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  Automatic Storage
                </h3>
                <p className="text-gray-600">
                  Your data is automatically saved to Google Sheets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-600 text-sm">
          © 2024 Form Sheet Integration. Protected by Google Authentication.
        </div>
      </footer>
    </div>
  );
}
