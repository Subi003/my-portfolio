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
        0% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.5; }
        50% { transform: translate3d(18px, -16px, 0) scale(1.08); opacity: 0.8; }
        100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.55; }
      }

      @keyframes techPulse {
        0% { transform: scale(0.9); opacity: 0.18; }
        50% { transform: scale(1.06); opacity: 0.42; }
        100% { transform: scale(0.9); opacity: 0.18; }
      }

      .tech-orb {
        position: absolute;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, rgba(95, 138, 255, 0.32), rgba(95, 138, 255, 0.15) 38%, transparent 70%);
        filter: blur(2px);
        animation: techDrift 24s ease-in-out infinite alternate;
      }

      .tech-pulse {
        position: absolute;
        border-radius: 50%;
        border: 1px solid rgba(95, 138, 255, 0.18);
        animation: techPulse 14s ease-in-out infinite;
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
      orb.style.width = `${[16, 18, 12][index]}rem`;
      orb.style.height = `${[16, 18, 12][index]}rem`;
      orb.style.animationDelay = `${index * 2.2}s`;
    });

    orb1.style.top = "12%";
    orb1.style.right = "18%";

    orb2.style.left = "10%";
    orb2.style.bottom = "12%";

    orb3.style.right = "30%";
    orb3.style.bottom = "22%";

    [pulse1, pulse2, pulse3].forEach((pulse, index) => {
      pulse.className = "tech-pulse";
      pulse.style.width = "14rem";
      pulse.style.height = "14rem";
      pulse.style.animationDelay = `${index * 2.8}s`;
    });

    pulse1.style.top = "18%";
    pulse1.style.left = "18%";

    pulse2.style.bottom = "16%";
    pulse2.style.right = "20%";

    pulse3.style.top = "42%";
    pulse3.style.left = "50%";
    pulse3.style.transform = "translateX(-50%)";

    bg.style.position = "fixed";
    bg.style.inset = "0";
    bg.style.pointerEvents = "none";
    bg.style.zIndex = "0";
    bg.style.overflow = "hidden";
    bg.style.background = "linear-gradient(180deg, rgba(236,240,247,0.95), rgba(230,236,244,0.82))";
    bg.style.opacity = "1";

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
