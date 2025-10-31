"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GlobalLoading.module.scss';
import LOGO from './Logo/NILOTE.png';

export const GlobalLoading = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Theme colors
    const colors = {
        primary: '#FF444F',  // Deriv red
        secondary: '#2A3052', // Dark blue
        background: '#0E0E23', // Dark background
        text: '#FFFFFF',     // White text
        accent: '#4BB4B3'    // Teal accent
    };

    useEffect(() => {
        // Smooth progress animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const increment = prev < 90 ? 1 : 0.5; // Slow down as we approach 100%
                const newProgress = Math.min(prev + increment, 100);
                
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                    setTimeout(() => setIsComplete(true), 500);
                }
                return newProgress;
            });
        }, 40);

        return () => clearInterval(progressInterval);
    }, []);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: { 
            opacity: 0,
            transition: { duration: 0.5 }
        }
    };

    const logoVariants = {
        initial: { y: 0 },
        animate: { 
            y: [-10, 10, -10],
            transition: { 
                y: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }
            }
        }
    };

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div 
                    className={styles['global-loading']}
                    style={{
                        '--primary': colors.primary,
                        '--secondary': colors.secondary,
                        '--background': colors.background,
                        '--text': colors.text,
                        '--accent': colors.accent
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className={styles['loading-container']}>
                        {/* Animated Logo */}
                        <motion.div
                            className={styles['logo-container']}
                            variants={logoVariants}
                            initial="initial"
                            animate="animate"
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        >
                            <img 
                                src={LOGO.src} 
                                alt="Logo" 
                                className={styles.logo}
                            />
                        </motion.div>
                        
                        {/* Progress Percentage */}
                        <motion.div 
                            className={styles['progress-text']}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {progress}%
                        </motion.div>

                        {/* Loading Text */}
                        <motion.div 
                            className={styles['loading-text']}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            Loading your trading platform...
                        </motion.div>
                    </div>
                </motion.div>
        )}
        </AnimatePresence>
    );
};

export default GlobalLoading;