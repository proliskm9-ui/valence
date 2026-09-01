/** Asset frames with pre-cut transparent screens — content sits in the slot behind. */

type Slot = { left: string; top: string; width: string; height: string; radius?: string };

const MACBOOK_AIR_13 = {
  src: '/cases/frames/macbook-air-13.png?v=3',
  /**
   * Transparent screen hole (3260×2164), inset ~2–3px so the bezel
   * always covers the seam (avoids hairline glow from the stage behind).
   */
  slot: {
    left: '10.80%',
    top: '11.62%',
    width: '78.40%',
    height: '76.70%',
    radius: '1.1% / 1.5%',
  } satisfies Slot,
};

const MACBOOK_PRO_14 = {
  src: '/cases/frames/macbook-pro-14.png?v=7',
  /**
   * Cover the full glass hole (~11.69/11.74/76.62/76.52) with a touch of overscan
   * so rounded corners never show the stage. Radius set in CSS (slash form).
   */
  slot: {
    left: '11.50%',
    top: '11.55%',
    width: '77.00%',
    height: '76.90%',
  } satisfies Slot,
};

const IPHONE_16_PRO = {
  src: '/cases/frames/iphone-16-pro.png',
  /** Transparent hole (1406×2822). */
  slot: {
    left: '7.33%',
    top: '3.58%',
    width: '85.78%',
    height: '92.91%',
    radius: '12% / 6%',
  } satisfies Slot,
};

function AssetChrome({
  src,
  slot,
  className,
  children,
}: {
  src: string;
  slot: Slot;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`mcs-asset ${className}`.trim()}>
      <div
        className="mcs-asset-slot"
        style={{
          left: slot.left,
          top: slot.top,
          width: slot.width,
          height: slot.height,
          ...(slot.radius ? { borderRadius: slot.radius } : null),
        }}
      >
        {children}
      </div>
      <img className="mcs-asset-frame" src={src} alt="" draggable={false} />
    </div>
  );
}

export function MacBookAirChrome({ children }: { children: React.ReactNode }) {
  const { src, slot } = MACBOOK_AIR_13;
  return (
    <AssetChrome src={src} slot={slot} className="mcs-asset--macbook mcs-asset--air">
      {children}
    </AssetChrome>
  );
}

export function MacBookProChrome({ children }: { children: React.ReactNode }) {
  const { src, slot } = MACBOOK_PRO_14;
  return (
    <AssetChrome src={src} slot={slot} className="mcs-asset--macbook mcs-asset--pro">
      {children}
    </AssetChrome>
  );
}

export function PhoneAssetChrome({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { src, slot } = IPHONE_16_PRO;
  return (
    <AssetChrome src={src} slot={slot} className={`mcs-asset--phone ${className}`.trim()}>
      {children}
    </AssetChrome>
  );
}

/** @deprecated Prefer MacBookAirChrome / PhoneAssetChrome */
export function BrowserChrome({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div className="mcs-browser">
      <div className="mcs-browser-bar" aria-hidden>
        <span className="mcs-browser-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="mcs-browser-url">{url}</span>
        <span className="mcs-browser-ghost" />
      </div>
      {children}
    </div>
  );
}

/** @deprecated Prefer PhoneAssetChrome */
export function PhoneChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="mcs-phone">
      <div className="mcs-phone-island" aria-hidden />
      {children}
      <div className="mcs-phone-home" aria-hidden />
    </div>
  );
}
