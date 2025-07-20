import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./custom.css";

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

  const backendURL = "http://localhost:3000";

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

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
      {/* === Merged Navbar === */}
      <nav className={`navbar navbar-expand-lg ${darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"} fixed-top shadow`}>
        <div className="container-fluid px-4">
          <span className="navbar-brand fw-bold">Innov8rs 🚀</span>
          <div className="d-flex align-items-center ms-auto">
            <button className="btn btn-outline-primary me-2" onClick={toggleTheme}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
            {/* <a className="btn btn-outline-secondary" href="https://github.com/" target="_blank" rel="noopener noreferrer">
              GitHub
            </a> */}
          </div>
        </div>
      </nav>

      {/* === Main Body === */}
      <div className="app-wrapper d-flex justify-content-center align-items-start">
        <div className="app-container pt-5 mt-5">
          <div className="text-center mb-5">
            <h1 className="gradient-text display-4 fw-bold">AI Image + Caption Generator</h1>
            <p className={`mt-2 ${darkMode ? "text-light" : "text-muted"}`}>
              Generate stunning images and ready-to-post captions for all platforms.
            </p>
          </div>

          <div className="container mb-4">
            <div className="row g-3 justify-content-center align-items-center">
              <div className="col-md-8">
                <input
                  type="text"
                  className="form-control form-control-lg fancy-input"
                  placeholder="Enter a creative prompt..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <div className="col-md-3 d-grid">
                <button
                  onClick={handleGenerateImage}
                  className="btn fancy-btn btn-lg d-flex justify-content-center align-items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Generating...
                    </>
                  ) : (
                    "Generate"
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mb-5">
            <label htmlFor="fileUpload" className={`form-label ${darkMode ? "text-light" : "text-dark"}`}>
              Or upload your own image
            </label>
            <br />
            <label htmlFor="fileUpload" className="custom-upload">📤 Upload Image</label>
            <input
              type="file"
              className="hidden-file"
              id="fileUpload"
              accept="image/*"
              onChange={handleUpload}
            />
          </div>

          {generatedImage && (
            <div className="text-center mb-5">
              <h3 className={darkMode ? "text-light" : "text-dark"}>Generated Image</h3>
              <img
                src={generatedImage}
                alt="Generated"
                className="img-fluid rounded border border-secondary shadow my-3"
                style={{ maxHeight: "500px" }}
              />
              <div className="d-flex justify-content-center flex-wrap gap-2">
                <button
                  className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}
                  onClick={handleCaptionGeneratedImage}
                  disabled={captionLoading}
                >
                  {captionLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    "Generate Caption + Posts"
                  )}
                </button>
                <a
                  href={generatedImage}
                  download="generated-image.png"
                  className={`btn ${darkMode ? "btn-outline-success" : "btn-success"}`}
                >
                  📅 Download Image
                </a>
              </div>
            </div>
          )}

          {caption && (
            <div className="container mb-4">
              <h4 className="text-info mb-2">Caption</h4>
              <div className={`p-3 border rounded glass-box ${darkMode ? "text-white" : "text-dark"}`}>
                <p>{caption}</p>
                <button
                  className="btn btn-outline-info mt-3"
                  onClick={handleGenerateSEO}
                >
                  📈 Generate SEO Tags
                </button>
              </div>
            </div>
          )}

          {Object.keys(socialPosts).length > 0 && (
            <div className="container mb-5">
              <h4 className="text-warning mb-3">Social Media Posts</h4>
              <div className="row">
                {Object.entries(socialPosts).map(([platform, text]) => (
                  <div className="col-md-6 mb-3" key={platform}>
                    <div className={`p-3 border rounded shadow-sm glass-box ${darkMode ? "text-white" : "text-dark"}`}>
                      <h5 className="text-primary">{platform}</h5>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {seoMetadata && (
            <div className="container mb-5">
              <h4 className="text-success mb-3">SEO Metadata</h4>
              {Object.entries(seoMetadata).map(([key, val]) => (
                <div key={key} className="mb-3">
                  <h6>{key}</h6>
                  <pre className={`p-3 rounded ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>{val}</pre>
                </div>
              ))}
            </div>
          )}

          {(loading || captionLoading) && (
            <div className={`text-center mt-4 ${darkMode ? "text-light" : "text-muted"}`}>
              ⏳ Working some AI magic...
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
