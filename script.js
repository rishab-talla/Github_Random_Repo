const languageSelect = document.getElementById("languageSelect");
const repoContainer = document.getElementById("repoContainer");
const loadingMessage = document.getElementById("loadingMessage");
const refreshBtn = document.getElementById("refreshButton");

async function fetchRepo() {
  const language = languageSelect.value;

  if (!language) {
    loadingMessage.innerHTML = "<p>Please select a language</p>";
    return;
  }

  loadingMessage.innerHTML = "<p>Loading, please wait..</p>";
  try {
    const response = await fetch(
      `https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc`
    );
    const data = await response.json();

    if (response.status == 200) refreshBtn.style.display = "block";

    if (data.items && data.items.length > 0) {
      const repo = data.items[Math.floor(Math.random() * data.items.length)];
      console.log("repo");
      const repoHTML = `
        <div class="repo">
          <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
          <p class="repo-description">${repo.description}</p>
          <div class="last-para">
          <p>⚫${repo.language}</p>
          <p>⭐${repo.stargazers_count}</p>
          <p> 🍴${repo.forks_count}</p>
          <p> ❕${repo.open_issues}</p>
          </div>
        </div>
      `;
      loadingMessage.innerHTML = repoHTML;
    } else {
      loadingMessage.innerHTML = "<p>No repositories found</p>";
    }
  } catch (error) {
    loadingMessage.innerHTML = `<p>Error fetching repositories. <button onclick="fetchRepo()">Click to retry</button></p>`;
  }
}
