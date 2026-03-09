export interface Track {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
}

export const DUMMY_TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Pulse',
    artist: 'Cyber Synth',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/neon1/300/300'
  },
  {
    id: '2',
    title: 'Midnight Drive',
    artist: 'Retro Wave',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/neon2/300/300'
  },
  {
    id: '3',
    title: 'Digital Dreams',
    artist: 'AI Composer',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/neon3/300/300'
  }
];
