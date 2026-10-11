import { useEffect, useRef, type ComponentType } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  VideoCanvas,
  type VideoAspectRatio,
  VideoPausedContext,
  useVideoAudio,
  useVideoPlayer,
} from '@/lib/video';
import { Scene01 } from './scenes/Scene01';
import { Scene02 } from './scenes/Scene02';
import { Scene03 } from './scenes/Scene03';
import { Scene04 } from './scenes/Scene04';
import { Scene05 } from './scenes/Scene05';

export const SCENE_DURATIONS = {
  story: 4800,
  build: 5350,
  reveal: 5350,
  process: 4850,
  signature: 4650,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '16:9';
const SCENE_COMPONENTS: Record<string, ComponentType> = {
  story: Scene01,
  build: Scene02,
  reveal: Scene03,
  process: Scene04,
  signature: Scene05,
};
const SCENE_START_SEC: Record<string, number> = (() => {
  const out: Record<string, number> = {};
  let ms = 0;
  for (const [key, duration] of Object.entries(SCENE_DURATIONS)) {
    out[key] = ms / 1000;
    ms += duration;
  }
  return out;
})();
const AUDIO_SEEK_EPSILON_SEC = 0.18;

interface VideoTemplateProps {
  durations?: Record<string, number>;
  loop?: boolean;
  paused?: boolean;
  muted?: boolean;
  onSceneChange?: (sceneKey: string) => void;
}

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  paused = false,
  muted = false,
  onSceneChange,
}: VideoTemplateProps = {}) {
  const audioState = useVideoAudio();
  const playbackPaused = paused || audioState.paused;
  const playbackMuted = muted || audioState.muted;
  const { currentSceneKey } = useVideoPlayer({ durations, loop, paused: playbackPaused });
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSceneKeyRef = useRef<string | null>(null);
  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '');
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.44;
    if (playbackPaused) {
      audio.pause();
      return;
    }
    if (lastSceneKeyRef.current !== currentSceneKey) {
      lastSceneKeyRef.current = currentSceneKey;
      const target = SCENE_START_SEC[baseSceneKey] ?? 0;
      if (Math.abs(audio.currentTime - target) > AUDIO_SEEK_EPSILON_SEC) {
        audio.currentTime = target;
      }
    }
    audio.play().catch(() => {});
  }, [currentSceneKey, baseSceneKey, playbackPaused, playbackMuted]);

  return (
    <VideoCanvas
      aspectRatio={VIDEO_ASPECT_RATIO}
      style={{ backgroundColor: 'var(--color-bg-light)' }}
    >
      <VideoPausedContext.Provider value={playbackPaused}>
        <AnimatePresence mode="sync">
          {SceneComponent && <SceneComponent key={currentSceneKey} />}
        </AnimatePresence>
        <audio
          ref={audioRef}
          src={`${import.meta.env.BASE_URL}audio/bg_music.mp3`}
          preload="auto"
          autoPlay
          muted={playbackMuted}
        />
      </VideoPausedContext.Provider>
    </VideoCanvas>
  );
}
