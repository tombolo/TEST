"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './GlobalLoading.module.scss';
import LOGO from './Logo/NILOTE.png';

const GlobalLoading = () => {
    const [progress, setProgress] = useState(0);

    // Green and red theme
    const colors = {
        green: '#10b981',  // Emerald green
        red: '#ef4444',    // Red
        background: '#111827', // Dark background
        text: '#f9fafb'    // Light text
    };

    useEffect(() => {
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + (prev < 100 ? 1 : 0);
                if (newProgress >= 100) {
                    clearInterval(progressInterval);
                }
                return newProgress;
            });
        }, 40);

        return () => {
            clearInterval(progressInterval);
        };
    }, []);

    return (
        <div 
            className={styles['global-loading']}
            style={{
                '--green': colors.green,
                '--red': colors.red,
                '--background': colors.background,
                '--text': colors.text
            }}
        >
            <div className={styles['loading-container']}>
                {/* Bouncing Logo */}
                <motion.div
                    className={styles['logo-container']}
                    animate={{
                        y: [0, -20, 0],
                    }}
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

                {/* Progress Bar */}
                <div className={styles['progress-section']}>
                    <div className={styles['progress-bar-container']}>
                        <div className={styles['progress-bar-background']}>
                            <motion.div 
                                className={styles['progress-bar-fill']}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                                style={{
                                    background: `linear-gradient(90deg, ${colors.green} 0%, ${colors.red} 100%)`
                                }}
                            />
                        </div>
                        
                        {/* Progress Percentage */}
                        <motion.div 
                            className={styles['progress-text']}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {progress}%
                        </motion.div>
                    </div>

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
            </div>
        </div>
    );
};

export default GlobalLoading;