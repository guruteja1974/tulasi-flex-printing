export default function HomeConceptArtwork({ label, type }) {
  return (
    <svg
      aria-label={label}
      className="home-concept-artwork"
      role="img"
      viewBox="0 0 400 267"
    >
      {type === 'invitation' && (
        <>
          <rect fill="#121214" height="267" width="400" />
          <circle cx="330" cy="40" fill="#d4af37" opacity=".06" r="120" />
          <g transform="rotate(-6 200 140)">
            <rect fill="#1a1a1c" height="150" rx="6" stroke="#d4af37" width="208" x="96" y="64" />
            <rect fill="none" height="126" rx="3" stroke="#d4af37" strokeOpacity=".4" width="184" x="108" y="76" />
            <path d="M200 94l14 22-14 22-14-22z" fill="none" stroke="#f0dc8a" strokeWidth="1.5" />
            <path d="M148 158h104M164 172h72" stroke="#d4af37" strokeOpacity=".7" />
          </g>
        </>
      )}
      {type === 'signage' && (
        <>
          <rect fill="#0e0e11" height="267" width="400" />
          <rect fill="#18181b" height="227" stroke="#d4af37" strokeOpacity=".5" width="120" x="140" y="40" />
          <g fill="#d4af37" opacity=".55">
            {[80, 112, 144].map((y) =>
              [156, 192, 228].map((x) => (
                <rect height="12" key={`${x}-${y}`} width="16" x={x} y={y} />
              )),
            )}
          </g>
          <rect fill="#0a0a0b" height="20" rx="2" stroke="#f0dc8a" width="88" x="156" y="48" />
          <path d="M168 58h64M0 240h400" stroke="#f0dc8a" strokeLinecap="round" strokeWidth="3" />
        </>
      )}
      {type === 'display' && (
        <>
          <rect fill="#101013" height="267" width="400" />
          <rect fill="#1c1c1f" height="110" stroke="#d4af37" width="280" x="60" y="48" />
          <rect fill="none" height="86" stroke="#d4af37" strokeOpacity=".35" width="256" x="72" y="60" />
          <path d="M96 90h120M96 108h80" stroke="#f0dc8a" strokeLinecap="round" strokeWidth="4" />
          <rect fill="#d4af37" height="56" opacity=".18" width="72" x="240" y="76" />
          <path d="M130 158v90M270 158v90M130 190h140M130 220h140M0 248h400" stroke="#9aa5b8" strokeOpacity=".5" />
        </>
      )}
      {type === 'storefront' && (
        <>
          <rect fill="#0f0f12" height="267" width="400" />
          <rect fill="#161619" height="170" stroke="#d4af37" strokeOpacity=".6" width="240" x="80" y="70" />
          <rect fill="#0a0a0b" height="30" stroke="#d4af37" width="240" x="80" y="70" />
          <path d="M160 85h80" stroke="#f0dc8a" strokeLinecap="round" strokeWidth="4" />
          <rect fill="#d4af37" height="120" opacity=".12" stroke="#d4af37" strokeOpacity=".5" width="80" x="104" y="120" />
          <rect fill="#d4af37" height="120" opacity=".12" stroke="#d4af37" strokeOpacity=".5" width="80" x="216" y="120" />
        </>
      )}
      {type === 'stationery' && (
        <>
          <rect fill="#121214" height="267" width="400" />
          <rect fill="#1e1e21" height="196" rx="3" stroke="#fff" strokeOpacity=".15" width="150" x="108" y="36" />
          <path d="M128 66h60M128 90h100M128 104h100M128 118h80" stroke="#9aa5b8" strokeOpacity=".6" />
          <rect fill="#d4af37" height="4" width="28" x="128" y="60" />
          <rect fill="#0a0a0b" height="70" rx="3" stroke="#d4af37" transform="rotate(8 286 185)" width="120" x="226" y="150" />
          <path d="M242 176h56" stroke="#f0dc8a" strokeLinecap="round" strokeWidth="3" transform="rotate(8 286 185)" />
        </>
      )}
      {type === 'merchandise' && (
        <>
          <rect fill="#101013" height="267" width="400" />
          <path
            d="M96 70l36-18c8 18 40 18 48 0l36 18 18 40-30 10v90H108v-90l-30-10z"
            fill="#121a30"
            stroke="#d4af37"
            strokeOpacity=".7"
          />
          <circle cx="156" cy="122" fill="none" r="10" stroke="#f0dc8a" />
          <rect fill="#1d1a10" height="120" rx="4" stroke="#d4af37" width="80" x="256" y="76" />
          <path d="M272 110h48M272 126h48M272 142h32" stroke="#f0dc8a" strokeOpacity=".8" />
        </>
      )}
    </svg>
  );
}
