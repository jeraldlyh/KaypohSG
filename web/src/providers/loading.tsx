'use client';

import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { Fragment, useEffect, useState } from 'react';
import mapAnimation from '../assets/mapAnimation.json';
import { useAuth } from '../hooks';

interface IProps {
  children: React.ReactNode;
}

export const LoadingProvider = ({ children }: IProps) => {
  /* -------------------------------------------------------------------------- */
  /*                                    STATE                                   */
  /* -------------------------------------------------------------------------- */
  const auth = useAuth();
  const [showAnimation, setShowAnimation] = useState<boolean>(true);

  useEffect(() => {
    if (auth.isLoading) {
      setShowAnimation(true);
    } else {
      const timeoutId = setTimeout(() => {
        setShowAnimation(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [auth.isLoading]);

  /* -------------------------------------------------------------------------- */
  /*                                   RENDER                                   */
  /* -------------------------------------------------------------------------- */
  return (
    <Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showAnimation ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {showAnimation && (
          <div className="flex h-screen w-screen items-center justify-center bg-neutral-content">
            <Lottie className="w-screen" animationData={mapAnimation} />
          </div>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: !showAnimation ? 1 : 0 }}
        transition={{ duration: 1 }}
      >
        {children}
      </motion.div>
    </Fragment>
  );
};
