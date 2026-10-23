document.addEventListener("DOMContentLoaded", async () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
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
