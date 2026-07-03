import { useState } from 'react';
import { useContext } from 'react';
// import '../Hero/Hero.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContent } from '../../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
 
export default function Login() {

    const navigate = useNavigate() ;
    const location = useLocation();

    const {backendUrl ,setIsLoggedin} = useContext (AppContent);

    const [action, setAction] = useState('Sign up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {getUserData} = useContext(AppContent);
    const redirectTo = location.state?.from || { pathname: '/' };

    const sendVerificationOtp = async ({ navigateToVerify = false } = {}) => {
        try {
            axios.defaults.withCredentials = true;
            const { data } = await axios.post(backendUrl + 'api/auth/send-verify-otp');
            if (data.success) {
                toast.success(data.message);
                if (navigateToVerify) {
                    navigate('/email-verify', { replace: true });
                }
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            return false;
        }
    };


    const handleSubmit = async (e) => {
        try {
            //PREVENT BROWSER FROM RELOADING
            e.preventDefault(); // <- you must get 'e' here
                console.log(backendUrl);
                
                 axios.defaults.withCredentials = true;
     
                //MAKING API CALL 
                if (action === 'Sign up') {
                    const { data } = await axios.post(backendUrl + 'api/auth/register', { name, email, password },{withCredentials:true});
    
                    if (data.success) {
                        setIsLoggedin(true);
                        await getUserData();
                        const otpSent = await sendVerificationOtp({ navigateToVerify: true });

                        if (!otpSent) {
                            toast.info('Account created. Please request a new OTP on the verification screen.');
                            navigate('/email-verify', { replace: true });
                        }
                    } 
                    else {
                        toast.error(data.message);
                    }
                }else{
                    const { data } = await axios.post(backendUrl + 'api/auth/login', { email, password });
    
                    if (data.success) {
                        setIsLoggedin(true);
                        await getUserData();
                        navigate(redirectTo, { replace: true });
                    } 
                    else {
                        toast.error(data.message);
                    }
                }
            // }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        }
    };
    

    return (
        <div className="relative min-h-screen overflow-hidden bg-background-main px-4 py-10 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-brand/10 blur-3xl" />
                <div className="absolute top-1/3 -right-20 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--content-main)) 1px, transparent 0)',
                        backgroundSize: '32px 32px',
                    }}
                />
            </div>

            <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
                <div className="grid w-full overflow-hidden rounded-3xl border border-border-subtle bg-background-main shadow-2xl shadow-brand/10 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="hidden bg-gradient-to-br from-brand to-brand-hover p-8 text-white lg:flex lg:flex-col lg:justify-between">
                        <div>
                            <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]">
                                MailFlow AI
                            </p>
                            <h2 className="mt-6 max-w-sm text-4xl font-extrabold leading-tight">
                                Step into the same workspace your other screens already promised.
                            </h2>
                            <p className="mt-4 max-w-md text-sm leading-6 text-white/80">
                                Sign in to manage chats, profile details, and account access with the same clean blue theme used across the rest of the app.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                            <p className="text-sm font-medium text-white/80">Fast, familiar, and on-brand</p>
                            <div className="mt-3 flex gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-white" />
                                <span className="h-2.5 w-2.5 rounded-full bg-white/70" />
                                <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8 lg:p-10">
                        <div className="mx-auto w-full max-w-md">
                            <div className="mb-8">
                                <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand">
                                    Welcome back
                                </p>
                                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-content-main">
                                    {action}
                                </h1>
                                <p className="mt-2 text-sm leading-6 text-content-main/60">
                                    {action === 'Sign up'
                                        ? 'Create your account to get started.'
                                        : 'Log in to continue to your workspace.'}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">

    {action === 'Sign up' && (
<div className="space-y-2">
    <label className="block text-sm font-semibold text-content-main" htmlFor="name">Name</label>
    <input
        id="name"
        name="name"
        type="text"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        required
        className="h-12 w-full rounded-xl border border-border-subtle bg-background-secondary px-4 text-sm text-content-main outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
    />
    {/* {errors.name && <small className="error">{errors.name}</small>} */}
</div> )}

<div className="space-y-2">
    <label className="block text-sm font-semibold text-content-main" htmlFor="email">E-mail</label>
    <input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="h-12 w-full rounded-xl border border-border-subtle bg-background-secondary px-4 text-sm text-content-main outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
    />
    {/* {errors.email && <small className="error">{errors.email}</small>} */}
</div>

<div className="space-y-2">
    <label className="block text-sm font-semibold text-content-main" htmlFor="password">Password</label>
    <input
        id="password"
        name="password"
        type="password"
        autoComplete={action === 'Sign up' ? 'new-password' : 'current-password'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        required
        className="h-12 w-full rounded-xl border border-border-subtle bg-background-secondary px-4 text-sm text-content-main outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
    />
    {/* {errors.password && <small className="error">{errors.password}</small>} */}
</div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand px-5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-hover hover:shadow-lg hover:shadow-brand/25"
                                    >
                                        {action}
                                    </button>
                                </div>

                                {action === 'Login' && (
                                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-content-main/65">
                                        <p>Forgot Password?</p>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/reset-password')}
                                            className="font-semibold text-brand transition hover:text-brand-hover"
                                        >
                                            Click here
                                        </button>
                                    </div>
                                )}
                            </form>

                            <div className="mt-6 flex flex-wrap items-center justify-center gap-1 text-sm text-content-main/65">
                                {action === 'Sign up' ? (
                                    <>
                                        <p>Already have an account?</p>
                                        <button
                                            type="button"
                                            onClick={() => setAction('Login')}
                                            className="font-semibold text-brand transition hover:text-brand-hover"
                                        >
                                            Login here
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <p>Don't have an account?</p>
                                        <button
                                            type="button"
                                            onClick={() => setAction('Sign up')}
                                            className="font-semibold text-brand transition hover:text-brand-hover"
                                        >
                                            Sign up here
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
