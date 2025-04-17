import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { firebaseApp } from './firebase/firebase';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const auth = getAuth(firebaseApp);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        phoneNumber: '',
        address: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [passwordEditMode, setPasswordEditMode] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setFormData({
                    ...formData,
                    displayName: currentUser.displayName || '',
                    email: currentUser.email || '',
                    phoneNumber: currentUser.phoneNumber || '',
                });
            } else {
                navigate('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();

        if (!user) return;

        try {
            setLoading(true);

            // Update display name if changed
            if (formData.displayName !== user.displayName) {
                await updateProfile(user, {
                    displayName: formData.displayName
                });
            }

            // Update email if changed
            if (formData.email !== user.email && formData.currentPassword) {
                const credential = EmailAuthProvider.credential(
                    user.email,
                    formData.currentPassword
                );

                await reauthenticateWithCredential(user, credential);
                await updateEmail(user, formData.email);
            }

            toast.success('Profile updated successfully!');
            setEditMode(false);
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error(`Error updating profile: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();

        if (!user) return;

        if (formData.newPassword !== formData.confirmPassword) {
            toast.error('New passwords do not match');
            return;
        }

        try {
            setLoading(true);

            // Re-authenticate the user
            const credential = EmailAuthProvider.credential(
                user.email,
                formData.currentPassword
            );

            await reauthenticateWithCredential(user, credential);

            // Update password
            await updatePassword(user, formData.newPassword);

            // Clear password fields
            setFormData({
                ...formData,
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            });

            toast.success('Password updated successfully!');
            setPasswordEditMode(false);
        } catch (error) {
            console.error('Error updating password:', error);
            toast.error(`Error updating password: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">Your Profile</h1>
                    {!editMode && (
                        <button
                            onClick={() => setEditMode(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>

                {/* Profile Information Form */}
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="bg-gray-100 p-6 rounded-lg mb-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label htmlFor="displayName" className="block text-gray-700 font-medium mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="displayName"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        className={`w-full p-2 border rounded-md ${!editMode ? 'bg-gray-50' : 'bg-white'}`}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        className={`w-full p-2 border rounded-md ${!editMode ? 'bg-gray-50' : 'bg-white'}`}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                        className={`w-full p-2 border rounded-md ${!editMode ? 'bg-gray-50' : 'bg-white'}`}
                                    />
                                </div>
                            </div>

                            {editMode && (
                                <div className="flex-1 space-y-4">
                                    <div>
                                        <label htmlFor="currentPassword" className="block text-gray-700 font-medium mb-1">
                                            Current Password (required to change email)
                                        </label>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            name="currentPassword"
                                            value={formData.currentPassword}
                                            onChange={handleChange}
                                            className="w-full p-2 border rounded-md"
                                            placeholder="Enter current password"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Profile Form Buttons */}
                    {editMode && (
                        <div className="flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setEditMode(false);
                                    // Reset form data to current user data
                                    setFormData({
                                        ...formData,
                                        displayName: user.displayName || '',
                                        email: user.email || '',
                                        currentPassword: '',
                                    });
                                }}
                                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </form>

                {/* Password Section */}
                <div className="mt-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-gray-800">Password</h2>
                        {!passwordEditMode && (
                            <button
                                onClick={() => setPasswordEditMode(true)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                            >
                                Change Password
                            </button>
                        )}
                    </div>

                    {passwordEditMode && (
                        <form onSubmit={handlePasswordUpdate} className="bg-gray-100 p-6 rounded-lg space-y-4">
                            <div>
                                <label htmlFor="currentPasswordForChange" className="block text-gray-700 font-medium mb-1">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    id="currentPasswordForChange"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div>
                                <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-1">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-md"
                                />
                            </div>

                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPasswordEditMode(false);
                                        setFormData({
                                            ...formData,
                                            currentPassword: '',
                                            newPassword: '',
                                            confirmPassword: ''
                                        });
                                    }}
                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                >
                                    {loading ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>

                {/* Order History Section Placeholder */}
                <div className="mt-10">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
                    <div className="bg-gray-100 p-6 rounded-lg">
                        <button
                            onClick={() => navigate('/orders')}
                            className="w-full py-3 text-center bg-gray-200 hover:bg-gray-300 rounded-md transition"
                        >
                            View All Orders
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; 