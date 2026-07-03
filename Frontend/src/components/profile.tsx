// 'use client'; 
// import React, { useContext, useState } from "react";
// import { AppContent } from "../Context/AppContext";
// import { motion } from 'framer-motion';
// import { User, Mail, Lock, LogOut, RefreshCw, CreditCard as Edit2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Copy, Eye, EyeOff } from 'lucide-react';

// interface ProfileData {
//   username: string;
//   email: string;
//   authorized: boolean;
//   gmailAccount: string;
//   lastSync: string;
// }

// export function Profile() {
//   const [profileData] = useState<ProfileData>({
//     username: 'Alex Morgan',
//     email: 'alex.morgan@company.com',
//     authorized: true,
//     gmailAccount: 'alex.morgan@gmail.com',
//     lastSync: '2024-01-20 14:32:00',
//   });

//   const [isEditingUsername, setIsEditingUsername] = useState(false);
//   const [editedUsername, setEditedUsername] = useState(profileData.username);
//   const [showApiKey, setShowApiKey] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [syncLoading, setSyncLoading] = useState(false);
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

//   const handleSaveUsername = () => {
//     if (editedUsername.trim()) {
//       setIsEditingUsername(false);
//     }
//   };

//   const handleSync = () => {
//     setSyncLoading(true);
//     setTimeout(() => setSyncLoading(false), 2000);
//   };

//   const apiKey = 'sk_live_51234567890abcdefghijklmnop';

//   const handleCopyApiKey = () => {
//     navigator.clipboard.writeText(apiKey);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <section className="min-h-screen bg-background-main py-24">
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <h1 className="text-4xl font-extrabold text-content-main tracking-tight mb-2">
//             Profile Settings
//           </h1>
//           <p className="text-lg text-content-main/60">
//             Manage your account, authorizations, and integrations
//           </p>
//         </motion.div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="lg:col-span-1"
//           > 
//             <div className="rounded-2xl border border-border-subtle bg-background-secondary p-6 sticky top-24">
//               <div className="text-center mb-6">
//                 <div className="h-20 w-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
//                   <User className="h-10 w-10 text-brand" />
//                 </div>
//                 <h2 className="text-xl font-bold text-content-main mb-1">{profileData.username}</h2>
//                 <p className="text-xs text-content-main/50">{profileData.email}</p>
//               </div>

//               <div className="pt-6 border-t border-border-subtle space-y-2">
//                 <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-content-main/70 hover:text-content-main hover:bg-background-main transition-all">
//                   <Mail className="h-4 w-4" />
//                   Email Preferences
//                 </button>
//                 <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-content-main/70 hover:text-content-main hover:bg-background-main transition-all">
//                   <Lock className="h-4 w-4" />
//                   Security Settings
//                 </button>
//                 <button
//                   onClick={() => setShowLogoutConfirm(true)}
//                   className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   Logout
//                 </button>
//               </div>
//             </div>
//           </motion.div>

//           <div className="lg:col-span-2 space-y-6">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="rounded-2xl border border-border-subtle bg-background-secondary p-8"
//             >
//               <h3 className="text-lg font-bold text-content-main mb-6 flex items-center gap-2">
//                 <User className="h-5 w-5 text-brand" />
//                 Account Information
//               </h3>

