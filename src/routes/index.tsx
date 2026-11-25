import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Moon, Sun, Menu, X, Download, ArrowRight, FolderGit2, Briefcase, Mail, ExternalLink,
  GraduationCap, Award, Code2, Palette, Terminal, GitBranch, Smartphone, FileCode,
  MessageCircle, Users, Lightbulb, Clock, BookOpen, ArrowUp, Send, CheckCircle2, AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex Vadruis — Aspiring Web Developer Portfolio" },
      { name: "description", content: "Web Programming student at Passerelles numériques Cambodia building modern, user-friendly websites." },
      { property: "og:title", content: "Alex Vadruis — Aspiring Web Developer" },
      { property: "og:description", content: "Projects, skills and contact for Alex Vadruis, PNC Web Programming Gen 2027." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

/* ---------- Editable content: change values here ---------- */
const PROFILE = {
  name: "Alex Vadruis",
  email: "alex.vadruis@example.com", // TODO: replace with real email
  github: "https://github.com/", // TODO
  linkedin: "https://www.linkedin.com/", // TODO
  cv: "#", // TODO: link to your CV PDF
};
const TITLES = ["Aspiring Web Developer", "Frontend Developer", "Creative Problem Solver"];
const NAV = ["home", "about", "skills", "projects", "education", "certificates", "contact"];

// Levels (0–100) — keep honest, adjust as you grow
const TECH = [
  { name: "HTML5", level: 80, icon: FileCode },
  { name: "CSS3", level: 75, icon: Palette },
  { name: "JavaScript", level: 60, icon: Code2 },
  { name: "Python", level: 55, icon: Terminal },
  { name: "Git & GitHub", level: 60, icon: GitBranch },
  { name: "Responsive Design", level: 70, icon: Smartphone },
];
const SOFT = [
  { name: "Communication", icon: MessageCircle },
  { name: "Teamwork", icon: Users },
  { name: "Problem-solving", icon: Lightbulb },
  { name: "Time Management", icon: Clock },
  { name: "Continuous Learning", icon: BookOpen },
];
const PROJECTS = [
  { title: "DevPortfolio", sub: "Personal Developer Portfolio", desc: "A responsive portfolio with theme switching, animations and a validated contact form.", tech: ["HTML", "CSS", "JavaScript"] },
  { title: "Englify", sub: "Online English Learning Platform", desc: "Lessons, quizzes and progress tracking to help learners practice English online.", tech: ["HTML", "CSS", "JavaScript"] },
  { title: "Smart Calculator", sub: "Python GUI Application", desc: "A desktop calculator with a clean graphical interface and history of results.", tech: ["Python", "Tkinter"] },
  { title: "PNC Login Page", sub: "Student Login Interface", desc: "An accessible, mobile-friendly login screen with input validation.", tech: ["HTML", "CSS"] },
];
const CERTS = [
  { title: "Programming Certificates", desc: "Add your coding course certificates." },
  { title: "Online Learning", desc: "Courses from online learning platforms." },
  { title: "Workshops & Seminars", desc: "Tech events and training you attended." },
  { title: "Competitions", desc: "Hackathons and contests you joined." },
  { title: "Academic Achievements", desc: "Awards and recognitions at PNC." },
];

/* ---------- Hooks ---------- */
function useTyping(words: string[]) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length] ?? "";
    const done = !del && text === word;
    const empty = del && text === "";
    const t = setTimeout(() => {
      if (done) return setDel(true);
      if (empty) { setDel(false); setI((n) => n + 1); return; }
      setText(word.slice(0, text.length + (del ? -1 : 1)));
    }, done ? 1600 : del ? 40 : 85);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

