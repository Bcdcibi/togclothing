"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  if (isLoggedIn) {
    router.push("/");
  }

  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset Your Password"
          : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset"
          : "Verify";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      let response;

      switch (mode) {
        case MODE.LOGIN:
          setError("");
          setMessage("");
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          setError("");
          setMessage("");
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          setError("");
          setMessage("");
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage("Password reset email sent. Please check your e-mail.");
          break;
        case MODE.EMAIL_VERIFICATION:
          setError("");
          setMessage("");
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("You are being redirected.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Invalid email or password!");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists!");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong!");
          }
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
        default:
          break;
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-[sans-serif] min-h-[120vh] sm:min-h-[75vh]">
      <div className="grid lg:grid-cols-2 gap-4 max-lg:gap-12 bg-gradient-to-r from-orange-400/90 to-orange-500/80 px-8 py-12 h-[320px]">
        <div>
          <Link href="/" className="inline-block max-w-[160px]">
            <Image
              src="/logo.png"
              alt="logo"
              width={75}
              height={75}
              className="max-w-full dark:hidden"
            />
            <Image
              src="/logo.png"
              alt="logo"
              width={75}
              height={75}
              className="max-w-full hidden dark:block"
            />
          </Link>
          <div className="max-w-lg mt-4 max-lg:hidden">
            <h3 className="text-3xl font-bold text-white">Sign in</h3>
            <p className="text-base mt-4 tracking-wide text-white">Sign in to your account and unlock a world of exclusive deals, seamless shopping, and endless opportunities. Your journey to effortless shopping starts here!</p>
          </div>
        </div>

        <div className="bg-white rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-3xl font-extrabold text-gray-800 text-center">{formTitle}</h3>
            </div>
            {mode === MODE.REGISTER ? (
              <div className="mt-4">
                <label className="text-gray-800 text-sm mb-2 block">Username</label>
                <div className="relative flex items-center">
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    name="username" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-lama" placeholder="Enter user name" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            ) : null}
            {mode !== MODE.EMAIL_VERIFICATION ? (
              <div className="mt-4">
                <label className="text-gray-800 text-sm mb-2 block">Email</label>
                <div className="relative flex items-center">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    name="email" type="email" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-lama" placeholder="Enter your email" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4"
                    viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                      </clipPath>
                    </defs>
                    <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" stroke-miterlimit="10" stroke-width="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"></path>
                    </g>
                  </svg>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <label className="text-gray-800 text-sm mb-2 block">Veification Code</label>
                <div className="relative flex items-center">
                  <input
                    onChange={(e) => setEmailCode(e.target.value)}
                    name="emailCode" type="text" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-lama" placeholder="Enter your email verification code" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                    <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                    <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            )}
            {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
              <div className="mt-4">
                <label className="text-gray-800 text-sm mb-2 block">Password</label>
                <div className="relative flex items-center">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    name="password" type="password" required className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-lama" placeholder="Enter password" />
                  <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                    <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            ) : null}
            {mode === MODE.LOGIN && (
              <div className="mt-4 text-right">
                <p onClick={() => setMode(MODE.RESET_PASSWORD)} className="text-lama cursor-pointer text-sm font-semibold hover:underline">
                  Forgot your password?
                </p>
              </div>
            )}
            <div className="mt-8">
              <button disabled={isLoading} className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-lama hover:bg-lama/80 focus:outline-none">
                {isLoading ? "Loading..." : buttonTitle}
              </button>
            </div>
            {error && (
              <div className="bg-red-100 text-red-800 p-4 rounded-lg mt-4" role="alert">
                <strong className="font-bold text-sm mr-2">Error!</strong>
                <span className="block text-sm sm:inline max-sm:mt-2">{error}</span>
              </div>
            )}
            {mode === MODE.LOGIN && (
              <p className="text-sm mt-8 text-center text-gray-800">Don&apos;t have an account? <span className="text-lama font-semibold hover:underline whitespace-nowrap cursor-pointer" onClick={() => setMode(MODE.REGISTER)}>Register here</span></p>
            )}
            {mode === MODE.REGISTER && (
              <p className="text-sm mt-8 text-center text-gray-800">Have an account? <span className="text-lama font-semibold hover:underline whitespace-nowrap cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>Log In</span></p>
            )}
            {mode === MODE.RESET_PASSWORD && (
              <p className="text-sm mt-8 text-center text-gray-800">Go back to <span className="text-lama font-semibold hover:underline whitespace-nowrap cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>Log In</span></p>
            )}
            {message && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg mt-4" role="alert">
                <strong className="font-bold text-sm mr-2">Success!</strong>
                <span className="block text-sm sm:inline max-sm:mt-2">{message}</span>
              </div>)}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
