from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import io
import re
import os
import base64
from transformers import BlipProcessor, BlipForConditionalGeneration
from diffusers import StableDiffusionPipeline
import torch

app = Flask(__name__)

# ✅ Configure CORS to allow requests from React frontend (default localhost:5173 or 3001)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all for now (for dev)

# Load models once
caption_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
caption_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
image_generator = StableDiffusionPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5", torch_dtype=torch.float32
).to("cpu")

# Social post templates
def create_social_posts(caption):
    return {
        "YouTube": f"🌟 {caption}\n#AI #Art #YouTubeShorts",
        "Instagram": f"{caption} ✨\n#DigitalArt #InstaAI #Creative",
        "X": f"{caption} 🧠 #AI #ImageGeneration",
        "LinkedIn": f"{caption}\nHarnessing AI for creativity. #AIArt #Innovation"
    }
def seo_friendly_filename(filename):
    name = os.path.splitext(filename)[0]
    name = re.sub(r'[^a-zA-Z0-9 ]', '', name)
    name = re.sub(r'\s+', '-', name.strip().lower())
    return f"{name}.jpg"

def generate_seo_data(filename, alt_text):
    seo_filename = seo_friendly_filename(filename)
    base_url = f"https://yourdomain.com/images/{seo_filename}"
    keywords = ", ".join(re.findall(r'\b\w{4,}\b', alt_text.lower()))

    return {
        "seo_filename": seo_filename,
        "html_tag": f'<img src="{seo_filename}" alt="{alt_text}" title="{alt_text}">',
        "fig_tag": f'<figure><img src="{seo_filename}" alt="{alt_text}" title="{alt_text}"><figcaption>{alt_text}</figcaption></figure>',
        "open_graph": f'<meta property="og:image" content="{base_url}" />\n<meta property="og:image:alt" content="{alt_text}" />\n<meta name="twitter:card" content="summary_large_image" />\n<meta name="twitter:title" content="{alt_text}" />\n<meta name="twitter:description" content="{alt_text}" />\n<meta name="twitter:image" content="{base_url}" />',
        "meta_description": f'<meta name="description" content="{alt_text}">',
        "keywords": f'<meta name="keywords" content="{keywords}">',
        "schema_ld": f'<script type="application/ld+json">{{"@context":"https://schema.org","@type":"ImageObject","contentUrl":"{base_url}","description":"{alt_text}","name":"{alt_text}","fileFormat":"image/jpeg"}}</script>',
        "responsive_html": f'<picture><source media="(min-width: 800px)" srcset="{base_url}"><img src="{seo_filename}" alt="{alt_text}" title="{alt_text}" style="width:100%;"></picture>'
    }


@app.route("/generate-image", methods=["POST"])
def generate_image():
    data = request.get_json()
    prompt = data.get("prompt", "")
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    image = image_generator(prompt).images[0]
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")
    image_bytes = buffered.getvalue()
    base64_image = base64.b64encode(image_bytes).decode("utf-8")

    return jsonify({"image": base64_image})

@app.route("/caption-image", methods=["POST"])
def caption_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    image_file = request.files['image']
    image = Image.open(image_file).convert("RGB")

    inputs = caption_processor(image, return_tensors="pt")
    output = caption_model.generate(**inputs)
    caption = caption_processor.decode(output[0], skip_special_tokens=True)

    posts = create_social_posts(caption)
    return jsonify({"caption": caption, "posts": posts})

@app.route("/generate-seo", methods=["POST"])
def generate_seo_api():
    if 'image' not in request.files or 'alt_text' not in request.form:
        return jsonify({"error": "Image file and alt text required"}), 400

    image_file = request.files['image']
    alt_text = request.form['alt_text']
    seo_result = generate_seo_data(image_file.filename, alt_text)
    return jsonify(seo_result)


if __name__ == "__main__":
    app.run(port=3000, debug=True, use_reloader=False)  # Use port 3000 for compatibility with React dev server
