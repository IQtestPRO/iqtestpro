"use client"

export function NeuralBackground() {
  return (
    <>
      <div className="neural-background fixed inset-0 -z-40 pointer-events-none overflow-hidden">
        <div className="neural-connections"></div>
        <div className="brain-shapes"></div>
      </div>
    </>
  )
}

export default NeuralBackground
