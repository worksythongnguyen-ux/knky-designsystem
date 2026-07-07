import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import styles from "./Scrollable.module.css";
import { ArrowIcon } from "../Icon";

export type ScrollableOrientation = "horizontal" | "vertical";

export interface ScrollableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Figma "Horizontal" toggle. Defaults to "horizontal" (Figma's own default demo). */
  orientation?: ScrollableOrientation;
  /**
   * Figma "Mobile" variant — adds prev/next arrow buttons that scroll by
   * `scrollStep` px. Only meaningful for `orientation="horizontal"` (Figma
   * never showed a vertical+arrows combination).
   */
  arrows?: boolean;
  /** px scrolled per arrow click (smooth-scrolled). Defaults to 200. */
  scrollStep?: number;
  className?: string;
}

const MIN_THUMB_SIZE = 24;

/**
 * A scroll container with a custom, always-visible track + thumb bar,
 * matching Figma node 40:5256 ("Utilities/Scrollable"). The real browser
 * scrollbar is hidden entirely — this was previously implemented via
 * `scrollbar-color`/`::-webkit-scrollbar-*`, but native scrollbars are
 * overlay/auto-hiding by default on most OS + browser combinations (they only
 * appear while actively scrolling, then fade out), which doesn't match
 * Figma's static, always-visible track+thumb mockup, and Firefox's
 * `scrollbar-color` can't reproduce the thin-track/thick-thumb geometry at
 * all. So the bar here is fully custom: real content still scrolls natively
 * (wheel/trackpad/touch/keyboard all keep working on the hidden-scrollbar
 * container), but thumb size/position are computed from scroll metrics and
 * the thumb is draggable via pointer events, so the bar always renders
 * exactly like the design regardless of platform.
 */
export const Scrollable = forwardRef<HTMLDivElement, ScrollableProps>(function Scrollable(
  { children, orientation = "horizontal", arrows = false, scrollStep = 200, className, ...rest },
  ref,
) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<{ pointerStart: number; scrollStart: number } | null>(null);

  const isHorizontal = orientation === "horizontal";
  const showArrows = arrows && isHorizontal;

  const [thumb, setThumb] = useState<{ size: number; offset: number; visible: boolean }>({
    size: 0,
    offset: 0,
    visible: false,
  });
  const [dragging, setDragging] = useState(false);

  const measure = useCallback(() => {
    const el = innerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const clientSize = isHorizontal ? el.clientWidth : el.clientHeight;
    const scrollSize = isHorizontal ? el.scrollWidth : el.scrollHeight;
    const scrollPos = isHorizontal ? el.scrollLeft : el.scrollTop;
    const trackLength = isHorizontal ? track.clientWidth : track.clientHeight;

    if (scrollSize <= clientSize + 1 || trackLength <= 0) {
      setThumb({ size: 0, offset: 0, visible: false });
      return;
    }

    const size = Math.max((clientSize / scrollSize) * trackLength, MIN_THUMB_SIZE);
    const maxOffset = trackLength - size;
    const scrollRange = scrollSize - clientSize;
    const offset = scrollRange > 0 ? (scrollPos / scrollRange) * maxOffset : 0;

    setThumb({ size, offset, visible: true });
  }, [isHorizontal]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    measure();

    const handleScroll = () => measure();
    el.addEventListener("scroll", handleScroll, { passive: true });

    const resizeObserver = new ResizeObserver(() => measure());
    resizeObserver.observe(el);
    if (el.firstElementChild) resizeObserver.observe(el.firstElementChild);

    return () => {
      el.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();
    };
  }, [measure]);

  function scrollByStep(amount: number) {
    innerRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const el = innerRef.current;
    if (!el) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerStart: isHorizontal ? event.clientX : event.clientY,
      scrollStart: isHorizontal ? el.scrollLeft : el.scrollTop,
    };
    setDragging(true);
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const el = innerRef.current;
    const track = trackRef.current;
    if (!el || !track || !dragRef.current) return;

    const clientSize = isHorizontal ? el.clientWidth : el.clientHeight;
    const scrollSize = isHorizontal ? el.scrollWidth : el.scrollHeight;
    const trackLength = isHorizontal ? track.clientWidth : track.clientHeight;
    const thumbSize = Math.max((clientSize / scrollSize) * trackLength, MIN_THUMB_SIZE);
    const maxOffset = trackLength - thumbSize;
    if (maxOffset <= 0) return;

    const pointerPos = isHorizontal ? event.clientX : event.clientY;
    const delta = pointerPos - dragRef.current.pointerStart;
    const scrollRange = scrollSize - clientSize;
    const nextScroll = dragRef.current.scrollStart + delta * (scrollRange / maxOffset);

    if (isHorizontal) el.scrollLeft = nextScroll;
    else el.scrollTop = nextScroll;
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setDragging(false);
  }

  return (
    <div className={[styles.wrapper, styles[orientation]].filter(Boolean).join(" ")}>
      {showArrows && (
        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollByStep(-scrollStep)}
          aria-label="Scroll back"
        >
          <ArrowIcon direction="prev" size={20} />
        </button>
      )}
      <div className={[styles.viewportGroup, styles[orientation]].filter(Boolean).join(" ")}>
        <div
          ref={(node) => {
            innerRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          className={[styles.scrollable, styles[orientation], className].filter(Boolean).join(" ")}
          {...rest}
        >
          {children}
        </div>
        <div ref={trackRef} className={[styles.track, styles[orientation]].filter(Boolean).join(" ")}>
          {thumb.visible && (
            <div
              className={[styles.thumb, dragging ? styles.dragging : null].filter(Boolean).join(" ")}
              style={
                isHorizontal
                  ? { width: thumb.size, transform: `translateY(-50%) translateX(${thumb.offset}px)` }
                  : { height: thumb.size, transform: `translateX(-50%) translateY(${thumb.offset}px)` }
              }
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />
          )}
        </div>
      </div>
      {showArrows && (
        <button
          type="button"
          className={styles.arrow}
          onClick={() => scrollByStep(scrollStep)}
          aria-label="Scroll forward"
        >
          <ArrowIcon direction="next" size={20} />
        </button>
      )}
    </div>
  );
});
