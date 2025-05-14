document.addEventListener("DOMContentLoaded", () => {
  // Toggle menu visibility
  const toggleBtn = document.querySelector(".toggleBtn");
  const menuItems = document.querySelectorAll(".menuList ul li");

  let isMenuOpen = false;

  const toggleHandler = () => {
    isMenuOpen = !isMenuOpen;

    menuItems.forEach((li) => {
      li.style.display = isMenuOpen ? "block" : "none";
    });
  };

  const closeMenu = () => {
    isMenuOpen = false;
    menuItems.forEach((li) => {
      li.style.display = "none";
    });
  };

  toggleBtn.addEventListener("click", toggleHandler);

  // Auto-close menu on resize if width >= 1400px
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1400) {
      closeMenu();
    }
  });

  // GitHub repo logos click handlers
  const repoLinks = [
    { id: "repologo1", url: "https://github.com/CharanLingolu/Netflix" },
    { id: "repologo2", url: "https://github.com/CharanLingolu/WEATHER" },
    { id: "repologo3", url: "https://github.com/CharanLingolu/Shopping_App_React" }
  ];

  repoLinks.forEach((repo) => {
    const logo = document.getElementById(repo.id);
    if (logo) {
      logo.addEventListener("click", () => {
        window.open(repo.url, "_blank");
      });
    }
  });

  // Project title click handlers
  const projectLinks = [
    { id: "nettitle1", url: "https://charanlingolu.github.io/Netflix/" },
    { id: "nettitle2", url: "https://charanlingolu.github.io/WEATHER/" },
    { id: "nettitle3", url: "https://charanlingolu.github.io/Shopping_App_React/" }
  ];

  projectLinks.forEach((project) => {
    const titleElem = document.getElementById(project.id);
    if (titleElem) {
      titleElem.addEventListener("click", () => {
        window.open(project.url, "_blank");
      });
    }
  });

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = document.getElementById("input1").value.trim();
    const email = document.getElementById("input2").value.trim();
    const phoneno = document.getElementById("input3").value.trim();
    const message = document.getElementById("input4").value.trim();

    const messageBox = document.getElementById("message");

    if (!name || !email || !phoneno || !message) {
      messageBox.innerText = "Please fill in all fields!";
      messageBox.style.display = "block";
      messageBox.style.color = "red";

      setTimeout(() => {
        messageBox.style.display = "none";
      }, 3000);

      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, phoneno })
      });

      const data = await res.json();
      messageBox.innerText = "Submitted Successfully!";
      messageBox.style.display = "block";
      messageBox.style.color = "green";
      console.log("Server response:", data);

      setTimeout(() => {
        messageBox.style.display = "none";
      }, 3000);

      document.querySelector("form").reset();

    } catch (err) {
      console.error("Error submitting form:", err);
      messageBox.innerText = "There was an error submitting the form.";
      messageBox.style.display = "block";
      messageBox.style.color = "red";

      setTimeout(() => {
        messageBox.style.display = "none";
      }, 3000);
    }
  };

  document.getElementById("subbtn").addEventListener("click", handleSubmit);

  document.getElementById("resbtn").addEventListener("click", () => {
    document.querySelector("form").reset();
    const messageBox = document.getElementById("message");
    messageBox.innerText = "";
    messageBox.style.display = "none";
  });
});
