#!/usr/bin/env python3
"""
Generate a JSON file of image metadata (latitude, longitude, URL) based on filenames in the images directory.
Filenames must be in the format: <lat>-<lng>.jpg (e.g., -12.3456--78.9123.jpg).
"""
import os
import re
import json

def main():
    """
    Generate images.json based solely on earthview_urls.json, using remote image URLs.
    """
    # Determine script directory and file paths
    script_dir = os.path.dirname(__file__)
    urls_path = os.path.join(script_dir, 'earthview_urls.json')
    out_path = os.path.join(script_dir, 'images.json')
    # Pattern to extract latitude and longitude from Google Maps URLs
    map_pattern = re.compile(r'.*/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),')

    # Load URL metadata
    try:
        with open(urls_path) as f:
            urls_data = json.load(f)
    except Exception as e:
        print(f"Error loading {urls_path}: {e}")
        return

    # Build entries list from remote URLs
    entries = []
    for entry in urls_data:
        map_url = entry.get('map', '')
        m = map_pattern.search(map_url)
        if not m:
            continue
        lat = float(m.group(1))
        lng = float(m.group(2))
        image_url = entry.get('image')
        if not image_url:
            continue

        entries.append({
            'lat': lat,
            'lng': lng,
            'url': image_url,
            'region': entry.get('region', '') or '',
            'country': entry.get('country', '') or ''
        })

    # Write out JSON
    try:
        with open(out_path, 'w') as f:
            json.dump(entries, f, indent=2)
        print(f"Wrote {len(entries)} entries to {out_path}")
    except Exception as e:
        print(f"Error writing {out_path}: {e}")

if __name__ == '__main__':
    main()