function Portfolio() {
  const [dark, setDark] = useState(false);
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("home");
  const [showTop, setShowTop] = useState(false);
  const typed = useTyping(TITLES);

  useEffect(() => { setDark(document.documentElement.classList.contains("dark")); }, []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  // Scroll reveal + active nav
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    const nav = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    NAV.forEach((id) => { const el = document.getElementById(id); if (el) nav.observe(el); });
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => { io.disconnect(); nav.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div className="relative">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#home" className="font-display text-lg font-bold"><span className="text-brand">AV</span>.dev</a>
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={`rounded-full px-3 py-2 text-sm font-medium capitalize transition-colors ${active === id ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}>{id}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} aria-label="Toggle theme" className="grid h-10 w-10 place-items-center rounded-full border border-border transition-transform hover:rotate-12 hover:bg-accent">
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button onClick={() => setMenu(!menu)} aria-label="Menu" aria-expanded={menu} className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden">
              {menu ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
        <div className={`overflow-hidden transition-[max-height] duration-500 lg:hidden ${menu ? "max-h-96" : "max-h-0"}`}>
          <ul className="space-y-1 px-5 pb-4">
            {NAV.map((id) => (
              <li key={id}><a onClick={() => setMenu(false)} href={`#${id}`} className={`block rounded-lg px-3 py-2 capitalize ${active === id ? "bg-accent text-accent-foreground" : ""}`}>{id}</a></li>
            ))}
          </ul>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section id="home" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
          <div aria-hidden className="float pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div aria-hidden className="float pointer-events-none absolute top-40 -right-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl [animation-delay:-4s]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.3fr_1fr]">
            <div className="reveal">
              <p className="font-medium text-primary">Hello, I'm</p>
              <h1 className="mt-2 text-4xl font-extrabold sm:text-5xl lg:text-6xl">{PROFILE.name}</h1>
              <p className="mt-4 h-9 font-display text-xl font-semibold sm:text-2xl">
                <span className="text-brand">{typed}</span><span className="caret text-primary">|</span>
              </p>
              <p className="mt-5 max-w-xl text-muted-foreground">
                Web Programming student at Passerelles numériques Cambodia, passionate about building modern, useful and user-friendly websites.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Btn href={PROFILE.cv}><Download size={18} /> Download CV</Btn>
                <Btn href="#projects" variant="outline">View My Projects <ArrowRight size={18} /></Btn>
              </div>
              <Socials className="mt-8" />
            </div>
            <div className="reveal mx-auto">
              <div className="relative rounded-full bg-brand p-1.5 shadow-glow">
                {/* Replace with <img src="your-photo.jpg" alt="Portrait of Alex Vadruis" /> */}
                <div role="img" aria-label="Profile photo placeholder" className="grid h-60 w-60 place-items-center rounded-full bg-card font-display text-6xl font-extrabold sm:h-72 sm:w-72">
                  <span className="text-brand">AV</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" eyebrow="About Me" title="Learning to build the web, one project at a time">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="reveal space-y-4 text-muted-foreground">
              <p>I'm Alex Vadruis, a Web Programming student at Passerelles numériques Cambodia (PNC), Generation 2027. I love turning ideas into clean, responsive interfaces and learning how great products are built.</p>
              <p>My goal is to become a professional Web Developer who creates modern, useful and user-friendly websites and web applications that make a real difference for people.</p>
            </div>
            <div className="reveal grid gap-4 sm:grid-cols-2">
              <Info title="Education" text="PNC — Web Programming, Gen 2027" />
              <Info title="Career Goal" text="Professional Web Developer" />
              <Info title="Interests" text="Web Dev, Programming, Tech, UI/UX" />
              <Info title="Strengths" text="Curious, reliable, detail-oriented" />
            </div>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" eyebrow="Skills" title="What I work with" muted>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TECH.map((s) => <SkillCard key={s.name} {...s} />)}
          </div>
          <h3 className="reveal mt-14 text-xl font-bold">Soft skills</h3>
          <div className="reveal mt-5 flex flex-wrap gap-3">
            {SOFT.map(({ name, icon: I }) => (
              <span key={name} className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-soft"><I size={16} className="text-primary" />{name}</span>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" eyebrow="Featured Projects" title="Things I've built">
          <div className="grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p, idx) => (
              <article key={p.title} className="reveal group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glow">
                {/* Replace this block with a real screenshot <img> */}
                <div className="relative grid aspect-video place-items-center overflow-hidden bg-brand">
                  <span className="font-display text-3xl font-extrabold text-primary-foreground/90 transition-transform duration-500 group-hover:scale-110">{p.title}</span>
                  <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">Example · verify</span>
                  <span className="absolute right-3 bottom-3 font-display text-5xl font-extrabold text-primary-foreground/20">0{idx + 1}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{p.title} <span className="font-sans text-base font-medium text-muted-foreground">— {p.sub}</span></h3>
                  <p className="mt-2 text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tech.map((t) => <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">{t}</span>)}
                  </div>
                  <div className="mt-6 flex gap-3">
                    <Btn href="#" small><ExternalLink size={16} /> Live Demo</Btn>
                    <Btn href={PROFILE.github} small variant="outline"><FolderGit2 size={16} /> GitHub</Btn>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Education */}
        <Section id="education" eyebrow="Education" title="My learning journey" muted>
          <ol className="relative ml-3 border-l-2 border-primary/30">
            <li className="reveal mb-4 ml-8">
              <span className="absolute -left-[17px] grid h-8 w-8 place-items-center rounded-full bg-brand text-primary-foreground shadow-glow"><GraduationCap size={16} /></span>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <p className="text-sm font-semibold text-primary">Generation 2027</p>
                <h3 className="mt-1 text-xl font-bold">Passerelles numériques Cambodia (PNC)</h3>
                <p className="mt-1 font-medium">Web Programming</p>
                <p className="mt-3 text-muted-foreground">Studying front-end and back-end web development, databases, software engineering practices and professional English, alongside soft-skills training.</p>
              </div>
            </li>
          </ol>
        </Section>

        {/* Certificates */}
        <Section id="certificates" eyebrow="Certificates & Achievements" title="Recognition along the way">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CERTS.map((c) => (
              <div key={c.title} className="reveal rounded-2xl border border-dashed border-primary/40 bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground"><Award size={20} /></div>
                <h3 className="mt-4 font-bold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Verify link <ExternalLink size={14} /></a>
              </div>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" eyebrow="Contact" title="Let's work together" muted>
          <div className="grid gap-8 md:grid-cols-[1fr_1.4fr]">
            <div className="reveal space-y-4">
              <p className="text-muted-foreground">Open to internships, collaborations and freelance projects. I'd love to hear from you.</p>
              <ContactRow icon={<Mail size={18} />} label="Email" href={`mailto:${PROFILE.email}`} value={PROFILE.email} />
              <ContactRow icon={<FolderGit2 size={18} />} label="GitHub" href={PROFILE.github} value="github.com/your-username" />
              <ContactRow icon={<Briefcase size={18} />} label="LinkedIn" href={PROFILE.linkedin} value="linkedin.com/in/your-profile" />
            </div>
            <ContactForm />
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold">{PROFILE.name}</p>
            <p className="text-sm text-muted-foreground">Aspiring Web Developer</p>
          </div>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {NAV.map((id) => <li key={id}><a href={`#${id}`} className="capitalize text-muted-foreground hover:text-primary">{id}</a></li>)}
          </ul>
          <Socials />
        </div>
        <p className="border-t border-border py-5 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Alex Vadruis. All rights reserved.</p>
      </footer>

      <a href="#home" aria-label="Back to top" className={`fixed right-5 bottom-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-brand text-primary-foreground shadow-glow transition-all hover:-translate-y-1 ${showTop ? "opacity-100" : "pointer-events-none opacity-0"}`}>
        <ArrowUp size={20} />
      </a>
    </div>
  );
}

