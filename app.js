function fetchGithubDetails(username) {
  try {
    return fetch(`https://api.github.com/users/${username}`)
      .then((raw) => {
        if (!raw.ok) throw new Error("User not found");
        return raw.json();
      })
      .then((data) => {
        document.getElementById("avatar").src = data.avatar_url;
        document.getElementById("avatar").style.display = "block";
        document.getElementById("name").textContent = `Name: ${data.name || "Not available"}`;
        document.getElementById("bio").textContent = `Bio: ${data.bio || "No bio available"}`;
        document.getElementById("followers").textContent = `Followers: ${data.followers}`;
        document.getElementById("repos").textContent = `Public Repositories: ${data.public_repos}`;

        document.getElementById("result-section").style.display = "block";
      })
      .catch((error) => {
        document.getElementById("result-section").innerHTML = `<p>Error: ${error.message}. Try again.</p>`;
      });
  } catch (err) {
    console.error("Unexpected error:", err);
    document.getElementById("result-section").innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
}

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents page reload
  let username = document.getElementById("username-input").value.trim();
  if (username.length > 0) {
    fetchGithubDetails(username);
  } else {
    alert("Enter a valid username.");
  }
});
