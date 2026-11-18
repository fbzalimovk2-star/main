import { useEffect, useState } from "react";
import ShaderBackground from "./ShaderBackground.jsx";
import { FaGithub } from "react-icons/fa6";
import { FiArrowRight, FiArrowDown, FiArrowUp, FiExternalLink, FiMail, FiMapPin } from "react-icons/fi";
import { SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPostgresql } from "react-icons/si";

/* ====== Редактируйте контент здесь ====== */
const profile = {
  name: "Kamil Abzalimov",
  lead: "Web",
  role: "Developer",
  tagline: "I build fast, modern and scalable web applications with a focus on great user experience.",
  about: "I'm a passionate web developer with 3+ years of experience in building web applications. I love turning ideas into performant and user-friendly products.",
  email: "fbzalimovk2@gmail.com",
  city: "Astana, Kazakhstan",
  socials: [
    { label: "GitHub", href: "https://github.com/", Icon: FaGithub },
    { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=fbzalimovk2@gmail.com", Icon: FiMail },
  ],
};
const nav = ["Home", "About", "Projects", "Skills", "Contact"];
const skills = [
  { name: "React", Icon: SiReact, color: "#61dafb" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178c6" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#6cc24a" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#5b8fc7" },
];
const projects = [
  { title: "Chesterfield", text: "A modern React website with a clean, responsive design.", tags: ["React", "Cloudflare"], art: "art-1", href: "https://chesterfield-react.fbzalimovk2.workers.dev" },
  { title: "Noir Studio", text: "A dark, stylish website for a creative studio.", tags: ["React", "Cloudflare"], art: "art-2", href: "https://noir-studio.fbzalimovk2.workers.dev" },
  { title: "Sakura Restaurant", text: "A restaurant website with menu and a warm look.", tags: ["React", "Cloudflare"], art: "art-3", href: "https://sakura-restaurant.fbzalimovk2.workers.dev" },
];
/* ======================================= */

export default function App() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    nav.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <>
      <header className="nav">
        <a href="#home" className="logo">JD</a>
        <nav aria-label="Main">
          {nav.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`} className={active === n.toLowerCase() ? "on" : ""}>{n}</a>
          ))}
        </nav>
        <a href="#contact" className="btn ghost sm">Let's Talk <FiArrowRight /></a>
      </header>

      <main>
        <section id="home" className="hero">
          <ShaderBackground />
          <div className="wrap">
            <span className="pill">Hello, I'm</span>
            <h1>
              {profile.name}
              <span className="h1-role"><b>{profile.lead}</b> {profile.role}</span>
            </h1>
            <p className="lead">{profile.tagline}</p>
            <div className="row">
              <a href="#projects" className="btn solid">View My Projects <FiArrowDown /></a>
              <a href="#contact" className="btn ghost">Contact Me</a>
            </div>
            <div className="socials">
              {profile.socials.map(({ label, href, Icon }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer"><Icon /></a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="wrap about">
          <div>
            <span className="bar" />
            <h2>About <em>Me</em></h2>
            <p className="quote">{profile.about}</p>
            <a href="#contact" className="btn ghost sm">Learn More <FiArrowRight /></a>
          </div>
          <div id="skills" className="skills">
            {skills.map(({ name, Icon, color }) => (
              <div key={name} className="skill">
                <Icon size={44} color={color} />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="wrap">
          <span className="bar" />
          <div className="head">
            <h2>My <em>Projects</em></h2>
            <a href="#" className="more">View all projects <FiArrowRight /></a>
          </div>
          <div className="grid">
            {projects.map((p) => (
              <a key={p.title} href={p.href} target="_blank" rel="noreferrer" className="card" aria-label={`Open ${p.title}`}>
                <div className={`thumb ${p.art}`} />
                <div className="body">
                  <div className="top">
                    <h3>{p.title}</h3>
                    <span><FiExternalLink /></span>
                  </div>
                  <p>{p.text}</p>
                  <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="wrap contact-in">
            <div>
              <h2 className="big">Let's Work <em>Together</em></h2>
              <p>Have a project in mind or just want to say hi? Feel free to reach out!</p>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=fbzalimovk2@gmail.com" target="_blank" rel="noreferrer" className="btn solid"><FiMail /> Get in Touch <FiArrowRight /></a>
            </div>
            <ul className="info">
              <li><FiMail /> <a href={`mailto:${profile.email}`}>{profile.email}</a></li>
              <li><FiMapPin /> {profile.city}</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="foot">
        <a href="#home" className="logo">JD</a>
        <small>© {new Date().getFullYear()} {profile.name}. All rights reserved.</small>
        <nav aria-label="Footer">{nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`}>{n}</a>)}</nav>
        <a href="#home" className="up" aria-label="Back to top"><FiArrowUp /></a>
      </footer>
    </>
  );
}