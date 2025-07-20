
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";
import About from "./componant/about";
import Contact from "./componant/contact";

function App() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [socialPosts, setSocialPosts] = useState({});
  const [loading, setLoading] = useState(false);
  const [captionLoading, setCaptionLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [seoMetadata, setSeoMetadata] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState("home");

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  const renderPage = () => {
    switch (currentPage) {
      case "about":
        return <About darkMode={darkMode} />;
      case "contact":
        return <Contact darkMode={darkMode} />;
      default:
        return renderHomePage();
    }
  };

  const renderHomePage = () => {
    const handleGenerateImage = async () => {
      if (!prompt) return alert("Enter a prompt!");
      setLoading(true);
      setCaption("");
      setSocialPosts({});
      try {
        const res = await fetch(`${backendURL}/generate-image`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        const data = await res.json();
        if (data.image) {
          setGeneratedImage("data:image/png;base64," + data.image);
        } else {
          alert("Image generation failed.");
        }
      } catch (err) {
        console.error(err);
        alert("API error.");
      }
      setLoading(false);
    };

    const handleCaptionAndPost = async (imageFile) => {
      if (!imageFile) return alert("Upload or generate an image first!");
      setCaptionLoading(true);
      const formData = new FormData();
      formData.append("image", imageFile);
      try {
        const res = await fetch(`${backendURL}/caption-image`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setCaption(data.caption);
        setSocialPosts(data.posts);
      } catch (err) {
        console.error(err);
        alert("Captioning failed.");
      }
      setCaptionLoading(false);
    };

    const handleUpload = (e) => {
      const file = e.target.files[0];
      setUploadedFile(file);
      setGeneratedImage(URL.createObjectURL(file));
      handleCaptionAndPost(file);
    };

    const handleCaptionGeneratedImage = async () => {
      if (!generatedImage) return;
      setCaptionLoading(true);
      const response = await fetch(generatedImage);
      const blob = await response.blob();
      const file = new File([blob], "generated.png", { type: "image/png" });
      await handleCaptionAndPost(file);
      setCaptionLoading(false);
    };

    const handleGenerateSEO = async () => {
      if (!uploadedFile || !caption) return alert("Upload an image and generate caption first!");
      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("alt_text", caption);

      try {
        const res = await fetch(`${backendURL}/generate-seo`, {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        setSeoMetadata(data);
      } catch (err) {
        console.error(err);
        alert("SEO generation failed.");
      }
    };

    return (
      <>
        {/* === Main Body === */}
        <div className="app-wrapper d-flex justify-content-center align-items-start">
          <div className="app-container pt-5 mt-5">
            <div className="text-center mb-5">
              <h1 className="gradient-text display-4 fw-bold">AI Image + Caption Generator</h1>
              <p className={darkMode ? "text-light" : "text-muted"}>
                Generate stunning images and ready-to-post captions for all platforms.
              </p>
            </div>
            {/* Input, Buttons, Upload UI and Display Sections go here */}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {/* === Navigation === */}
      <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} fixed-top shadow`} style={{ zIndex: 1040 }}>
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold">Innov8rs 🚀</span>
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-primary me-3" onClick={toggleTheme}>
              {darkMode ? "☀️" : "🌙"}
            </button>
            <div className="d-flex align-items-center">
              <button className={`btn ${currentPage === "home" ? "btn-primary" : "btn-outline-primary"} me-2 d-none d-sm-inline-block`} onClick={() => setCurrentPage("home")}>🏠 Home</button>
              <button className={`btn ${currentPage === "about" ? "btn-primary" : "btn-outline-primary"} me-2 d-none d-sm-inline-block`} onClick={() => setCurrentPage("about")}>ℹ️ About</button>
              <button className={`btn ${currentPage === "contact" ? "btn-primary" : "btn-outline-primary"} d-none d-sm-inline-block`} onClick={() => setCurrentPage("contact")}>📞 Contact</button>
              <div className="dropdown d-sm-none">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  📱 Menu
                </button>
                <ul className={`dropdown-menu ${darkMode ? "dropdown-menu-dark" : ""}`}>
                  <li><button className={`dropdown-item ${currentPage === "home" ? "active" : ""}`} onClick={() => setCurrentPage("home")}>🏠 Home</button></li>
                  <li><button className={`dropdown-item ${currentPage === "about" ? "active" : ""}`} onClick={() => setCurrentPage("about")}>ℹ️ About</button></li>
                  <li><button className={`dropdown-item ${currentPage === "contact" ? "active" : ""}`} onClick={() => setCurrentPage("contact")}>📞 Contact</button></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* === Render Current Page === */}
      {renderPage()}
    </>
  );
}

export default App;
