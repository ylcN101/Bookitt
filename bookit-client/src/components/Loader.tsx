import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface LoaderProps {
  isLoading: boolean
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <div className="h-screen">
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}></motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default Loader
