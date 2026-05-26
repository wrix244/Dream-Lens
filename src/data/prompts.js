const PROMPTS = [
  {
    id: "p1",
    title: "Celestial Anime Train",
    category: "Anime Prompts",
    tool: "Midjourney v6",
    promptText: "A cinematic anime shot of a train traveling through a sea of glowing stars and galaxies, Shinkai style, pastel blue and pink sunset sky, high details, realistic reflections on the water, volumetric light ray --ar 16:9 --v 6.0 --stylize 750",
    description: "Inspired by Makoto Shinkai films. Perfect for wide celestial landscapes with soft nostalgic color grading.",
    image: "/images/anime_style.png",
    parameters: {
      aspectRatio: "16:9",
      stylize: "750",
      version: "v6.0",
      steps: "50"
    },
    author: "StudioGlow",
    likes: 342
  },
  {
    id: "p2",
    title: "Warm Meadow Cottage",
    category: "Ghibli Prompts",
    tool: "Flux.1 Dev",
    promptText: "Ghibli style hand-drawn illustration of a cozy wooden cottage in a lush green meadow filled with wildflowers, warm golden hour sunlight, puffy white clouds, peaceful atmosphere, detailed watercolor textures, studio ghibli aesthetic",
    description: "A peaceful, nostalgic countryside vibe with rich greens and warm, painterly lighting.",
    image: "/images/ghibli_style.png",
    parameters: {
      aspectRatio: "4:3",
      guidance: "3.5",
      steps: "28"
    },
    author: "KikiDream",
    likes: 512
  },
  {
    id: "p3",
    title: "Cyberpunk Rain Reflections",
    category: "Cyberpunk Prompts",
    tool: "Midjourney v6",
    promptText: "Cinematic film still of a rain-slicked Tokyo street at night, neon reflections on puddles, cyber-organic vending machines, soft teal and pink glow, cinematic haze, anamorphic lens flare, shot on 35mm film --ar 16:9 --style raw",
    description: "Moody cyberpunk night street capturing intense neon reflections and retro-futuristic atmosphere.",
    image: "/images/cyberpunk_style.png",
    parameters: {
      aspectRatio: "16:9",
      style: "raw",
      version: "v6.0",
      steps: "45"
    },
    author: "NeonViper",
    likes: 289
  },
  {
    id: "p4",
    title: "Golden Hour Pine Haze",
    category: "Nature Dreamscape Prompts",
    tool: "Flux.1 Dev",
    promptText: "A misty pine forest at sunrise, rays of golden sunlight piercing through the fog, soft morning haze, damp forest floor, realistic cinematic look, dreamy atmosphere, shot on Hasselblad --ar 16:9",
    description: "Cinematic landscape that creates atmospheric depth and light diffusion through mountain mist.",
    image: "/images/nature_style.png",
    parameters: {
      aspectRatio: "16:9",
      guidance: "4.0",
      steps: "35"
    },
    author: "MistChaser",
    likes: 421
  },
  {
    id: "p5",
    title: "Nostalgic Sunlit Room",
    category: "Vintage Film Prompts",
    tool: "Midjourney v6",
    promptText: "A sun-drenched empty bedroom, dust motes floating in light rays, warm orange and sage green tones, vintage film look, Fujifilm Superia 400, grainy, soft shadows, nostalgic, quiet peace --ar 3:2 --v 6.0",
    description: "Cozy nostalgic bedroom scene with realistic light halation and authentic film grain.",
    image: "/images/vintage_style.png",
    parameters: {
      aspectRatio: "3:2",
      version: "v6.0",
      steps: "40"
    },
    author: "RetroLover",
    likes: 198
  },
  {
    id: "p6",
    title: "Iridescent Glass Orb",
    category: "3D Render Prompts",
    tool: "Leonardo AI",
    promptText: "Abstract 3D render of an iridescent glass sphere floating over a soft cream-colored sand dune, pastel sunset sky, minimal design, raytraced reflections, Octane render, cinematic lighting, futuristic clean aesthetic",
    description: "Premium glassmorphic abstract render focusing on refraction and smooth lighting.",
    image: "/images/three_d_render.png",
    parameters: {
      engine: "Octane",
      resolution: "4K",
      style: "3D Art"
    },
    author: "GlassyWave",
    likes: 310
  },
  {
    id: "p7",
    title: "Sunkissed Linen Portrait",
    category: "Luxury Portrait Prompts",
    tool: "Flux.1 Dev",
    promptText: "A close-up portrait of a woman with freckles wearing a beige linen shirt, sunbeams filtering through leaves casting shadows on her face, soft warm skin tones, neutral off-white background, natural beauty, ultra realistic --ar 4:5",
    description: "Soft warm lighting, realistic skin textures, and clean luxury branding portrait.",
    image: "/images/portrait_style.png",
    parameters: {
      aspectRatio: "4:5",
      guidance: "3.0",
      steps: "30"
    },
    author: "LinenStudio",
    likes: 678
  },
  {
    id: "p8",
    title: "Summer Rain Cafe",
    category: "Korean Drama Prompts",
    tool: "Midjourney v6",
    promptText: "Cinematic shot of a cozy cafe interior on a rainy day, glass window with rain droplets, warm light inside, soft focus background, pastel color palette, aesthetic cozy Kdrama vibe --ar 16:9 --style raw",
    description: "Cozy coffee shop atmosphere with rain-slicked windows, soft lights, and romantic film tones.",
    image: "/images/korean_drama.png",
    parameters: {
      aspectRatio: "16:9",
      version: "v6.0",
      style: "raw"
    },
    author: "SeoulSoul",
    likes: 445
  },
  {
    id: "p9",
    title: "Sunset Balcony Bloom",
    category: "Aesthetic Prompts",
    tool: "Midjourney v6",
    promptText: "Aesthetically pleasing balcony filled with green plants and flowers at sunset, warm peach-gold sky, soft breeze, dreamy cinematic bloom, soft lens filter, nostalgic lo-fi aesthetic --ar 4:5",
    description: "Warm peach tones and high bloom highlight dispersion for a dreamlike lo-fi wallpaper.",
    image: "/images/aesthetic_style.png",
    parameters: {
      aspectRatio: "4:5",
      version: "v6.0"
    },
    author: "LoFiVibe",
    likes: 589
  },
  {
    id: "p10",
    title: "Volumetric Mountain Temple",
    category: "Cinematic Prompts",
    tool: "Flux.1 Dev",
    promptText: "An ancient temple carved into a giant mountain cliff, volumetric light beams, epic scale, deep green valleys below, cinematic framing, photo taken on RED camera, high-end photography, majestic fantasy landscape --ar 16:9",
    description: "Volumetric light rays and grand mountain scale inspired by modern cinema.",
    image: "/images/cinematic_style.png",
    parameters: {
      aspectRatio: "16:9",
      guidance: "5.0",
      steps: "40"
    },
    author: "EpicVisions",
    likes: 712
  }
];

