import React from 'react';
import { useMouse } from 'react-use';
import './App.css';

const { useRef, useEffect, useState } = React;
let startX = 0;
let startY = 0;
let ctx: CanvasRenderingContext2D | null = null;
let isDrawing = false;
let imgWidth = 0;
let imgHeight = 0;

const App: React.FC = () => {
  const [rects, setRects] = useState<Array<{x: number, y: number, w: number, h: number}>>([]);
  const [history, setHistory] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { elX, elY, elW, elH } = useMouse(canvasRef);

  const add2History = () => {
    if (ctx) {
      setHistory([...history, ctx.getImageData(0, 0, imgWidth, imgHeight)]);
    }
  }

  const move2LastHistoryData = () => {
    if (ctx && history.length > 0) {
      ctx.putImageData(history[history.length - 1], 0, 0);
    }
  }

  useEffect(() => {
    const url = 'http://ks3-cn-beijing.ksyun.com/kqoe/2000081926_kingsoft_stage_KIE_%E8%AF%84%E6%B5%8B/5%E4%B8%AA%E5%9B%BE%E7%89%87%E7%94%9F%E6%88%90%E7%89%88/7.jpg';
    const img = new Image();
    img.crossOrigin = '';
    img.src = url;
    img.onload = function (e) {
      if (canvasRef.current) {
        imgWidth = 800;
        const ratio = img.width / img.height;
        imgHeight = imgWidth / ratio;
        canvasRef.current.width = imgWidth;
        canvasRef.current.height = imgHeight;
        ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        add2History();
      }
    }
  }, []);

  useEffect(() => {
    console.log(rects);
  }, [rects]);

  const add2Rects = () => {
    let endX = elX;
    let endY = elY;
    if (endX < 0) {
      endX = 0;
    } else if (endX > elW) {
      endX = elW;
    }

    if (endY < 0) {
      endY = 0;
    } else if (endY > elH) {
      endY = elH;
    }

    const w = endX - startX;
    const h = endY - startY;

    if (w <= 0 || h <= 0) {
      return;
    }

    const rect = {
      x: startX,
      y: startY,
      w,
      h,
    };

    setRects([...rects, rect]);
  }

  const start = () => {
    if (elX > 0 && elY > 0 && elX < elW && elY < elH) {
      isDrawing = true;
      startX = elX;
      startY = elY;
    }
  };

  const move = () => {
    if (isDrawing && ctx) {
      if (elX > 0 && elY > 0 && elX < elW && elY < elH) {
        const currentX = elX;
        const currentY = elY;
        const w = currentX - startX;
        const h = currentY - startY;
        move2LastHistoryData();

        ctx.strokeStyle = 'red';
        ctx.strokeRect(startX, startY, w, h);
        return;
      }
    }
  }

  const end = () => {
    if (isDrawing) {
      add2History();
      add2Rects();
      isDrawing = false;
    }
  }

  return (
    <div className="App">
      <canvas
        ref={canvasRef}
        onMouseDown={start}
        onMouseUp={end}
        onMouseLeave={end}
        onMouseMove={move}
      />
    </div>
  );
}

export default App;
