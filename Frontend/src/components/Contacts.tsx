// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Plus, Search, Trash2, Mail, Users, X, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, User } from 'lucide-react';

// const relationOptions = ['Friend', 'Boss', 'Colleague', 'Client', 'Mentor', 'Vendor'];

// interface Contact {
//   id: string;
//   name: string;
//   email: string;
//   relation: string;
//   createdAt: string;
// }

// export function Contacts() {
//   const [contacts, setContacts] = useState<Contact[]>([
//     {
//       id: '1',
//       name: 'Sarah Chen',
//       email: 'sarah@company.com',
//       relation: 'Boss',
//       createdAt: '2024-01-15',
//     },
//     {
//       id: '2',
//       name: 'Marcus Webb',
//       email: 'marcus@partner.com',
//       relation: 'Client',
//       createdAt: '2024-01-10',
//     },
//     {
//       id: '3',
//       name: 'Elena Rodriguez',
//       email: 'elena@team.com',
//       relation: 'Colleague',
//       createdAt: '2024-01-08',
//     },
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     relation: 'Colleague',
//   });
//   const [formError, setFormError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const filteredContacts = contacts.filter((contact) =>
//     contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     contact.email.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleAddContact = (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError('');
//     setSuccessMessage('');

//     if (!formData.name.trim() || !formData.email.trim()) {
//       setFormError('Name and email are required');
//       return;
//     }

//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       setFormError('Please enter a valid email address');
//       return;
//     }

//     if (contacts.some((c) => c.email === formData.email)) {
//       setFormError('This email already exists');
//       return;
//     }

//     const newContact: Contact = {
//       id: Date.now().toString(),
//       name: formData.name,
//       email: formData.email,
//       relation: formData.relation,
//       createdAt: new Date().toISOString().split('T')[0],
//     };

//     setContacts([newContact, ...contacts]);
//     setFormData({ name: '', email: '', relation: 'Colleague' });
//     setShowForm(false);
//     setSuccessMessage('Contact added successfully!');
//     setTimeout(() => setSuccessMessage(''), 3000);
//   };

//   const handleDeleteContact = (id: string) => {
//     setContacts(contacts.filter((c) => c.id !== id));
//   };

//   const getRelationColor = (relation: string) => {
//     const colors: Record<string, string> = {
//       Friend: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
//       Boss: 'bg-red-500/10 text-red-500 border-red-500/20',
//       Colleague: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
//       Client: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
//       Mentor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
//       Vendor: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
//     };
//     return colors[relation] || colors.Colleague;
//   };

//   return (
//     <section className="min-h-screen bg-background-main py-24">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="mb-10"
//         >
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
//             <div>
//               <h1 className="text-4xl font-extrabold text-content-main tracking-tight mb-2">
//                 Contact Management
//               </h1>
//               <p className="text-lg text-content-main/60">
//                 Organize and manage your professional network
//               </p>
//             </div>
//             <button
//               onClick={() => setShowForm(!showForm)}
//               className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg shadow-brand/25 hover:shadow-brand/40 w-fit"
//             >
//               <Plus className="h-4 w-4" />
//               Add Contact
//             </button>
//           </div>

//           <div className="flex items-center gap-3 px-4 py-3 bg-background-secondary rounded-xl border border-border-subtle">
//             <Search className="h-4 w-4 text-content-main/30" />
//             <input
//               type="text"
//               placeholder="Search by name or email..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="flex-1 bg-transparent text-sm text-content-main placeholder:text-content-main/40 outline-none"
//             />
//           </div>
//         </motion.div>

//         <AnimatePresence>
//           {successMessage && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-4 py-3 rounded-xl"
//             >
//               <CheckCircle2 className="h-4 w-4 shrink-0" />
//               <span className="text-sm font-medium">{successMessage}</span>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <AnimatePresence>
//           {showForm && (
//             <motion.div
//               initial={{ opacity: 0, y: -16 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -16 }}
//               className="mb-8"
//             >
//               <form
//                 onSubmit={handleAddContact}
//                 className="rounded-2xl border border-brand/20 bg-gradient-to-b from-brand/5 to-background-main p-6 space-y-6"
//               >
//                 <div className="grid sm:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-content-main mb-2">
//                       Name <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       placeholder="Enter full name"
//                       className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-background-main text-content-main placeholder:text-content-main/40 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-content-main mb-2">
//                       Email <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       value={formData.email}
//                       onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                       placeholder="Enter email address"
//                       className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-background-main text-content-main placeholder:text-content-main/40 focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm"
//                     />
//                   </div>

//                   <div className="sm:col-span-2">
//                     <label className="block text-sm font-semibold text-content-main mb-2">
//                       Relation
//                     </label>
//                     <select
//                       value={formData.relation}
//                       onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
//                       className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-background-main text-content-main focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 transition-all text-sm appearance-none cursor-pointer"
//                       style={{
//                         backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
//                         backgroundRepeat: 'no-repeat',
//                         backgroundPosition: 'right 1rem center',
//                         paddingRight: '2.5rem',
//                       }}
//                     >
//                       {relationOptions.map((option) => (
//                         <option key={option} value={option}>
//                           {option}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>

