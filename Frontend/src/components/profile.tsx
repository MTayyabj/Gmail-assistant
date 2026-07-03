'use client';
import React, { useContext, useState, useEffect } from "react";
import { AppContent } from "../Context/AppContext";
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, LogOut, RefreshCw, CreditCard as Edit2, CircleCheck as CheckCircle2, CircleAlert as AlertCircle } from 'lucide-react';
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();
  const { backendUrl, userData, setUserData, setIsLoggedin, getUserData } = useContext(AppContent);

  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');
  const [syncLoading, setSyncLoading] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setEditedUsername(userData.name);
    }
  }, [userData]);

  const handleSaveUsername = () => {
    const trimmedUsername = editedUsername.trim();

    if (!trimmedUsername) {
      toast.error('Username cannot be empty');
      return;
    }

    setUserData((prev) => (prev ? { ...prev, name: trimmedUsername } : prev));
    setEditedUsername(trimmedUsername);
    setIsEditingUsername(false);
    toast.success('Profile name updated');
  };

  const handleSync = async () => {
    setSyncLoading(true);
    try {
      await getUserData();
      toast.success('Profile refreshed');
    } catch (error) {
      toast.error('Unable to refresh profile');
    } finally {
      setTimeout(() => setSyncLoading(false), 600);
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + 'api/auth/logout');

      if (!data.success) {
        toast.error(data.message || 'Logout failed');
        return;
      }

      setShowLogoutConfirm(false);
      setIsLoggedin(false);
      setUserData(null);
      toast.success(data.message || 'Logged out');
      navigate('/login', { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLogoutLoading(false);
    }
  };

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
                      <Mail className="h-5 w-5 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-content-main mb-1">Account Verification</h4>
                      <p className="text-xs text-content-main/60 mb-2">Primary Email:</p>
                      <p className="text-sm font-medium text-content-main">{userData?.email}</p>
                    </div>
                  </div>

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
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand hover:bg-brand-hover text-white font-semibold text-sm transition-all disabled:opacity-60"
                  >
                    <RefreshCw className={`h-4 w-4 ${syncLoading ? 'animate-spin' : ''}`} />
                    {syncLoading ? 'Refreshing...' : 'Refresh Data'}
                  </button>
                </div>
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
                Are you sure you want to logout?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  disabled={logoutLoading}
                  className="flex-1 px-4 py-2.5 rounded-lg border border-border-subtle"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-red-500 text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {logoutLoading ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
