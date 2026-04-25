import React, { useState } from "react";
import {
  Home,
  MessageCircle,
  History,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Email" },
    { icon: MessageCircle, label: "Calendar" },
    { icon: History, label: "Schedule" },
    { icon: Settings, label: "Memory" },
  ];

  return (
    <motion.aside
      onMouseEnter={() => setSidebarOpen(true)}
      onMouseLeave={() => setSidebarOpen(false)}
      animate={{ width: sidebarOpen ? 220 : 70 }}
      transition={{ duration: 0.25 }}
      className="h-screen border-l border-[var(--ui-border-subtle)] 
           bg-black/20 backdrop-blur-xl 
           flex flex-col justify-between p-3"    >
      {/* TOP MENU */}
      <div className="flex flex-col gap-2 mt-4">
        {menuItems.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              className="flex items-center gap-3 px-3 py-3 rounded-xl 
                         hover:bg-white/10 transition-all"
            >
              <Icon size={22} />
              {sidebarOpen && (
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* PROFILE */}
      <div className="flex items-center gap-3 px-3 py-4">
        <div className="h-10 w-10 rounded-full bg-white/20" />
        {sidebarOpen && (
          <span className="text-sm font-medium">Username</span>
        )}
      </div>
    </motion.aside>
  );
}