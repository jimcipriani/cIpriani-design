export default function Footer() {
  return (
    <footer className="bg-ink py-8">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        <span className="font-sc text-paper/50 text-xs tracking-[0.18em]">CIPRIANI DESIGN</span>
        <span className="label text-paper/30">Nashville, TN · {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