//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-xs font-semibold text-content-main/60 uppercase tracking-wide mb-2">
//                     Username
//                   </label>
//                   <div className="flex items-center gap-2">
//                     {isEditingUsername ? (
//                       <>
//                         <input
//                           type="text"
//                           value={editedUsername}
//                           onChange={(e) => setEditedUsername(e.target.value)}
//                           className="flex-1 px-4 py-3 rounded-lg border border-brand bg-background-main text-content-main focus:outline-none focus:ring-2 focus:ring-brand/20"
//                         />
//                         <button
//                           onClick={handleSaveUsername}
//                           className="px-4 py-3 bg-brand hover:bg-brand-hover text-white rounded-lg font-medium text-sm transition-all"
//                         >
//                           Save
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <div className="flex-1 px-4 py-3 rounded-lg border border-border-subtle bg-background-main text-content-main">
//                           {editedUsername}
//                         </div>
//                         <button
//                           onClick={() => setIsEditingUsername(true)}
//                           className="h-10 w-10 rounded-lg border border-border-subtle hover:bg-background-main flex items-center justify-center text-content-main/60 hover:text-content-main transition-all"
//                         >
//                           <Edit2 className="h-4 w-4" />
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-xs font-semibold text-content-main/60 uppercase tracking-wide mb-2">
//                     Email Address
//                   </label>
//                   <div className="px-4 py-3 rounded-lg border border-border-subtle bg-background-main text-content-main flex items-center gap-2">
//                     <Mail className="h-4 w-4 text-content-main/40" />
//                     {profileData.email}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               className="rounded-2xl border border-border-subtle bg-background-secondary p-8"
//             >
//               <h3 className="text-lg font-bold text-content-main mb-6 flex items-center gap-2">
//                 <Mail className="h-5 w-5 text-brand" />
//                 Authorization Status
//               </h3>

//               <div className="space-y-4">
//                 <div className="flex items-start justify-between p-4 rounded-lg border border-border-subtle bg-background-main">
//                   <div className="flex items-start gap-3 flex-1">
//                     <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
//                       <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
//                         <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" fill="none" stroke="#EA4335" strokeWidth="1.5" />
//                       </svg>
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-semibold text-content-main mb-1">Gmail Authorization</h4>
//                       <p className="text-xs text-content-main/60 mb-2">Connected account:</p>
//                       <p className="text-sm font-medium text-content-main">{profileData.gmailAccount}</p>
//                     </div>
//                   </div>
//                   <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ml-4">
//                     <CheckCircle2 className="h-3.5 w-3.5" />
//                     Authorized
//                   </span>
//                 </div>

//                 <div className="flex gap-3 pt-2">
//                   <button
//                     onClick={handleSync}
//                     disabled={syncLoading}
//                     className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
//                   >
//                     {syncLoading ? (
//                       <>
//                         <RefreshCw className="h-4 w-4 animate-spin" />
//                         Re-syncing...
//                       </>
//                     ) : (
//                       <>
//                         <RefreshCw className="h-4 w-4" />
//                         Re-sync Account
//                       </>
//                     )}
//                   </button>
//                   <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-background-main hover:bg-background-secondary text-content-main font-semibold text-sm transition-all">
//                     Disconnect
//                   </button>
//                 </div>
//               </div>

//               <div className="mt-6 p-4 rounded-lg border border-border-subtle/50 bg-background-main/50">
//                 <p className="text-xs text-content-main/60">
//                   <span className="font-semibold">Last synced:</span> {profileData.lastSync}
//                 </p>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="rounded-2xl border border-border-subtle bg-background-secondary p-8"
//             >
//               <h3 className="text-lg font-bold text-content-main mb-6 flex items-center gap-2">
//                 <Lock className="h-5 w-5 text-brand" />
//                 API Key
//               </h3>

//               <div className="space-y-4">
//                 <p className="text-sm text-content-main/60">
//                   Use this key to integrate MailFlow AI with your applications.
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <div className="flex-1 px-4 py-3 rounded-lg border border-border-subtle bg-background-main font-mono text-sm">
//                     {showApiKey ? apiKey : '••••••••••••••••••••••••••'}
//                   </div>
//                   <button
//                     onClick={() => setShowApiKey(!showApiKey)}
//                     className="h-10 w-10 rounded-lg border border-border-subtle hover:bg-background-main flex items-center justify-center text-content-main/60 hover:text-content-main transition-all"
//                   >
//                     {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//                   </button>
//                   <button
//                     onClick={handleCopyApiKey}
//                     className="h-10 w-10 rounded-lg border border-border-subtle hover:bg-background-main flex items-center justify-center text-content-main/60 hover:text-content-main transition-all"
//                   >
//                     <Copy className={`h-4 w-4 ${copied ? 'text-emerald-500' : ''}`} />
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>

