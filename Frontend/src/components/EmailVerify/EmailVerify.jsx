import React, { useContext, useEffect, useState } from "react";
import { MailCheck, RefreshCcw } from "lucide-react";
import { AppContent } from "../../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../navbar";
import { Footer } from "../footer";

const EmailVerify = () => {
  const inputRefs = React.useRef([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);

  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleInput = (e, index) => {
    e.target.value = e.target.value.replace(/\D/g, "");
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").replace(/\D/g, "");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const otpArray = inputRefs.current.map((el) => el.value);
      const otp = otpArray.join("");

      const { data } = await axios.post(backendUrl + "api/auth/verify-account", { otp });
      if (data.success) {
        toast.success(data.message);
        await getUserData();
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const { data } = await axios.post(backendUrl + "api/auth/send-verify-otp");

      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsResending(false);
    }
  };
 
  useEffect(() => {
    if (!isLoggedin) {
      navigate("/login");
      return;
    }

    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <main className="min-h-screen bg-background-main">
      <Navbar />

      <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, hsl(var(--content-main)) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl rounded-[28px] border border-border-subtle bg-background-main/90 shadow-2xl shadow-brand/10 backdrop-blur-sm">
            <div className="border-b border-border-subtle px-6 py-6 sm:px-8">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/25">
                <MailCheck className="h-7 w-7" />
              </div>
              <p className="mt-5 text-sm font-medium uppercase tracking-[0.2em] text-brand">
                Secure access
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-content-main sm:text-4xl">
                Verify your email
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-content-main/65 sm:text-base">
                Enter the 6-digit code sent to {userData?.email || "your inbox"} to finish signup and unlock your workspace.
              </p>
            </div>

            <form className="space-y-8 px-6 py-8 sm:px-8" onSubmit={onSubmitHandler}>
              <div className="grid gap-3 sm:grid-cols-6">
                {Array(6).fill(0).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength="1"
                    required
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleInput(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="h-14 w-full rounded-2xl border border-border-subtle bg-background-secondary text-center text-2xl font-semibold text-content-main outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/15 sm:h-16"
                  />
                ))}
              </div>

              <div className="rounded-2xl border border-border-subtle bg-background-secondary/80 px-4 py-3 text-sm text-content-main/60">
                If the code does not arrive right away, check your spam folder or request a fresh OTP below.
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/25 disabled:cursor-not-allowed disabled:opacity-70"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Verifying..." : "Verify Email"}
                </button>
                <button
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-border-subtle bg-background-main px-5 text-sm font-semibold text-content-main transition hover:border-brand/40 hover:text-brand disabled:cursor-not-allowed disabled:opacity-70"
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isResending}
                >
                  <RefreshCcw className={`h-4 w-4 ${isResending ? "animate-spin" : ""}`} />
                  {isResending ? "Sending..." : "Resend OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EmailVerify;
