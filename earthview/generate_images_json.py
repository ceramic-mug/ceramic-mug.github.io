#!/usr/bin/env python3
"""
Generate a JSON file of image metadata (latitude, longitude, URL) based on filenames in the images directory.
Filenames must be in the format: <lat>-<lng>.jpg (e.g., -12.3456--78.9123.jpg).
"""
import os
import re
import json

def main():
    images_dir = 'images'
    pattern = re.compile(r'^(-?\d+(?:\.\d+)?)-(-?\d+(?:\.\d+)?)\.jpg$')
    # Load region/country mapping from earthview_urls.json, if available
    urls_path = 'earthview_urls.json'
    mapping = {}
    if os.path.exists(urls_path):
        try:
            urls_data = json.load(open(urls_path))
            map_pattern = re.compile(r'.*/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),')
            for entry in urls_data:
                map_url = entry.get('map', '')
                m2 = map_pattern.match(map_url)
                if m2:
                    lat2 = float(m2.group(1))
                    lng2 = float(m2.group(2))
                    mapping[(lat2, lng2)] = {
                        'region': entry.get('region', '') or '',
                        'country': entry.get('country', '') or ''
                    }
        except Exception as e:
            print(f"Warning: failed to load mapping from {urls_path}: {e}")

    entries = []
    for fname in sorted(os.listdir(images_dir)):
        m = pattern.match(fname)
        if not m:
            continue
        lat = float(m.group(1))
        lng = float(m.group(2))
        url = f"{images_dir}/{fname}"
        info = mapping.get((lat, lng), {})
        entries.append({
            'lat': lat,
            'lng': lng,
            'url': url,
            'region': info.get('region', ''),
            'country': info.get('country', '')
        })
    out_path = 'images.json'
    with open(out_path, 'w') as f:
        json.dump(entries, f, indent=2)
    print(f"Wrote {len(entries)} entries to {out_path}")

if __name__ == '__main__':
    main()