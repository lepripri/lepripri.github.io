document.addEventListener("DOMContentLoaded", () => {
  if (!window.Pripri) {
    console.error("Uncaught Error: failled to load Firebase in allPages.js file");
    return;
  }

  console.log("Auth dispo :", Pripri.auth);
});
