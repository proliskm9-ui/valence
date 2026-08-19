export function MacChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="mcs-mac">
      <div className="mcs-mac-lid">
        <div className="mcs-mac-bezel">
          <div className="mcs-mac-notch" aria-hidden>
            <span className="mcs-mac-cam" />
          </div>
          {children}
        </div>
      </div>
      <div className="mcs-mac-deck" aria-hidden>
        <div className="mcs-mac-keys">
          {Array.from({ length: 56 }, (_, i) => (
            <span key={i} />
          ))}
        </div>
        <div className="mcs-mac-pad" />
      </div>
    </div>
  );
}

export function PhoneChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="mcs-phone">
      <div className="mcs-phone-island" aria-hidden />
      {children}
      <div className="mcs-phone-home" aria-hidden />
    </div>
  );
}
