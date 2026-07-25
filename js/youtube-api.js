function onYouTubeIframeAPIReady() {
  const frame = document.getElementById('bg-video');
  if (!frame) return;

  window.bgVideoPlayer = new YT.Player(frame, {
    events: {
      onReady: (event) => {
        const player = event.target;
        player.playVideo();
        player.mute();

        // Try to disable captions via API and caption settings.
        try {
          player.unloadModule('captions');
        } catch (error) {
          console.warn('YouTube captions module unload failed:', error);
        }

        try {
          player.setOption('captions', 'track', { languageCode: '' });
        } catch (error) {
          console.warn('YouTube captions setOption failed:', error);
        }
      }
    }
  });
}