/* ---------- Small components ---------- */
function Section({ id, eyebrow, title, muted, children }: { id: string; eyebrow: string; title: string; muted?: boolean; children: ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-16 py-20 md:py-28 ${muted ? "bg-muted" : ""}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="reveal mb-12 max-w-2xl">
          <p className="text-sm font-bold tracking-widest text-primary uppercase">{eyebrow}</p>
          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Btn({ href, children, variant = "solid", small }: { href: string; children: ReactNode; variant?: "solid" | "outline"; small?: boolean }) {
  const base = `inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 ${small ? "px-4 py-2 text-sm" : "px-6 py-3"}`;
  const v = variant === "solid" ? "bg-brand text-primary-foreground shadow-glow" : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground";
  return <a href={href} className={`${base} ${v}`}>{children}</a>;
}

function Socials({ className = "" }: { className?: string }) {
  const items = [
    { href: PROFILE.github, icon: FolderGit2, label: "GitHub" },
    { href: PROFILE.linkedin, icon: Briefcase, label: "LinkedIn" },
    { href: `mailto:${PROFILE.email}`, icon: Mail, label: "Email" },
  ];
  return (
    <div className={`flex gap-3 ${className}`}>
      {items.map(({ href, icon: I, label }) => (
        <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary hover:text-primary"><I size={18} /></a>
      ))}
    </div>
  );
}

function Info({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <p className="text-sm font-bold text-primary">{title}</p>
      <p className="mt-1 text-sm">{text}</p>
    </div>
  );
}

function SkillCard({ name, level, icon: I }: { name: string; level: number; icon: typeof Code2 }) {
  const [on, setOn] = useState(false);
  return (
    <div ref={(el) => {
      if (!el || on) return;
      const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { setOn(true); io.disconnect(); } });
      io.observe(el);
    }} className="reveal rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground"><I size={20} /></div>
        <h3 className="flex-1 font-bold">{name}</h3>
        <span className="text-sm font-semibold text-muted-foreground">{level}%</span>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuenow={level} aria-valuemin={0} aria-valuemax={100} aria-label={name}>
        <div className="h-full rounded-full bg-brand transition-[width] duration-1000 ease-out" style={{ width: on ? `${level}%` : 0 }} />
      </div>
    </div>
  );
}