export const CATEGORIES = [
  { name: "Anime Prompts", emoji: "🌸", image: "/images/anime_style.png", count: "48 prompts" },
  { name: "Aesthetic Prompts", emoji: "✨", image: "/images/aesthetic_style.png", count: "36 prompts" },
  { name: "Cinematic Prompts", emoji: "🎬", image: "/images/cinematic_style.png", count: "64 prompts" },
  { name: "Ghibli Prompts", emoji: "🌿", image: "/images/ghibli_style.png", count: "29 prompts" },
  { name: "3D Render Prompts", emoji: "🔮", image: "/images/three_d_render.png", count: "42 prompts" },
  { name: "Luxury Portrait Prompts", emoji: "👒", image: "/images/portrait_style.png", count: "55 prompts" },
  { name: "Korean Drama Prompts", emoji: "☕", image: "/images/korean_drama.png", count: "22 prompts" },
  { name: "Cyberpunk Prompts", emoji: "🌃", image: "/images/cyberpunk_style.png", count: "31 prompts" },
  { name: "Nature Dreamscape Prompts", emoji: "⛰️", image: "/images/nature_style.png", count: "50 prompts" },
  { name: "Vintage Film Prompts", emoji: "🎞️", image: "/images/vintage_style.png", count: "37 prompts" }
];

export default PROMPTS;
