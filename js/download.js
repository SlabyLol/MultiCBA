/**
 * MultiCBA – Real video download (canvas → WebM via MediaRecorder)
 */
window.MultiCBADownload = function (canvas, durationSec, filename, onProgress) {
  return new Promise((resolve, reject) => {
    if (!canvas || !canvas.captureStream) {
      reject(new Error('Canvas capture not supported in this browser'));
      return;
    }
    if (typeof MediaRecorder === 'undefined') {
      reject(new Error('MediaRecorder not supported'));
      return;
    }

    const stream = canvas.captureStream(30);
    let mime = 'video/webm;codecs=vp9';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm;codecs=vp8';
    if (!MediaRecorder.isTypeSupported(mime)) mime = 'video/webm';

    const chunks = [];
    let recorder;
    try {
      recorder = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 5000000 });
    } catch (e) {
      recorder = new MediaRecorder(stream);
    }

    recorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: (mime.split(';')[0] || 'video/webm') });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = (filename || 'boot-animation') + '.webm';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 3000);
      resolve(blob);
    };

    recorder.onerror = (e) => reject(e.error || e);

    if (onProgress) onProgress('recording');
    recorder.start(100);

    setTimeout(() => {
      if (recorder.state === 'recording') recorder.stop();
      stream.getTracks().forEach((t) => t.stop());
      if (onProgress) onProgress('done');
    }, Math.max(1, durationSec || 5) * 1000);
  });
};

window.MultiCBABindDownload = function (btnId, canvas, durationSec, filename) {
  const btn = document.getElementById(btnId);
  if (!btn) return;
  btn.onclick = async function () {
    const label = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Recording…';
    try {
      await MultiCBADownload(canvas, durationSec, filename);
      btn.textContent = 'Downloaded!';
    } catch (e) {
      console.error(e);
      btn.textContent = 'Error – try Chrome/Firefox';
    }
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = label;
    }, 2200);
  };
};
