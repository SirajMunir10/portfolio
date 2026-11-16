/**
 * Page-wide backdrop behind every section: three slowly drifting colour fields (pure CSS gradients,
 * animated with transforms only) and a fine grain layer. It gives the glass surfaces something to blur.
 */
export function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-[20vh] -left-[15vw] h-[80vh] w-[70vw] rounded-full motion-safe:animate-[aurora-a_26s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(closest-side, var(--aurora-1), transparent)' }}
      />
      <div
        className="absolute top-[30vh] -right-[20vw] h-[85vh] w-[65vw] rounded-full motion-safe:animate-[aurora-b_32s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(closest-side, var(--aurora-2), transparent)' }}
      />
      <div
        className="absolute -bottom-[30vh] left-[15vw] h-[75vh] w-[60vw] rounded-full motion-safe:animate-[aurora-c_38s_ease-in-out_infinite]"
        style={{ background: 'radial-gradient(closest-side, var(--aurora-3), transparent)' }}
      />
      <div className="grain absolute inset-0 opacity-[0.07] mix-blend-overlay dark:opacity-[0.09]" />
    </div>
  )
}
