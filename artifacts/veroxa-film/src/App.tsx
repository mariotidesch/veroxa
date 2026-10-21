export default function App() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-black">
      <video
        className="h-full w-full bg-black object-contain"
        src={`${import.meta.env.BASE_URL}videos/veroxa-presentazione-25s.mp4`}
        poster={`${import.meta.env.BASE_URL}videos/veroxa-poster.jpg`}
        controls
        playsInline
        preload="metadata"
        aria-label="Film di presentazione di Veroxa"
        data-testid="video-veroxa-presentazione"
      >
        Il browser non supporta la riproduzione video.
      </video>
    </main>
  );
}
