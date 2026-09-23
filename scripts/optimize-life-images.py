"""Regenerate gallery previews with Python 3 and Pillow: python3 scripts/optimize-life-images.py.

Original photos are retained for the zoom viewer. Run after adding/replacing photos.
"""

import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/life"
OUTPUT = SOURCE / "optimized"
OUTPUT.mkdir(exist_ok=True)
manifest = {}

for source in sorted(SOURCE.iterdir()):
    if source.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
        continue
    with Image.open(source) as original:
        image = ImageOps.exif_transpose(original).convert("RGB")
        width, height = image.size
        variants = []
        for target in sorted({min(width, size) for size in (400, 800, 1280)}):
            preview = image.resize((target, round(height * target / width)), Image.Resampling.LANCZOS)
            name = f"{source.stem}-{target}.webp"
            preview.save(OUTPUT / name, "WEBP", quality=82, method=6)
            variants.append({"src": f"/life/optimized/{name}", "width": target})
        manifest[f"/life/{source.name}"] = {
            "width": width,
            "height": height,
            "src": variants[min(1, len(variants) - 1)]["src"],
            "srcSet": ", ".join(f"{item['src']} {item['width']}w" for item in variants),
        }

(ROOT / "src/data/life-images.json").write_text(json.dumps(manifest, indent=2) + "\n")
print(f"Generated responsive previews for {len(manifest)} photos.")
