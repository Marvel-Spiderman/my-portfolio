"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa6";
import { TbMail, TbBrandGithub, TbBrandLinkedin, TbSend, TbMapPin, TbBriefcase, TbCheck } from "react-icons/tb";
import { CheckCircle2, Globe2, Zap } from "lucide-react";
import { audioSynth } from "../../utils/audioSynth";
import { usePortfolioStore } from "../../store/portfolioStore";

const statusBadges = [
  { icon: <CheckCircle2 size={18} color="#10b981" />, label: "Available", detail: "Open to Opportunities" },
  { icon: <Globe2 size={18} color="#0ea5e9" />, label: "Location", detail: "India · Remote OK" },
  { icon: <Zap size={18} color="#f59e0b" />, label: "Response", detail: "Usually within 24h" },
];

export default function Contact() {
  const { activeUniverse } = usePortfolioStore();
  const isIllustration = activeUniverse === "universe-illustration";

  const githubColor = isIllustration ? "#2b3137" : "#ffffff";
  const githubBg = isIllustration ? "#f6f8fa" : "#24292f";

  const contactLinks = [
    {
      icon: TbMail,
      label: "Email",
      value: "rounitraj12@gmail.com",
      href: "mailto:rounitraj12@gmail.com",
      color: "#ea4335",
      bg: isIllustration ? "#fef2f2" : "#ea4335",
      iconColor: isIllustration ? "#ea4335" : "#ffffff",
      desc: "Best for project inquiries",
    },
    {
      icon: TbBrandLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/rounit-raj",
      href: "https://www.linkedin.com/in/rounit-raj/",
      color: "#0a66c2",
      bg: isIllustration ? "#f0f9ff" : "#0a66c2",
      iconColor: isIllustration ? "#0a66c2" : "#ffffff",
      desc: "Connect professionally",
    },
    {
      icon: TbBrandGithub,
      label: "GitHub",
      value: "github.com/Marvel-Spiderman",
      href: "https://github.com/Marvel-Spiderman",
      color: isIllustration ? "#2b3137" : "#ffffff",
      bg: isIllustration ? "#f6f8fa" : "#24292f",
      iconColor: isIllustration ? "#2b3137" : "#ffffff",
      desc: "Open-source & code",
    },
  ];

  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioSynth.playUnlock?.();
    setSent(true);
    setName(""); setEmail(""); setMessage("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      viewport={{ once: true, margin: "-80px" }}
      className="py-24"
      id="contact"
      style={{ borderTop: "1px solid var(--border-primary)" }}
    >
      <div className="container mx-auto px-5 lg:px-28 space-y-16">

        {/* Section Header */}
        <div className="text-center space-y-4">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{ background: "var(--bg-card)", color: "var(--accent)", border: "1px solid var(--border-primary)" }}
          >
            Let's Talk
          </span>
          <h2 className="text-3xl lg:text-4xl font-black text-readable" style={{ color: "var(--text-primary)" }}>
            Get In{" "}
            <span style={{
              background: "var(--theme-gradient)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>Touch</span>
          </h2>
          <div className="text-panel max-w-xl mx-auto">
            <p className="text-sm lg:text-base leading-relaxed" style={{ color: "var(--text-body, var(--text-muted))" }}>
              I'm actively looking for new opportunities — whether it's a full-time role, a freelance project, or just a great conversation about{" "}
              <strong className="text-highlight">AI, distributed systems</strong>, or{" "}
              <strong className="text-highlight">creative frontend experiences</strong>.
            </p>
          </div>
        </div>

        {/* Status badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {statusBadges.map(({ icon, label, detail }) => (
            <div
              key={label}
              className="flex items-center gap-3 px-4 py-2.5 rounded-full"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
            >
              <div className="flex items-center justify-center">{icon}</div>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</p>
                <p className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left: Contact cards */}
          <div className="space-y-5">
            <h3 className="text-lg font-black text-readable" style={{ color: "var(--text-primary)" }}>
              Reach Out Directly
            </h3>
            <div className="space-y-4 font-sans-clean">
              {contactLinks.map(({ icon: Icon, label, value, href, color, bg, iconColor, desc }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  onClick={() => audioSynth.playClick()}
                  onMouseEnter={() => audioSynth.playHover()}
                  className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer group"
                  style={{
                    background: "var(--bg-card)",
                    border: "1.5px solid var(--border-primary)",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.25s ease",
                  }}
                  whileHover={{
                    scale: 1.02,
                    borderColor: color,
                    boxShadow: `0 4px 24px ${color}25`,
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Icon bubble */}
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                    style={{ background: bg, color: iconColor }}
                  >
                    <Icon size={22} />
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                      {label}
                    </p>
                    <p className="text-sm font-bold truncate" style={{ color: "var(--text-primary)" }}>
                      {value}
                    </p>
                    <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>{desc}</p>
                  </div>
                  {/* Arrow */}
                  <span
                    className="text-lg opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1"
                    style={{ color, display: "inline-block" }}
                  >
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: Quick message form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
            className="p-6 rounded-3xl space-y-5"
            style={{
              background: "var(--bg-card)",
              border: "1.5px solid var(--border-primary)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div className="space-y-1">
              <h3 className="text-lg font-black text-readable" style={{ color: "var(--text-primary)" }}>
                Send a Message 💬
              </h3>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Drop me a note — I'll get back to you promptly.
              </p>
            </div>

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-3 py-10 rounded-2xl"
                style={{ background: "#10b98118", border: "1.5px solid #10b98140" }}
              >
                <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "#10b981" }}>
                  <TbCheck size={28} color="white" />
                </div>
                <p className="text-base font-black" style={{ color: "#10b981" }}>Message sent!</p>
                <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                  Thanks for reaching out. I'll be in touch soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { id: "name", label: "Your Name", type: "text", value: name, set: setName, placeholder: "Jane Smith" },
                  { id: "email", label: "Email Address", type: "email", value: email, set: setEmail, placeholder: "jane@example.com" },
                ].map(({ id, label, type, value, set, placeholder }) => (
                  <div key={id} className="space-y-1.5">
                    <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider block" style={{ color: "var(--text-muted)" }}>
                      {label}
                    </label>
                    <input
                      id={id}
                      type={type}
                      value={value}
                      required
                      onChange={(e) => set(e.target.value)}
                      placeholder={placeholder}
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none border"
                      style={{
                        background: "var(--bg-card)",
                        border: "1px solid var(--border-primary)",
                        color: "var(--text-primary)",
                      }}
                      onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--accent)"; }}
                      onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = "var(--border-primary)"; }}
                    />
                  </div>
                ))}

                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider block" style={{ color: "var(--text-muted)" }}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project, role, or just say hi..."
                    className="w-full px-4 py-2.5 rounded-xl text-sm font-medium outline-none border resize-none"
                    style={{
                      background: "var(--bg-card)",
                      border: "1px solid var(--border-primary)",
                      color: "var(--text-primary)",
                    }}
                    onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "var(--border-primary)"; }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm cursor-pointer"
                  style={{ background: "var(--theme-gradient)", color: "#fff" }}
                  whileHover={{ scale: 1.02, opacity: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TbSend size={16} />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