function ContactRow({ icon, label, value, href }: { icon: ReactNode; label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand text-primary-foreground">{icon}</span>
      <span><span className="block text-xs text-muted-foreground">{label}</span><span className="font-semibold break-all">{value}</span></span>
    </a>
  );
}

function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"" | "ok" | "err">("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const errs: Record<string, string> = {};
    if (name.length < 2) errs["name"] = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs["email"] = "Please enter a valid email.";
    if (message.length < 10) errs["message"] = "Message should be at least 10 characters.";
    setErrors(errs);
    if (Object.keys(errs).length) return setStatus("err");
    // No email service connected: open the visitor's email app with the message filled in.
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent("Portfolio message from " + name)}&body=${encodeURIComponent(message + "\n\n— " + name + " (" + email + ")")}`;
    setStatus("ok");
  };

  const field = "mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/30";
  return (
    <form noValidate onSubmit={submit} className="reveal space-y-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
      {(["name", "email"] as const).map((k) => (
        <label key={k} className="block text-sm font-semibold capitalize">{k}
          <input name={k} type={k === "email" ? "email" : "text"} className={field} aria-invalid={!!errors[k]} />
          {errors[k] && <span className="mt-1 block text-xs text-destructive">{errors[k]}</span>}
        </label>
      ))}
      <label className="block text-sm font-semibold">Message
        <textarea name="message" rows={5} className={field} aria-invalid={!!errors["message"]} />
        {errors["message"] && <span className="mt-1 block text-xs text-destructive">{errors["message"]}</span>}
      </label>
      <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-primary-foreground shadow-glow transition-transform hover:-translate-y-0.5"><Send size={16} /> Send Message</button>
      {status === "ok" && <p role="status" className="flex items-center gap-2 text-sm text-success"><CheckCircle2 size={16} /> Your email app should open with the message ready — press send there to deliver it.</p>}
      {status === "err" && <p role="alert" className="flex items-center gap-2 text-sm text-destructive"><AlertCircle size={16} /> Please fix the highlighted fields.</p>}
    </form>
  );
}
