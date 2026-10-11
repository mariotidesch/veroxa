import { useEffect, useRef, type ComponentType } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import { Scene06 } from './scenes/Scene06';
import { Scene07 } from './scenes/Scene07';
import { Scene08 } from './scenes/Scene08';
import { Scene09 } from './scenes/Scene09';
import { Scene10 } from './scenes/Scene10';

export const SCENE_DURATIONS = {
  story: 3350,
  build: 2850,
  design: 3350,
  commerce: 2400,
  booking: 2950,
  seo: 2750,
  responsive: 2850,
  workflow: 2850,
  ownership: 2850,
  signature: 3800,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '16:9';
const SCENE_COMPONENTS: Record<string, ComponentType> = {
  story: Scene01,
  build: Scene02,
  design: Scene03,
  commerce: Scene04,
  booking: Scene05,
  seo: Scene06,
  responsive: Scene07,
  workflow: Scene08,
  ownership: Scene09,
  signature: Scene10,
};
const CARRIER_POSITIONS = [12, 68, 36, 78, 24, 82, 52, 18, 90, 46];
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
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const carrierX = CARRIER_POSITIONS[Math.max(0, sceneIndex)];

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
        <motion.div
          className="film-camera"
          initial={false}
          animate={{
            scale: sceneIndex % 2 === 0 ? 1.022 : 1.038,
            rotateZ: sceneIndex % 2 === 0 ? -0.12 : 0.12,
          }}
          transition={{ duration: 0.38, ease: [0.2, 0.7, 0.2, 1] }}
          style={{ transformPerspective: 1500 }}
        >
          <AnimatePresence mode="sync">
            {SceneComponent && <SceneComponent key={currentSceneKey} />}
          </AnimatePresence>
          <div className="film-carrier" aria-hidden="true">
            <span className="film-carrier-line" />
            <motion.span
              className="film-carrier-travel"
              initial={false}
              animate={{ x: `${carrierX}%` }}
              transition={{ duration: 0.34, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <span className="film-carrier-point" />
            </motion.span>
          </div>
        </motion.div>
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
