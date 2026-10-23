document.addEventListener("DOMContentLoaded", async () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
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

  const repoCount = document.getElementById("repoCount");
  const githubUsername = "Subi003";

  try {
    const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100`);
    const reposData = await reposResponse.json();

    if (Array.isArray(reposData) && repoCount) {
      repoCount.textContent = reposData.length;
    }
  } catch (error) {
    if (repoCount) {
      repoCount.textContent = "14";
    }
  }
});
