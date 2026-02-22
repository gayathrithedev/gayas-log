function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-[14px] text-[var(--text-secondary)] py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[var(--border)] mt-auto">
      <div>
        © Gayathri Perumal {currentYear}
      </div>
      <div>
        Less is more
      </div>
    </footer>
  )
}

export default Footer