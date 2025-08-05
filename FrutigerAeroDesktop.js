// Frutiger Aero Desktop Window Drag/Resize
(function() {
  function makeDraggableResizable(win) {
    let isDragging = false, isResizing = false;
    let startX, startY, startWidth, startHeight, startLeft, startTop;
    const titleBar = win.querySelector('.title-bar');
    const resizer = document.createElement('div');
    resizer.className = 'window-resizer';
    win.appendChild(resizer);

    // Drag
    titleBar.addEventListener('mousedown', function(e) {
      if (e.target.closest('.title-bar-controls')) return;
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = win.getBoundingClientRect();
      startLeft = rect.left + window.scrollX;
      startTop = rect.top + window.scrollY;
      document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', function(e) {
      if (isDragging) {
        win.style.position = 'absolute';
        win.style.left = (startLeft + e.clientX - startX) + 'px';
        win.style.top = (startTop + e.clientY - startY) + 'px';
      } else if (isResizing) {
        win.style.width = Math.max(300, startWidth + e.clientX - startX) + 'px';
        win.style.height = Math.max(150, startHeight + e.clientY - startY) + 'px';
      }
    });
    document.addEventListener('mouseup', function() {
      isDragging = false;
      isResizing = false;
      document.body.style.userSelect = '';
    });

    // Resize
    resizer.addEventListener('mousedown', function(e) {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = win.offsetWidth;
      startHeight = win.offsetHeight;
      document.body.style.userSelect = 'none';
      e.stopPropagation();
    });
  }

  function init() {
    document.querySelectorAll('.window').forEach(makeDraggableResizable);
  }

  // Add styles
  const style = document.createElement('style');
  style.textContent = `
    .window { position: absolute; min-width: 300px; min-height: 150px; box-shadow: 0 8px 32px #0003; }
    .window-resizer {
      position: absolute; right: 0; bottom: 0; width: 18px; height: 18px;
      cursor: se-resize; z-index: 10;
      background: linear-gradient(135deg, #fff8 60%, #0002 100%);
      border-bottom-right-radius: 8px;
    }
    .window.active { z-index: 1000; }
  `;
  document.head.appendChild(style);

  window.addEventListener('DOMContentLoaded', init);
})();
