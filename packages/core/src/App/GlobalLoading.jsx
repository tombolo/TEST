"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './GlobalLoading.module.scss';

// Import your logo - make sure the path is correct
import LOGO from './Logo/NILOTE.png';

export const GlobalLoading = () => {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    // Theme colors
    const colors = {
        primary: '#4F46E5',    // Indigo
        secondary: '#7C3AED',  // Violet
        background: '#0F172A', // Dark blue
        surface: '#1E293B',    // Dark surface
        text: '#F8FAFC',      // Light text
        accent: '#06B6D4'      // Cyan
    };

    useEffect(() => {
        // Smooth progress animation with easing
        let start = 0;
        const duration = 3000; // 3 seconds total
        const steps = 100;
        const stepTime = duration / steps;
        
        const animate = () => {
            start++;
            const progress = Math.min(100, (start / steps) * 100);
            
            // Ease out function for smooth deceleration
            const easeOut = (t) => 1 - Math.pow(1 - t, 3);
            const easedProgress = easeOut(progress / 100) * 100;
            
            setProgress(Math.min(easedProgress, 100));
            
            if (progress < 100) {
                setTimeout(animate, stepTime);
            } else {
                setTimeout(() => setIsComplete(true), 500);
            }
        };
        
        const timer = setTimeout(animate, stepTime);
        
        return () => {
            clearTimeout(timer);
        };
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
            transition: { duration: 0.5, delay: 0.5 }
        }
    };

    const logoVariants = {
        initial: { scale: 0.9, opacity: 0 },
        animate: { 
            scale: 1,
            opacity: 1,
            y: [0, -15, 0],
            transition: { 
                y: {
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                },
                scale: { duration: 0.5 },
                opacity: { duration: 0.5 }
            }
        }
    };

    // Calculate progress bar width with a minimum of 10% for better visibility
    const progressWidth = Math.max(10, progress);

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div 
                    className={styles.globalLoading}
                    style={{
                        '--primary': colors.primary,
                        '--secondary': colors.secondary,
                        '--background': colors.background,
                        '--surface': colors.surface,
                        '--text': colors.text,
                        '--accent': colors.accent
                    }}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                >
                    <div className={styles.loadingContainer}>
                        {/* Animated Logo */}
                        <motion.div
                            className={styles.logoContainer}
                            variants={logoVariants}
                            initial="initial"
                            animate="animate"
                        >
                            <img 
                                src={LOGO} 
                                alt="Logo" 
                                className={styles.logo}
                            />
                        </motion.div>
                        
                        {/* Progress Bar */}
                        <div className={styles.progressContainer}>
                            <div className={styles.progressBar}>
                                <motion.div 
                                    className={styles.progressFill}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressWidth}%` }}
                                    transition={{ 
                                        type: 'spring',
                                        damping: 15,
                                        stiffness: 100
                                    }}
                                >
                                    <div className={styles.progressGlow} />
                                </motion.div>
                            </div>
                            <div className={styles.progressText}>
                                {Math.round(progress)}%
                            </div>
                        </div>

                        {/* Loading Text with Animation */}
                        <motion.div 
                            className={styles.loadingText}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <span className={styles.loadingDots}>
                                <span>.</span>
                                <span>.</span>
                                <span>.</span>
                            </span>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlobalLoading;