import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = useCallback(() => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            // Add your form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            setSubmitStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div id="contact" className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8 pt-16">
            <div className="max-w-3xl mx-auto mb-12">
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 backdrop-blur-sm bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 border border-white/50 dark:border-gray-700/50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Contact Details</h3>
                        <div className="space-y-4">
                            <motion.a
                                href="mailto:your.email@example.com"
                                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                                whileHover={{ scale: 1.02 }}
                            >
                                <FaEnvelope className="text-xl" />
                                <span>anmoldiscord4328@gmail.com</span>
                            </motion.a>
                            <motion.a
                                href="tel:+1234567890"
                                className="flex items-center space-x-3 text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                                whileHover={{ scale: 1.02 }}
                            >
                                <FaPhone className="text-xl" />
                                <span>+91 7879570724</span>
                            </motion.a>
                        </div>
                        <div className="pt-4">
                            <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">Follow Me</h4>
                            <div className="flex space-x-4">
                                <motion.a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    className="text-2xl text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                                >
                                    <FaLinkedin />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    className="text-2xl text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                                >
                                    <FaGithub />
                                </motion.a>
                                <motion.a
                                    href="#"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    className="text-2xl text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                                >
                                    <FaTwitter />
                                </motion.a>
                                <motion.a
                                    href="https://vijayji45.github.io/myportpolio/food/food.html?fbclid=PAY2xjawH3GKhleHRuA2FlbQIxMAABptnkDR6w-Q6TL5MA0bLps5Gd5fQvO70yBZtTIp0hyIOvbDRfIhJWqdwDzg_aem_MH7N77XP31ycrlCvMDKeFg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    className="text-2xl text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                                >
                                    <FaInstagram />
                                </motion.a>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Send a Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="p-4 bg-green-100 text-green-700 rounded"
                                    >
                                        Message sent successfully!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                            >
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 transition-all duration-200"
                                    required
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                            >
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 transition-all duration-200"
                                    required
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                            >
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="block w-full rounded-lg border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-3 transition-all duration-200"
                                    required
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </motion.div>
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''} bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-white py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300`}
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;