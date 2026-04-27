import { Track } from "./types";

export const TRACKS: Track[] = [
  {
    id: "1",
    title: "Cyber Pulse",
    artist: "Synth Mind AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverUrl: "https://picsum.photos/seed/cyber1/400/400",
  },
  {
    id: "2",
    title: "Neon Horizon",
    artist: "Digital Dreamer",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverUrl: "https://picsum.photos/seed/cyber2/400/400",
  },
  {
    id: "3",
    title: "Grid Runner",
    artist: "Neon Nexus",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverUrl: "https://picsum.photos/seed/cyber3/400/400",
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE_SPEED = 150;
