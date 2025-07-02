import { useState, useEffect, useRef, RefObject } from 'react';

interface TouchGestureOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinch?: (scale: number) => void;
  onTap?: () => void;
  onDoubleTap?: () => void;
  swipeThreshold?: number;
  pinchThreshold?: number;
}

interface TouchState {
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  initialDistance: number;
  lastTapTime: number;
}

export const useTouchGestures = <T extends HTMLElement>(
  ref: RefObject<T>,
  options: TouchGestureOptions = {}
) => {
  const {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onPinch,
    onTap,
    onDoubleTap,
    swipeThreshold = 50,
    pinchThreshold = 0.1
  } = options;

  const touchState = useRef<TouchState>({
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    initialDistance: 0,
    lastTapTime: 0
  });

  const [isGesturing, setIsGesturing] = useState(false);

  const getDistance = (touch1: Touch, touch2: Touch) => {
    return Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) + 
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );
  };

  const handleTouchStart = (e: TouchEvent) => {
    const touches = e.touches;
    setIsGesturing(true);

    if (touches.length === 1) {
      // Single touch - potential swipe or tap
      touchState.current.startX = touches[0].clientX;
      touchState.current.startY = touches[0].clientY;
      touchState.current.currentX = touches[0].clientX;
      touchState.current.currentY = touches[0].clientY;
    } else if (touches.length === 2) {
      // Two touches - potential pinch
      touchState.current.initialDistance = getDistance(touches[0], touches[1]);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    const touches = e.touches;

    if (touches.length === 1) {
      touchState.current.currentX = touches[0].clientX;
      touchState.current.currentY = touches[0].clientY;
    } else if (touches.length === 2 && onPinch) {
      e.preventDefault(); // Prevent default zoom
      const currentDistance = getDistance(touches[0], touches[1]);
      const scale = currentDistance / touchState.current.initialDistance;
      
      if (Math.abs(scale - 1) > pinchThreshold) {
        onPinch(scale);
      }
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const touches = e.changedTouches;
    setIsGesturing(false);

    if (touches.length === 1) {
      const deltaX = touchState.current.currentX - touchState.current.startX;
      const deltaY = touchState.current.currentY - touchState.current.startY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      // Check for swipe gestures
      if (absDeltaX > swipeThreshold || absDeltaY > swipeThreshold) {
        if (absDeltaX > absDeltaY) {
          // Horizontal swipe
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        } else {
          // Vertical swipe
          if (deltaY > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (deltaY < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      } else {
        // Tap gesture
        const now = Date.now();
        const timeSinceLastTap = now - touchState.current.lastTapTime;
        
        if (timeSinceLastTap < 300 && onDoubleTap) {
          // Double tap
          onDoubleTap();
        } else if (onTap) {
          // Single tap
          setTimeout(() => {
            if (Date.now() - now >= 300) {
              onTap();
            }
          }, 300);
        }
        
        touchState.current.lastTapTime = now;
      }
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Add touch event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: false });
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, options]);

  return { isGesturing };
};