//       {showLogoutConfirm && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
//           onClick={() => setShowLogoutConfirm(false)}
//         >
//           <motion.div
//             initial={{ scale: 0.95, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.95, opacity: 0 }}
//             onClick={(e) => e.stopPropagation()}
//             className="bg-background-main rounded-2xl border border-border-subtle p-8 max-w-sm w-full"
//           >
//             <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
//             <h2 className="text-xl font-bold text-content-main text-center mb-2">
//               Logout Confirmation
//             </h2>
//             <p className="text-sm text-content-main/60 text-center mb-6">
//               Are you sure you want to logout? You'll need to re-authenticate to access your account.
//             </p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setShowLogoutConfirm(false)}
//                 className="flex-1 px-4 py-2.5 rounded-lg border border-border-subtle bg-background-secondary hover:bg-background-main text-content-main font-semibold text-sm transition-all"
//               >
//                 Cancel
//               </button>
//               <button className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all">
//                 Logout
//               </button>
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </section>
//   );
// }
'use client';
import React, { useContext, useState, useEffect } from "react";
import { AppContent } from "../Context/AppContext";
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, LogOut, RefreshCw, CreditCard as Edit2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, Copy, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link, useNavigate } from 'react-router-dom';

interface ProfileData {
  username: string;
  email: string;
  authorized: boolean;
  gmailAccount: string;
  lastSync: string;
}

