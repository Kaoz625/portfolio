#!/usr/bin/env python3
"""Generate styled placeholder screenshots for portfolio projects that have no live URL."""

from PIL import Image, ImageDraw, ImageFont
import os, math

OUT_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'screenshots')
os.makedirs(OUT_DIR, exist_ok=True)

W, H = 1280, 800

ORISHA_COLORS = {
    'elegba':   ('#cc1a1a', '#ff4444'),
    'orunmila': ('#2d8a4e', '#6ee89a'),
    'yemoja':   ('#1a6abf', '#60b4f5'),
    'oshun':    ('#c8900a', '#f5c842'),
    'chango':   ('#dd2020', '#ffffff'),
    'oggun':    ('#1e6b30', '#4caf70'),
    'ochosi':   ('#2a8fbf', '#f0d060'),
    'obatala':  ('#b0c4d8', '#e8f0f8'),
    'oya':      ('#7c2da8', '#b86ef5'),
}

CATEGORY_ICONS = {
    'app':      '📱',
    'pipeline': '⚡',
    'tool':     '🔧',
}

# Projects without live screenshots (apps, pipelines, tools)
PROJECTS = [
    # Apps
    { 'id': 'popspot',          'title': 'PopSpot',               'category': 'app',      'orisha': 'yemoja',   'tagline': 'Discover what\'s popping near you.' },
    { 'id': 'mission-control',  'title': 'MissionControl Mobile', 'category': 'app',      'orisha': 'orunmila', 'tagline': 'Your AI command center, in your pocket.' },
    { 'id': 'trading-bot',      'title': 'AutoHedge Trading Bot', 'category': 'app',      'orisha': 'ochosi',   'tagline': 'Precision trading. Zero emotion.' },
    { 'id': 'ears-eyes',        'title': 'Ears & Eyes',           'category': 'app',      'orisha': 'orunmila', 'tagline': 'AI that listens. AI that sees.' },
    { 'id': 'ariaFinal',        'title': 'AriaFinal',             'category': 'app',      'orisha': 'oya',      'tagline': 'Voice AI for iOS — ambient, always-on.' },
    { 'id': 'claudeCodex',      'title': 'ClaudeCodex',           'category': 'app',      'orisha': 'orunmila', 'tagline': 'Multi-provider AI desktop IDE.' },
    { 'id': 'securusAiQuest',   'title': 'Securus AI Quest',      'category': 'app',      'orisha': 'chango',   'tagline': 'AI-powered security training game.' },
    { 'id': 'marineBros',       'title': 'Marine Bros',           'category': 'app',      'orisha': 'oggun',    'tagline': 'Browser strategy game. No install needed.' },
    # Pipelines
    { 'id': 'openclaw',         'title': 'OpenClaw AI Agent',     'category': 'pipeline', 'orisha': 'elegba',   'tagline': 'One gateway. Every channel. 49 agents.' },
    { 'id': 'llm-brains',       'title': 'LLM-Brains',           'category': 'pipeline', 'orisha': 'orunmila', 'tagline': 'Your second brain. Searchable. Intelligent.' },
    { 'id': 'infinite-image',   'title': 'Infinite Image Pipeline','category': 'pipeline','orisha': 'oshun',    'tagline': 'Unlimited AI images. Zero cost.' },
    { 'id': 'infinite-video',   'title': 'Infinite Video Pipeline','category': 'pipeline','orisha': 'oya',      'tagline': 'AI-generated video at scale.' },
    { 'id': 'scrape-platform',  'title': 'ScrapePlatform',        'category': 'pipeline', 'orisha': 'ochosi',   'tagline': 'Data hunting at scale.' },
    { 'id': 'brand-asset-pipeline','title':'Brand Asset Pipeline','category': 'pipeline', 'orisha': 'oshun',    'tagline': 'Full brand kits. Generated overnight.' },
    { 'id': 'skoolSync',        'title': 'Skool→Notion Sync',     'category': 'pipeline', 'orisha': 'orunmila', 'tagline': 'Scrape communities. Build your knowledge base.' },
    { 'id': 'hermesAgent',      'title': 'Hermes Agent',          'category': 'pipeline', 'orisha': 'elegba',   'tagline': '20 AI profiles. 3 Macs. One system.' },
    # Tools
    { 'id': 'openNotebook',     'title': 'Open Notebook',         'category': 'tool',     'orisha': 'orunmila', 'tagline': 'Self-hosted NotebookLM clone.' },
    { 'id': 'browserAutomation','title': 'Browser Automation Suite','category':'tool',    'orisha': 'ochosi',   'tagline': 'Automate any browser workflow.' },
    { 'id': 'puterAiStudio',    'title': 'Puter AI Studio',       'category': 'tool',     'orisha': 'oya',      'tagline': 'AI on the cloud OS.' },
    { 'id': 'gitDorker',        'title': 'GitDorker',             'category': 'tool',     'orisha': 'ochosi',   'tagline': 'GitHub secret hunter.' },
    { 'id': 'theHarvester',     'title': 'theHarvester Wrapper',  'category': 'tool',     'orisha': 'ochosi',   'tagline': 'OSINT at scale.' },
    { 'id': 'cwff',             'title': 'CWFF',                  'category': 'tool',     'orisha': 'oggun',    'tagline': 'Custom wordlist forge.' },
    { 'id': 'apiOsint',         'title': 'OSINT API Toolkit',     'category': 'tool',     'orisha': 'ochosi',   'tagline': '20+ OSINT APIs. One interface.' },
    { 'id': 'claudeDashboard',  'title': 'Claude Usage Dashboard','category': 'tool',     'orisha': 'orunmila', 'tagline': 'Live token tracking for Claude power users.' },
    { 'id': 'osintCourse',      'title': 'OSINT Python 21 Days',  'category': 'tool',     'orisha': 'orunmila', 'tagline': 'Learn OSINT with Python in 21 days.' },
]