//                 {formError && (
//                   <div className="flex items-center gap-2 text-red-500 text-sm">
//                     <AlertCircle className="h-4 w-4 shrink-0" />
//                     {formError}
//                   </div>
//                 )}

//                 <div className="flex gap-3 pt-4">
//                   <button
//                     type="submit"
//                     className="flex-1 bg-brand hover:bg-brand-hover text-white font-semibold py-2.5 rounded-lg transition-all text-sm"
//                   >
//                     Add Contact
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowForm(false);
//                       setFormError('');
//                       setFormData({ name: '', email: '', relation: 'Colleague' });
//                     }}
//                     className="px-6 py-2.5 rounded-lg border border-border-subtle bg-background-secondary hover:bg-background-main text-content-main font-semibold transition-all text-sm"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <div className="rounded-2xl border border-border-subtle bg-background-secondary overflow-hidden">
//           {filteredContacts.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-background-main border-b border-border-subtle">
//                   <tr>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-content-main/70 uppercase tracking-wide">
//                       Name
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-content-main/70 uppercase tracking-wide">
//                       Email
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-content-main/70 uppercase tracking-wide">
//                       Relation
//                     </th>
//                     <th className="px-6 py-4 text-left text-xs font-semibold text-content-main/70 uppercase tracking-wide">
//                       Added
//                     </th>
//                     <th className="px-6 py-4 text-right text-xs font-semibold text-content-main/70 uppercase tracking-wide">
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredContacts.map((contact, idx) => (
//                     <motion.tr
//                       key={contact.id}
//                       initial={{ opacity: 0 }}
//                       animate={{ opacity: 1 }}
//                       transition={{ delay: idx * 0.05 }}
//                       className="border-b border-border-subtle/50 hover:bg-background-main/50 transition-colors"
//                     >
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-3">
//                           <div className="h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center shrink-0">
//                             <User className="h-5 w-5 text-brand" />
//                           </div>
//                           <span className="font-medium text-content-main text-sm">{contact.name}</span>
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="flex items-center gap-2 text-sm text-content-main/70">
//                           <Mail className="h-3.5 w-3.5 text-content-main/40" />
//                           {contact.email}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <span
//                           className={`inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border ${getRelationColor(
//                             contact.relation
//                           )}`}
//                         >
//                           {contact.relation}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 text-sm text-content-main/60">
//                         {new Date(contact.createdAt).toLocaleDateString('en-US', {
//                           month: 'short',
//                           day: 'numeric',
//                           year: 'numeric',
//                         })}
//                       </td>
//                       <td className="px-6 py-4 text-right">
//                         <button
//                           onClick={() => handleDeleteContact(contact.id)}
//                           className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-600 hover:bg-red-500/10 px-2.5 py-1.5 rounded-lg transition-all text-sm"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                           Delete
//                         </button>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <Users className="h-12 w-12 text-content-main/20 mx-auto mb-4" />
//               <h3 className="text-lg font-semibold text-content-main mb-1">
//                 {searchQuery ? 'No contacts found' : 'No contacts yet'}
//               </h3>
//               <p className="text-sm text-content-main/50">
//                 {searchQuery
//                   ? 'Try adjusting your search terms'
//                   : 'Create your first contact to get started'}
//               </p>
//             </div>
//           )}
//         </div>

//         <div className="mt-10 grid sm:grid-cols-3 gap-4">
//           <div className="rounded-xl border border-border-subtle bg-background-secondary p-4">
//             <div className="text-2xl font-bold text-brand mb-1">{contacts.length}</div>
//             <div className="text-xs text-content-main/60 uppercase tracking-wide font-medium">
//               Total Contacts
//             </div>
//           </div>
//           <div className="rounded-xl border border-border-subtle bg-background-secondary p-4">
//             <div className="text-2xl font-bold text-emerald-500 mb-1">
//               {Array.from(new Set(contacts.map((c) => c.relation))).length}
//             </div>
//             <div className="text-xs text-content-main/60 uppercase tracking-wide font-medium">
//               Relation Types
//             </div>
//           </div>
//           <div className="rounded-xl border border-border-subtle bg-background-secondary p-4">
//             <div className="text-2xl font-bold text-violet-500 mb-1">
//               {contacts.length === 0 ? '0%' : '100%'}
//             </div>
//             <div className="text-xs text-content-main/60 uppercase tracking-wide font-medium">
//               Verified Emails
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
'use client';

import { useState, useEffect, useContext } from 'react';
import { AppContent } from "../Context/AppContext"; // Assuming your context path
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Trash2, Mail, Users, X, CircleCheck as CheckCircle2, CircleAlert as AlertCircle, User, Loader2 } from 'lucide-react';

const relationOptions = ['Friend', 'Boss', 'Colleague', 'Client', 'Mentor', 'Vendor', 'Other'];

interface Contact {
  _id: string; // Changed from 'id' to '_id' to match MongoDB
  name: string;
  email: string;
  relation: string;
  createdAt: string;
}

export function Contacts() {
const { backendUrl, userData } = useContext(AppContent);
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    relation: 'Colleague',
  });
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Fetch Contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      // No userId needed in body! Middleware handles it via cookies.
      const response = await axios.post(`${backendUrl}api/contact/get`);
      
      if (response.data.success) {
        setContacts(response.data.contacts);
      }
    } catch (error: any) {
      console.error("Fetch error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []); // Run on mount

  // 2. Add Contact
  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    try {
      const response = await axios.post(`${backendUrl}api/contact/add`, formData);

      if (response.data.success) {
        setSuccessMessage('Contact added successfully!');
        setFormData({ name: '', email: '', relation: 'Colleague' });
        setShowForm(false);
        fetchContacts(); 
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setFormError(response.data.message);
      }
    } catch (error: any) {
      setFormError("Server error occurred.");
    }
  };

  // 3. Delete Contact (Using contactId now)
  const handleDeleteContact = async (contactId: string) => {
    setFormError('');

    try {
      const response = await axios.post(`${backendUrl}api/contact/delete`, { contactId });

      if (response.data.success) {
        setContacts(prev => prev.filter(c => c._id !== contactId));
        setSuccessMessage('Contact deleted');
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        setFormError(response.data.message || 'Unable to delete contact.');
      }
    } catch (error: any) {
      setFormError(error.response?.data?.message || 'Server error occurred.');
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper for UI colors
  const getRelationColor = (relation: string) => {
    const colors: Record<string, string> = {
      Friend: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      Boss: 'bg-red-500/10 text-red-500 border-red-500/20',
      Colleague: 'bg-violet-500/10 text-violet-500 border-violet-500/20',
      Client: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      Mentor: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
      Vendor: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
    };
    return colors[relation] || 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  };
  return (
    <section className="min-h-screen bg-background-main py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-extrabold text-content-main tracking-tight mb-2">
                Contact Management
              </h1>
              <p className="text-lg text-content-main/60">
                Connected as: <span className="text-brand font-medium">{userData?.name}</span>
              </p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="inline-flex items-center gap-2 bg-brand hover:bg-brand-hover text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg w-fit"
            >
              <Plus className="h-4 w-4" />
              Add Contact
            </button>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 bg-background-secondary rounded-xl border border-border-subtle">
            <Search className="h-4 w-4 text-content-main/30" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-content-main placeholder:text-content-main/40 outline-none"
            />
          </div>
        </motion.div>

        {/* Alerts for Success */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 px-4 py-3 rounded-xl overflow-hidden"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span className="text-sm font-medium">{successMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Contact Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="mb-8"
            >
              <form
                onSubmit={handleAddContact}
                className="rounded-2xl border border-brand/20 bg-background-secondary p-6 space-y-6 shadow-xl"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-content-main mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-background-main text-content-main"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-content-main mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-background-main text-content-main"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-content-main mb-2">Relation</label>
                    <select
                      value={formData.relation}
                      onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-border-subtle bg-background-main text-content-main cursor-pointer"
                    >
                      {relationOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>

                {formError && (
                  <div className="text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> {formError}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="flex-1 bg-brand text-white py-2.5 rounded-lg font-semibold">Save Contact</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-lg border border-border-subtle text-content-main">Cancel</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contacts Table */}
        <div className="rounded-2xl border border-border-subtle bg-background-secondary overflow-hidden">
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-content-main/40">
              <Loader2 className="h-10 w-10 animate-spin mb-4" />
              <p>Fetching your network...</p>
            </div>
          ) : filteredContacts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-background-main border-b border-border-subtle">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-content-main/70 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-content-main/70 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-content-main/70 uppercase">Relation</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-content-main/70 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact, idx) => (
                    <motion.tr
                      key={contact._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-border-subtle/50 hover:bg-background-main/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-content-main">
                        <div className="flex items-center gap-3">
                           <User className="h-4 w-4 text-brand" /> {contact.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-content-main/70">{contact.email}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getRelationColor(contact.relation)}`}>
                          {contact.relation}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteContact(contact._id)}
                          className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="h-12 w-12 text-content-main/20 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-content-main">No contacts found</h3>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="mt-10 grid sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border-subtle bg-background-secondary p-4">
            <div className="text-2xl font-bold text-brand mb-1">{contacts.length}</div>
            <div className="text-xs text-content-main/60 uppercase">Total Contacts</div>
          </div>
          <div className="rounded-xl border border-border-subtle bg-background-secondary p-4">
            <div className="text-2xl font-bold text-emerald-500 mb-1">
              {Array.from(new Set(contacts.map((c) => c.relation))).length}
            </div>
            <div className="text-xs text-content-main/60 uppercase">Groups/Categories</div>
          </div>
        </div>
      </div>
    </section>
  );
}
