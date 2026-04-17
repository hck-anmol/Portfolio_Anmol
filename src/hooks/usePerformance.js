/**
 * Detects if the user's device is low-end and should use the
 * simpler 2D canvas fallback instead of Three.js 3D rendering.
 */
export function detectLowEnd() {
  try {
    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency;
    if (cores && cores <= 2) return true;

    // Check device memory (if available)
    const memory = navigator.deviceMemory;
    if (memory && memory < 4) return true;

    // Check connection
    const conn = navigator.connection;
    if (conn) {
      const slowTypes = ['slow-2g', '2g'];
      if (slowTypes.includes(conn.effectiveType)) return true;
    }

    // Try to create a WebGL2 context — if it fails, treat as low-end
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;

    // Check max texture size (low-end GPUs tend to have lower limits)
    const maxTexture = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    if (maxTexture < 4096) return true;

    return false;
  } catch {
    return false;
  }
}

import { useState, useEffect } from 'react';

export function usePerformance() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setIsLowEnd(detectLowEnd());
    setChecked(true);
  }, []);

  return { isLowEnd, checked };
}
