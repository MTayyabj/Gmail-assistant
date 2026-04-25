import React, { useContext, useState } from "react";
import { AppContent } from "../Context/AppContext";
import { X, User, Mail, FileText, LogOut, Pencil } from "lucide-react";
 
const ProfileModal = ({ isOpen, onClose }) => {
  const { userData, setUserData, setIsLoggedin } = useContext(AppContent);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userData?.name || "",
    email: userData?.email || "",
    bio: userData?.bio || "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUserData({ ...userData, ...formData });
    setIsEditing(false);
  };

  const handleLogout = () => {
    setUserData(null);
    setIsLoggedin(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md">
      
      {/* Modal */}
      <div className="relative w-[90%] max-w-md bg-white rounded-2xl shadow-xl p-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={userData?.avatar || "https://via.placeholder.com/100"}
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-gray-200"
          />
          <h2 className="text-xl font-semibold">{userData?.name}</h2>
          <p className="text-gray-500 text-sm">{userData?.email}</p>
        </div>

        {/* Body */}
        <div className="mt-6 space-y-4">
          {isEditing ? (
            <>
              {/* Name */}
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <User size={18} className="text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                <Mail size={18} className="text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full outline-none"
                />
              </div>

              {/* Bio */}
              <div className="flex items-start gap-2 border rounded-lg px-3 py-2">
                <FileText size={18} className="text-gray-400 mt-1" />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Bio"
                  className="w-full outline-none resize-none"
                />
              </div>

              <button
                onClick={handleSave}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </>
          ) : (
            <>
              {/* Bio */}
              <div className="bg-gray-100 p-3 rounded-lg text-sm text-gray-700">
                {userData?.bio || "No bio added"}
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center justify-center gap-2 w-full border py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;