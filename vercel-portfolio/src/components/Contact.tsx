import { motion } from 'framer-motion';
import { Linkedin, Github, MapPin, Send, BarChart3, Code2 } from 'lucide-react';

const contactMethods = [
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/MaiconKevyn',
    href: 'https://github.com/MaiconKevyn',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/maiconkevyn',
    href: 'https://www.linkedin.com/in/maiconkevyn/',
    color: 'from-cyan-500 to-teal-500',
  },
  {
    icon: BarChart3,
    label: 'Kaggle',
    value: 'kaggle.com/kevynmaicon',
    href: 'https://www.kaggle.com/kevynmaicon',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    icon: Code2,
    label: 'LeetCode',
    value: 'leetcode.com/u/maiconkevyn',
    href: 'https://leetcode.com/u/maiconkevyn/',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Brazil',
    color: 'from-emerald-500 to-green-500',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-lg">
            Open to opportunities in AI Engineering, Machine Learning, and Data Science
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 hover:border-cyan-400/50 transition-all"
            >
              {method.href ? (
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block text-center"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${method.color} rounded-full mb-4`}
                  >
                    <method.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-white font-semibold mb-2">{method.label}</h3>
                  <p className="text-gray-400 text-sm break-words">{method.value}</p>
                </a>
              ) : (
                <div className="text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r ${method.color} rounded-full mb-4`}
                  >
                    <method.icon className="w-7 h-7 text-white" />
                  </motion.div>
                  <h3 className="text-white font-semibold mb-2">{method.label}</h3>
                  <p className="text-gray-400 text-sm">{method.value}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl p-12 border border-blue-500/20 text-center"
        >
          <Send className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to build something useful?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            The best entry points to my work today are GitHub, LinkedIn, Kaggle, and the featured repositories above. If you are hiring for AI Engineer or Data Scientist roles, LinkedIn is the fastest way to reach me.
          </p>
          <motion.a
            href="https://www.linkedin.com/in/maiconkevyn/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-shadow"
          >
            <Linkedin size={20} />
            Connect on LinkedIn
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>© 2026 Maicon Kevyn. Crafted with passion and code.</p>
          <p className="mt-2">Hint: Try pressing Ctrl + Shift + N for a surprise! 🎨</p>
        </motion.div>
      </div>
    </section>
  );
}
