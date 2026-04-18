import { motion } from 'framer-motion';
import { Linkedin, Github, MapPin, Send, Mail, FileDown } from 'lucide-react';

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
    icon: Mail,
    label: 'Email',
    value: 'osonodenewton@gmail.com',
    href: 'mailto:osonodenewton@gmail.com',
    color: 'from-teal-500 to-emerald-500',
  },
  {
    icon: FileDown,
    label: 'CV',
    value: 'Download PDF',
    href: '/MaiconKevyn_cv.pdf',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Brazil · Remote-friendly',
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
            Open to AI Engineer, GenAI Engineer, and Data Scientist opportunities across LLM systems, retrieval, and applied ML
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-12 md:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {contactMethods.map((method, index) => {
            const cardContent = (
              <>
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${method.color} mb-4 shadow-lg shadow-black/40 transition-transform duration-300 group-hover:scale-110`}
                >
                  <method.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-white">{method.label}</h3>
                <p className="break-words text-xs leading-relaxed text-slate-400">{method.value}</p>
              </>
            );

            const commonClasses = 'group block h-full rounded-2xl border border-white/10 bg-slate-900/40 p-5 text-center backdrop-blur-sm transition-all hover:border-cyan-400/40 hover:bg-slate-900/60';

            return (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -3 }}
              >
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className={commonClasses}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <div className={commonClasses}>{cardContent}</div>
                )}
              </motion.div>
            );
          })}
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
            The best entry points to my work today are LinkedIn, GitHub, and the CV above. If you are hiring for AI Engineer or GenAI roles, email or LinkedIn are the fastest ways to reach me.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="/MaiconKevyn_cv.pdf"
              download="MaiconKevyn_cv.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-shadow"
            >
              <FileDown size={20} />
              Download CV
            </motion.a>
            <motion.a
              href="mailto:osonodenewton@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-white font-semibold border border-white/10 bg-white/5"
            >
              <Mail size={20} />
              Email Me
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center text-gray-500 text-sm"
        >
          <p>© 2026 Maicon Kevyn. Built with React, Vite, Tailwind, Framer Motion, and Three.js.</p>
          <p className="mt-2">Hint: Try pressing Ctrl + Shift + N for a surprise.</p>
        </motion.div>
      </div>
    </section>
  );
}