export function Profile() {

  // 1. Destructure values from AppContext
  const { userData, setIsLoggedin, getUserData, backendUrl, setUserData} = useContext(AppContent);

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [syncLoading, setSyncLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // 2. Initialize local state when userData changes
  useEffect(() => {
    if (userData) {
      setEditedUsername(userData.name);
    }
  }, [userData]);

  const handleSaveUsername = () => {
    if (editedUsername.trim()) {
      // Here you would typically make an API call to update the name
      setIsEditingUsername(false);
    }
  };

  const handleSync = async () => {
    setSyncLoading(true);
    await getUserData(); // Re-fetch global data
    setTimeout(() => setSyncLoading(false), 1000);
  };

  const handleLogout = () => {
    setIsLoggedin(false);
    // Add any additional cleanup like removing tokens here
    localStorage.removeItem('token'); 
  };

  const apiKey = 'sk_live_51234567890abcdefghijklmnop';

  const handleCopyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Fallback data for fields not in AppContext
  const staticData = {
    gmailAccount: 'alex.morgan@gmail.com',
    lastSync: '2024-01-20 14:32:00',
  };

 //USER VERIFICATION
    //     const sendVerificationOtp = async () => {
    //     try {
    //         axios.defaults.withCredentials = true;
    //         const { data } = await axios.post(backendUrl + 'api/auth/send-verify-otp');
    //         if (data.success) {
    //             navigate('/email-verify');
    //             toast.success(data.message);
    //         } else {
    //             toast.error(data.message);
    //         }
    //     } catch (error) {
    //         toast.error(error.message);
    //     }
    // };

    // const logout = async () => {
    //     try {
    //         axios.defaults.withCredentials = true;
    //         const { data } = await axios.post(backendUrl + 'api/auth/logout');
    //         if (data.success) {
    //             setIsLoggedin(false);
    //             setUserData(false);
    //             navigate('/');
    //         }
    //     } catch (error) {
    //         toast.error(error.message);
    //     }
    // };



  return (
    <section className="min-h-screen bg-background-main py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold text-content-main tracking-tight mb-2">
            Profile Settings
          </h1>
          <p className="text-lg text-content-main/60">
            Manage your account, authorizations, and integrations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-1"
          > 
            <div className="rounded-2xl border border-border-subtle bg-background-secondary p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="h-20 w-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-4">
                  <User className="h-10 w-10 text-brand" />
                </div>
                <h2 className="text-xl font-bold text-content-main mb-1">
                    {userData?.name || 'Loading...'}
                </h2>
                <p className="text-xs text-content-main/50">
                    {userData?.email || 'email@company.com'}
                </p>
              </div>

              <div className="pt-6 border-t border-border-subtle space-y-2">
                <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-content-main/70 hover:text-content-main hover:bg-background-main transition-all">
                  <Mail className="h-4 w-4" />
                  Email Preferences
                </button>
                <button className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-content-main/70 hover:text-content-main hover:bg-background-main transition-all">
                  <Lock className="h-4 w-4" />
                  Security Settings
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(true)}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-border-subtle bg-background-secondary p-8"
            >
              <h3 className="text-lg font-bold text-content-main mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-brand" />
                Account Information
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-content-main/60 uppercase tracking-wide mb-2">
                    Username
                  </label>
                  <div className="flex items-center gap-2">
                    {isEditingUsername ? (
                      <>
                        <input
                          type="text"
                          value={editedUsername}
                          onChange={(e) => setEditedUsername(e.target.value)}
                          className="flex-1 px-4 py-3 rounded-lg border border-brand bg-background-main text-content-main focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                        <button
                          onClick={handleSaveUsername}
                          className="px-4 py-3 bg-brand hover:bg-brand-hover text-white rounded-lg font-medium text-sm transition-all"
                        >
                          Save
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex-1 px-4 py-3 rounded-lg border border-border-subtle bg-background-main text-content-main">
                          {userData?.name}
                        </div>
                        <button
                          onClick={() => setIsEditingUsername(true)}
                          className="h-10 w-10 rounded-lg border border-border-subtle hover:bg-background-main flex items-center justify-center text-content-main/60 hover:text-content-main transition-all"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-content-main/60 uppercase tracking-wide mb-2">
                    Email Address
                  </label>
                  <div className="px-4 py-3 rounded-lg border border-border-subtle bg-background-main text-content-main flex items-center gap-2">
                    <Mail className="h-4 w-4 text-content-main/40" />
                    {userData?.email}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-border-subtle bg-background-secondary p-8"
            >
              <h3 className="text-lg font-bold text-content-main mb-6 flex items-center gap-2">
                <Mail className="h-5 w-5 text-brand" />
                Authorization Status
              </h3>

              <div className="space-y-4">
                <div className="flex items-start justify-between p-4 rounded-lg border border-border-subtle bg-background-main">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" fill="none" stroke="#EA4335" strokeWidth="1.5" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-content-main mb-1">Account Verification</h4>
                      <p className="text-xs text-content-main/60 mb-2">Primary Email:</p>
                      <p className="text-sm font-medium text-content-main">{userData?.email}</p>
                    </div>
                  </div>
                  {/* Dynamic Badge based on Context */}
                  {userData?.isAccountVerified ? (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ml-4">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap ml-4">
                      <AlertCircle className="h-3.5 w-3.5" />
                      Pending
                    </span>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSync}
                    disabled={syncLoading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {syncLoading ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Refreshing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-4 w-4" />
                        Refresh Data
                      </>
                    )}
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-background-main hover:bg-background-secondary text-content-main font-semibold text-sm transition-all">
                    Disconnect
                  </button>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-lg border border-border-subtle/50 bg-background-main/50">
                <p className="text-xs text-content-main/60">
                  <span className="font-semibold">Context Status:</span> {userData ? 'Logged In' : 'Session Expired'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLogoutConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background-main rounded-2xl border border-border-subtle p-8 max-w-sm w-full"
            >
              <AlertCircle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-content-main text-center mb-2">
                Logout Confirmation
              </h2>
              <p className="text-sm text-content-main/60 text-center mb-6">
                Are you sure you want to logout? You'll need to re-authenticate to access your account.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-border-subtle bg-background-secondary hover:bg-background-main text-content-main font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-all"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}