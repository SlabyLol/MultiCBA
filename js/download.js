/**
 * MultiCBA – Real video download helper
 * Records a canvas for `duration` seconds and triggers a WebM download.
 * Browsers support WebM natively; convert to MP4 with any free tool if needed.
 */
window.MultiCBADownload = function (canvas, durationSec, filename) {
  return new Promise((resolve, reject) => {
    if (!canvas || !canvas.captureStream) {
      reject(new Error('Canvas capture not supported'));
      return;
    }

    const stream = canvas.captureStream(30);
    let mime = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm;codecs=vp8';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm';

    const chunks = [];
    let recorder;
    try {
      recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 4000000 });
    } catch (e) {
      recorder = new MediaRecorder(stream);
    }

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: mime.split(';')[0] });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (filename || 'boot-animation') + '.webm';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
      resolve();
    };

    recorder.onerror = (e) => reject(e.error || e);

    recorder.start(100);
    setTimeout(() => {
      if (recorder.state === 'recording') recorder.stop();
      stream.getTracks().forEach(t => t.stop());
    }, (durationSec || 5) * 1000);
  });
};
