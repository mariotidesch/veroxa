import { useCallback, useEffect, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { ChevronDown, ChevronUp, Pause, Play, Repeat, Volume2, VolumeX } from 'lucide-react';
import VideoTemplate, { SCENE_DURATIONS } from './VideoTemplate';
import { useSceneControls } from './useSceneControls';

const SCENE_DETAILS: Record<string, { title: string; filePath: string }> = {
  story: { title: 'Il tuo mondo online', filePath: 'src/components/video/scenes/Scene01.tsx' },
  build: { title: 'Siti web', filePath: 'src/components/video/scenes/Scene02.tsx' },
  design: { title: 'Design e immagine', filePath: 'src/components/video/scenes/Scene03.tsx' },
  commerce: { title: 'E-commerce', filePath: 'src/components/video/scenes/Scene04.tsx' },
  booking: { title: 'Prenotazioni', filePath: 'src/components/video/scenes/Scene05.tsx' },
  seo: { title: 'SEO', filePath: 'src/components/video/scenes/Scene06.tsx' },
  responsive: { title: 'Responsive', filePath: 'src/components/video/scenes/Scene07.tsx' },
  workflow: { title: 'Servizio completo', filePath: 'src/components/video/scenes/Scene08.tsx' },
  ownership: { title: 'Per chi visita e gestisce', filePath: 'src/components/video/scenes/Scene09.tsx' },
  signature: { title: 'Veroxa', filePath: 'src/components/video/scenes/Scene10.tsx' },
};
const PROGRESS_TICK_MS = 60;

function formatPlaybackTime(durationMs: number) {
  const seconds = Math.max(0, Math.floor(durationMs / 1000));
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
}

function announceSceneSelection(index: number, sceneKeys: string[]) {
  const key = sceneKeys[index];
  const details = SCENE_DETAILS[key];
  if (!details?.filePath) return;
  window.parent.postMessage({
    type: 'REPLIT_VIDEO_SCENE_SELECTED',
    payload: {
      sceneIndex: index,
      sceneCount: sceneKeys.length,
      sceneTitle: details.title,
      filePath: details.filePath,
      lineNumber: 1,
    },
  }, '*');
}

function PlaybackStatus({
  sceneKeys, activeIndex, activeDuration, activeStartTime, totalDuration, tick, paused, onJumpTo,
}: {
  sceneKeys: string[];
  activeIndex: number;
  activeDuration: number;
  activeStartTime: number;
  totalDuration: number;
  tick: number;
  paused: boolean;
  onJumpTo: (index: number) => void;
}) {
  const [elapsed, setElapsed] = useState(0);
  const elapsedBaseRef = useRef(0);

  useEffect(() => {
    setElapsed(0);
    elapsedBaseRef.current = 0;
  }, [tick]);

  useEffect(() => {
    if (paused) return;
    const start = performance.now();
    const id = window.setInterval(() => setElapsed(elapsedBaseRef.current + (performance.now() - start)), PROGRESS_TICK_MS);
    return () => {
      window.clearInterval(id);
      elapsedBaseRef.current += performance.now() - start;
    };
  }, [tick, paused]);

  const progress = activeDuration > 0 ? Math.min(1, elapsed / activeDuration) : 0;
  const totalElapsed = Math.min(totalDuration, activeStartTime + Math.min(elapsed, activeDuration));
  return (
    <>
      <div className="flex flex-1 items-center gap-1.5" style={{ minWidth: '10%' }}>
        {sceneKeys.map((key, i) => (
          <button key={key} onClick={() => onJumpTo(i)} aria-label={`Vai alla scena ${i + 1}`}
            aria-current={i === activeIndex ? 'true' : undefined}
            className="relative h-1.5 min-h-[10px] flex-1 overflow-hidden rounded-full bg-white/25 transition-all hover:h-2.5">
            <span className="absolute inset-y-0 left-0 rounded-full bg-white/90" style={{ width: `${i === activeIndex ? progress * 100 : i < activeIndex ? 100 : 0}%` }} />
          </button>
        ))}
      </div>
      <span className="shrink-0 font-mono text-[11px] tabular-nums text-white/70">{activeIndex + 1}/{sceneKeys.length}</span>
      <span className="min-w-[9ch] shrink-0 text-right font-mono text-[11px] tabular-nums text-white/80" role="timer"
        aria-label={`Riproduzione ${formatPlaybackTime(totalElapsed)} di ${formatPlaybackTime(totalDuration)}`}>
        {formatPlaybackTime(totalElapsed)} / {formatPlaybackTime(totalDuration)}
      </span>
    </>
  );
}

export default function VideoWithControls() {
  const isIframed = typeof window !== 'undefined' && window.self !== window.top;
  const controls = useSceneControls(SCENE_DURATIONS);
  const [muted, setMuted] = useState(false);
  const sensorRef = useRef<HTMLDivElement | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [tapPinned, setTapPinned] = useState(false);

  const handleJumpTo = useCallback((index: number) => {
    controls.jumpTo(index);
    announceSceneSelection(index, controls.sceneKeys);
  }, [controls.jumpTo, controls.sceneKeys]);

  useEffect(() => {
    if (!controls.paused) return;
    const running = document.getAnimations().filter((animation) => animation.playState === 'running');
    running.forEach((animation) => animation.pause());
    return () => running.forEach((animation) => animation.play());
  }, [controls.paused]);

  const handlePointerEnter = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(true);
  }, []);
  const handlePointerLeave = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse') setHovering(false);
  }, []);
  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse' && collapsed) setTapPinned(true);
  }, [collapsed]);
  const handleToggleCollapsed = useCallback(() => {
    setCollapsed((value) => {
      if (!value) { setHovering(false); setTapPinned(false); }
      return !value;
    });
  }, []);

  useEffect(() => {
    if (!(collapsed && tapPinned)) return;
    const handleOutside = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') return;
      if (sensorRef.current && !sensorRef.current.contains(event.target as Node)) setTapPinned(false);
    };
    document.addEventListener('pointerdown', handleOutside);
    return () => document.removeEventListener('pointerdown', handleOutside);
  }, [collapsed, tapPinned]);

  if (!isIframed) return <VideoTemplate />;
  const barVisible = !collapsed || hovering || tapPinned;

  return (
    <div className="relative h-screen w-full">
      <VideoTemplate key={controls.mountKey} durations={controls.durations} loop paused={controls.paused} muted={muted} onSceneChange={controls.onSceneChange} />
      <div ref={sensorRef} className="absolute bottom-0 left-0 right-0 z-50 flex flex-col justify-end"
        style={{ height: '25%' }} onPointerEnter={handlePointerEnter} onPointerLeave={handlePointerLeave} onPointerDown={handlePointerDown}>
        <div className="w-full flex-1" aria-hidden="true" />
        <div className={`flex items-center gap-2.5 border-t border-white/10 bg-[#07162f]/75 px-3 py-2.5 backdrop-blur-md transition-all duration-200 ease-out ${barVisible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-full opacity-0'}`} aria-hidden={!barVisible}>
          <button onClick={controls.togglePause} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/75 transition-colors hover:bg-white/10 hover:text-white" title={controls.paused ? 'Riprendi' : 'Pausa'} aria-label={controls.paused ? 'Riprendi' : 'Pausa'}>
            {controls.paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
          <button onClick={controls.toggleLock} className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-white/10 ${controls.locked ? 'bg-white/20 text-white' : 'text-white/65 hover:text-white'}`}
            title={controls.locked ? 'Ripeti scena: attivo' : 'Ripeti scena'} aria-label={controls.locked ? 'Ripeti scena: attivo' : 'Ripeti scena'} aria-pressed={controls.locked}>
            <Repeat className="h-4 w-4" />
          </button>
          <button onClick={() => setMuted((value) => !value)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/65 transition-colors hover:bg-white/10 hover:text-white"
            title={muted ? 'Attiva audio' : 'Silenzia audio'} aria-label={muted ? 'Attiva audio' : 'Silenzia audio'}>
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <div className="h-6 w-px shrink-0 bg-white/20" aria-hidden="true" />
          <PlaybackStatus sceneKeys={controls.sceneKeys} activeIndex={controls.activeIndex} activeDuration={controls.activeDuration}
            activeStartTime={controls.activeStartTime} totalDuration={controls.totalDuration} tick={controls.tick} paused={controls.paused} onJumpTo={handleJumpTo} />
          <button onClick={handleToggleCollapsed} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            title={collapsed ? 'Mostra controlli' : 'Nascondi controlli'} aria-label={collapsed ? 'Mostra controlli' : 'Nascondi controlli'} aria-expanded={!collapsed}>
            {collapsed ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