def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def lerp_color(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))

def draw_grid_lines(draw, primary_rgb, alpha=25):
    spacing = 60
    line_color = primary_rgb + (alpha,)
    for x in range(0, W, spacing):
        draw.line([(x, 0), (x, H)], fill=line_color, width=1)
    for y in range(0, H, spacing):
        draw.line([(0, y), (W, y)], fill=line_color, width=1)

def draw_radial_glow(img, cx, cy, radius, color_rgb, max_alpha=80):
    overlay = Image.new('RGBA', img.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    steps = 30
    for i in range(steps, 0, -1):
        r = int(radius * i / steps)
        a = int(max_alpha * (1 - i / steps) ** 1.5)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color_rgb + (a,))
    img.paste(overlay, mask=overlay)

def make_placeholder(project):
    p_rgb = hex_to_rgb(ORISHA_COLORS[project['orisha']][0])
    s_rgb = hex_to_rgb(ORISHA_COLORS[project['orisha']][1])

    # Dark base gradient: near-black → very dark tinted
    img = Image.new('RGBA', (W, H))
    draw = ImageDraw.Draw(img)

    base_dark = (12, 12, 16)
    tinted = lerp_color(base_dark, p_rgb, 0.12)

    for y in range(H):
        t = y / H
        c = lerp_color(base_dark, tinted, t)
        draw.line([(0, y), (W, y)], fill=c + (255,))

    # Subtle grid
    grid_overlay = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid_overlay)
    draw_grid_lines(grid_draw, p_rgb, alpha=18)
    img = Image.alpha_composite(img, grid_overlay)

    # Radial glow in centre
    draw_radial_glow(img, W // 2, H // 2, 320, p_rgb, max_alpha=55)

    # Corner accent lines
    accent = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    adraw = ImageDraw.Draw(accent)
    lc = p_rgb + (60,)
    adraw.line([(0, 0), (120, 0)], fill=lc, width=2)
    adraw.line([(0, 0), (0, 80)], fill=lc, width=2)
    adraw.line([(W, H), (W - 120, H)], fill=lc, width=2)
    adraw.line([(W, H), (W, H - 80)], fill=lc, width=2)
    img = Image.alpha_composite(img, accent)

    draw = ImageDraw.Draw(img)

    # Category label top-left
    cat = project['category'].upper()
    cat_icon = CATEGORY_ICONS.get(project['category'], '◆')
    draw.rectangle([32, 30, 32 + len(cat) * 9 + 60, 62], fill=(0, 0, 0, 160))
    draw.text((50, 38), f"{cat_icon}  {cat}", fill=s_rgb + (220,))

    # Title — large, centred
    title = project['title']
    try:
        font_big = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 72)
        font_sm  = ImageFont.truetype('/System/Library/Fonts/Supplemental/Georgia.ttf', 28)
    except:
        font_big = ImageFont.load_default()
        font_sm  = font_big

    bbox = draw.textbbox((0, 0), title, font=font_big)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (W - tw) // 2
    ty = (H - th) // 2 - 40

    # Drop shadow
    draw.text((tx + 3, ty + 3), title, font=font_big, fill=(0, 0, 0, 140))
    draw.text((tx, ty), title, font=font_big, fill=s_rgb + (255,))

    # Tagline below
    tagline = project['tagline']
    tbbox = draw.textbbox((0, 0), tagline, font=font_sm)
    ttw = tbbox[2] - tbbox[0]
    ttx = (W - ttw) // 2
    tty = ty + th + 20
    draw.text((ttx, tty), tagline, font=font_sm, fill=(200, 200, 200, 180))

    # Accent line under title
    line_y = tty - 12
    draw.line([(W // 2 - 60, line_y), (W // 2 + 60, line_y)], fill=p_rgb + (180,), width=2)

    # Save
    out = img.convert('RGB')
    path = os.path.join(OUT_DIR, f"{project['id']}.jpg")
    out.save(path, 'JPEG', quality=88)
    print(f"✓ {project['id']}.jpg")

for p in PROJECTS:
    make_placeholder(p)

print(f"\nDone — {len(PROJECTS)} placeholders in {OUT_DIR}")
