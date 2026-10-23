document.addEventListener("DOMContentLoaded", async () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const bg = document.getElementById("techBg");
  if (bg) {
    const bgStyles = document.createElement("style");
    bgStyles.textContent = `
      @keyframes techDrift {
        0% { transform: translate3d(0, 0, 0) scale(1); }
        25% { transform: translate3d(12px, -18px, 0) scale(1.05); }
        50% { transform: translate3d(26px, -32px, 0) scale(1.12); }
        75% { transform: translate3d(18px, -14px, 0) scale(1.04); }
        100% { transform: translate3d(0, 0, 0) scale(1); }
      }

      @keyframes techPulse {
        0% { transform: scale(0.85); opacity: 0.15; }
        30% { transform: scale(1.02); opacity: 0.38; }
        50% { transform: scale(1.1); opacity: 0.58; }
        80% { transform: scale(1.18); opacity: 0.28; }
        100% { transform: scale(0.85); opacity: 0.15; }
      }

      .tech-orb {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.7), rgba(121,168,255,0.3) 35%, transparent 70%);
        filter: blur(2px);
        animation: techDrift 18s ease-in-out infinite;
      }

      .tech-pulse {
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(121,168,255,0.2);
        animation: techPulse 8s linear infinite;
      }
    `;
    document.head.appendChild(bgStyles);

    const orb1 = document.createElement("span");
    const orb2 = document.createElement("span");
    const orb3 = document.createElement("span");
    const pulse1 = document.createElement("span");
    const pulse2 = document.createElement("span");
    const pulse3 = document.createElement("span");

    [orb1, orb2, orb3].forEach((orb, index) => {
      orb.className = "tech-orb";
      orb.style.width = `${[18, 22, 14][index]}rem`;
      orb.style.height = `${[18, 22, 14][index]}rem`;
      orb.style.animationDelay = `${index * 1.8}s`;
    });

    orb1.style.top = "8%";
    orb1.style.right = "12%";

    orb2.style.left = "5%";
    orb2.style.bottom = "10%";

    orb3.style.right = "24%";
    orb3.style.bottom = "18%";

    [pulse1, pulse2, pulse3].forEach((pulse, index) => {
      pulse.className = "tech-pulse";
      pulse.style.width = "16rem";
      pulse.style.height = "16rem";
      pulse.style.animationDelay = `${index * 2.2}s`;
    });

    pulse1.style.top = "15%";
    pulse1.style.left = "20%";

    pulse2.style.bottom = "18%";
    pulse2.style.right = "18%";

    pulse3.style.top = "42%";
    pulse3.style.left = "calc(50% - 8rem)";

    bg.style.position = "fixed";
    bg.style.inset = "0";
    bg.style.pointerEvents = "none";
    bg.style.zIndex = "0";
    bg.style.overflow = "hidden";
    bg.style.background = "linear-gradient(rgba(121, 168, 255, 0.05), rgba(121, 168, 255, 0.02)), repeating-linear-gradient(90deg, rgba(121,168,255,0.06) 0, rgba(121,168,255,0.06) 1px, transparent 1px, transparent 80px), repeating-linear-gradient(0deg, rgba(121,168,255,0.06) 0, rgba(121,168,255,0.06) 1px, transparent 1px, transparent 80px)";
    bg.style.opacity = "0.9";

    bg.append(orb1, orb2, orb3, pulse1, pulse2, pulse3);
  }

  const themeToggle = document.getElementById("themeToggle");
  const storedTheme = localStorage.getItem("portfolio-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  const applyTheme = (theme) => {
    const isLight = theme === "light";
    document.body.classList.toggle("light-theme", isLight);

    if (themeToggle) {
      const icon = themeToggle.querySelector("i");
      const label = themeToggle.querySelector("span");

      if (icon) {
        icon.className = isLight ? "fa-solid fa-sun" : "fa-solid fa-moon";
      }

      if (label) {
        label.textContent = isLight ? "Light" : "Dark";
      }

      themeToggle.setAttribute("aria-label", isLight ? "Toggle dark mode" : "Toggle light mode");
    }
  };

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
      localStorage.setItem("portfolio-theme", nextTheme);
      applyTheme(nextTheme);
    });
  }

  document.querySelectorAll("header, main, footer").forEach((el) => {
    el.style.position = "relative";
    el.style.zIndex = "1";
  });

  const navLinks = document.querySelectorAll('.main-nav a, .btn[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const repoCountEl = document.getElementById("repoCount");
  const repoListEl = document.getElementById("repoList");

  const githubUsername = "Subi003";
  const fallbackRepos = [
    { name: "appsmith", description: "Admin panels, internal tools, and dashboard platform." },
    { name: "the-saas-spend-auditor", description: "MVP for SaaS spend audit and reporting." },
    { name: "News-Website", description: "News website with content and admin workflow management." },
    { name: "Smart_Attendence_System", description: "Student and teacher attendance management system." },
    { name: "Mobile-Number-Management", description: "Utility app for storing and managing mobile numbers." },
    { name: "my-portfolio", description: "Personal portfolio website." },
    { name: "Chatbot", description: "JavaScript-based interactive chatbot project." },
    { name: "Product_Video_Create", description: "Social media product video creation project." },
    { name: "Template_Wedding_Website", description: "Elegant event landing page template." },
    { name: "compliance-system", description: "Compliance management system project." }
  ];

  try {
    const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
    const repos = await reposResponse.json();

    const safeRepos = Array.isArray(repos) && repos.length ? repos : fallbackRepos;

    if (repoCountEl) {
      repoCountEl.textContent = safeRepos.length;
    }

    if (repoListEl) {
      const topRepos = safeRepos
        .filter((repo) => repo && repo.name)
        .slice(0, 9)
        .map((repo) => {
          const cleanName = repo.name.replace(/[-_]/g, " ");
          const cleanDescription = repo.description || "Project built for practical business or developer use.";
          return `
            <article class="project-card">
              <span class="project-tag">GitHub</span>
              <h3>${cleanName}</h3>
              <p>${cleanDescription}</p>
              <a href="https://github.com/${githubUsername}/${repo.name}" target="_blank" rel="noreferrer" class="project-link">
                View repository <i class="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            </article>
          `;
        })
        .join("");

      repoListEl.innerHTML = topRepos;
    }
  } catch (error) {
    if (repoCountEl) {
      repoCountEl.textContent = fallbackRepos.length;
    }

    if (repoListEl) {
      repoListEl.innerHTML = fallbackRepos
        .slice(0, 9)
        .map((repo) => `
          <article class="project-card">
            <span class="project-tag">GitHub</span>
            <h3>${repo.name}</h3>
            <p>${repo.description}</p>
            <a href="https://github.com/${githubUsername}/${repo.name}" target="_blank" rel="noreferrer" class="project-link">
              View repository <i class="fa-solid fa-arrow-up-right-from-square"></i>
            </a>
          </article>
        `)
        .join("");
    }
  }
});
