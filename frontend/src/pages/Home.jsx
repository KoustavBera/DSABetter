import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  ArrowRight,
  Target,
  Clock,
  BarChart3,
  CheckCircle,
  Plus,
  Search,
  TrendingUp,
  MessageSquare,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "../components/Nav";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Banner from "../components/Banner";

const Home = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const testimonialRef = useRef(null);
  const navigate = useNavigate();
  const [openFAQ, setOpenFAQ] = React.useState(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(".hero-badge", {
      duration: 0.8,
      y: 30,
      opacity: 0,
      ease: "power3.out",
    })
      .from(
        ".hero-title",
        {
          duration: 1,
          y: 50,
          opacity: 0,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        ".hero-subtitle",
        {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        ".hero-stats",
        {
          duration: 0.6,
          y: 30,
          opacity: 0,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.4"
      );

    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".testimonial-content", {
      scrollTrigger: {
        trigger: testimonialRef.current,
        start: "top 80%",
      },
      duration: 1,
      scale: 0.9,
      opacity: 0,
      ease: "power3.out",
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: <Plus className="w-7 h-7" />,
      title: "Smart Question Management",
      description:
        "Add, organize, and track DSA questions with comprehensive notes and revision status.",
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: "Intelligent Revision System",
      description:
        "Automated scheduling with spaced repetition based on your performance patterns.",
    },
    {
      icon: <Search className="w-7 h-7" />,
      title: "Advanced Search & Filter",
      description:
        "Find questions instantly by topic, difficulty, platform, or custom tags.",
    },
    {
      icon: <BarChart3 className="w-7 h-7" />,
      title: "Progress Analytics",
      description:
        "Beautiful charts and insights to track your improvement over time.",
    },
  ];

  const stats = [
    {
      number: "100%",
      label: "DSA Focused",
      icon: <Target className="w-5 h-5" />,
    },
    {
      number: "Smart",
      label: "Analytics",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    { number: "24/7", label: "Tracking", icon: <Clock className="w-5 h-5" /> },
    {
      number: "Custom",
      label: "Sheets",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const faqs = [
    {
      question: "What is DSABetter?",
      answer:
        "DSABetter is a platform designed to help you master Data Structures & Algorithms (DSA) through intelligent revision tracking, analytics, and question management.",
    },
    {
      question: "How does the revision system work?",
      answer:
        "DSABetter uses several gamification to help you revise and track your confidence level. On each question you add its revision count is increased for the day if you click on it. A revision count of 1 is assumed to be newbie level and a revision count of more than 3 is considered safe.",
    },
    {
      question: "Can I add my own DSA questions?",
      answer:
        "Yes! You can add, organize, and track your own DSA questions, along with notes and revision status.",
    },
    {
      question: "What analytics are available?",
      answer:
        "The app provides progress charts, revision streaks, and difficulty breakdowns to help you monitor your improvement over time.",
    },
    {
      question: "Is DSABetter free to use?",
      answer:
        "Yes, DSABetter is currently free and open-source. You can also view the code and contribute on GitHub.",
    },
    {
      question: "How do I get started?",
      answer:
        'Simply click "Start Revising Now" on the homepage to sign up or log in and begin your DSA journey.',
    },
    {
      question: "Who can I contact for support?",
      answer:
        'For support or feedback, use the "Contact" link in the footer or open an issue on our GitHub repository.',
    },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Banner />
      <Nav />
      {/* Hero Section */}
      <section ref={heroRef} className="relative px-6 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="hero-badge inline-flex items-center bg-gray-900 text-white rounded-full px-6 py-2 mb-8 text-sm font-medium"
            whileHover={{ scale: 1.05 }}
          >
            <Target className="w-4 h-4 mr-2" />
            Transform Your DSA Practice
          </motion.div>

          {/* Main Title */}
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 leading-tight">
            REVISE DSA
            <span className="block text-gray-900 mt-2">EFFECTIVELY</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Master Data Structures & Algorithms with intelligent revision
            tracking, comprehensive analytics, and seamless question management.
          </p>

          {/* CTA Buttons */}
          <motion.div
            className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              variants={itemVariants}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all flex items-center justify-center group shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/login")}
            >
              Start Revising Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              variants={itemVariants}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:border-gray-900 hover:text-gray-900 transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="https://github.com/KoustavBera/DSABetter/tree/main">
                View Demo
              </Link>
            </motion.button>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="hero-stats bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all"
                whileHover={{ y: -5 }}
              >
                <div className="text-gray-900 mb-3 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Everything You Need to
              <span className="block mt-2">Master DSA</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed for efficient learning and revision
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card bg-gray-50 rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all cursor-pointer group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="bg-gray-900 text-white p-3 rounded-xl mb-6 w-fit group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Track Your Progress
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Beautiful analytics dashboard with insights that keep you
              motivated
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Weekly Progress */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-gray-200"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Weekly Progress</h3>
                <div className="bg-gray-900 text-white p-2 rounded-lg">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="h-24 bg-gray-100 rounded-lg flex items-end justify-around p-3">
                {[60, 80, 100, 70, 90].map((height, i) => (
                  <motion.div
                    key={i}
                    className="bg-gray-900 w-4 rounded-sm"
                    style={{ height: `${height}%` }}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Questions solved:{" "}
                <span className="font-bold text-gray-900">42</span>
              </p>
            </motion.div>

            {/* Revision Calendar */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-gray-200"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Revision Calendar</h3>
                <div className="bg-gray-900 text-white p-2 rounded-lg">
                  <Clock className="w-4 h-4" />
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: 21 }, (_, i) => (
                  <motion.div
                    key={i}
                    className={`w-6 h-6 rounded text-xs flex items-center justify-center ${
                      i % 4 === 0
                        ? "bg-gray-900 text-white"
                        : i % 7 === 0
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: i * 0.02, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    {i + 1}
                  </motion.div>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-3">
                Current streak:{" "}
                <span className="font-bold text-gray-900">12 days</span>
              </p>
            </motion.div>

            {/* Difficulty Mix */}
            <motion.div
              className="bg-white rounded-xl p-6 border border-gray-200"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Difficulty Mix</h3>
                <div className="bg-gray-900 text-white p-2 rounded-lg">
                  <Target className="w-4 h-4" />
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Easy", percentage: 65, color: "bg-gray-400" },
                  { label: "Medium", percentage: 25, color: "bg-gray-600" },
                  { label: "Hard", percentage: 10, color: "bg-gray-900" },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {item.label}
                      </span>
                      <span className="font-bold text-gray-900">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full ${item.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percentage}%` }}
                        transition={{ delay: i * 0.2, duration: 0.8 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section ref={testimonialRef} className="px-6 py-20 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            className="testimonial-content bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-16 border border-gray-200 shadow-lg"
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-center mb-6">
              <div className="bg-gray-900 text-white p-4 rounded-full">
                <MessageSquare className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Share Your Success Story
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Help other developers by sharing your experience with DSABetter.
              Your testimonial could inspire someone to start their coding
              journey!
            </p>
            <motion.a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfO0Tb9RYotsWI2nmXH7asTYLTyZ9Z8nPccEneCpAaqUy0BiQ/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all inline-flex items-center group shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Give a Testimonial
              <ExternalLink className="ml-3 w-5 h-5 group-hover:scale-110 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about DSABetter
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0">
                    {openFAQ === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
