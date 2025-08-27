'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Zap, Play } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{
      background: `linear-gradient(135deg, #4F5D95 0%, #F4C724 100%)`
    }}>
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          TestApp22
        </div>
        <div className="flex gap-4">
          <Link 
            href="/app"
            className="bg-white text-black px-6 py-2 rounded-full font-medium hover:bg-opacity-90 transition-colors"
            style={{ color: '#4F5D95' }}
          >
            Open App
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Test with Node.js 22
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Experience the future of utility with our innovative platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/app"
              className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-2"
              style={{ color: '#4F5D95' }}
            >
              <Play className="w-5 h-5" />
              Try Now - It's Free
            </Link>
            
            <Link
              href="#demo"
              className="text-white border border-white/30 px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              See How It Works
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="demo" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            What You Can Do
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center"
          >
            <div className="mb-6">
              <Star className="w-12 h-12 text-white mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Node 22 support
            </h3>
            <p className="text-white/80">
              Powerful feature to enhance your experience
            </p>
          </motion.div>
        </div>

        <div className="text-center">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform"
            style={{ color: '#4F5D95' }}
          >
            Start Using TestApp22
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 text-center border-t border-white/10">
        <p className="text-white/60">
          © 2024 TestApp22. Built with Go To Factory.
        </p>
      </footer>
    </div>
  )
}