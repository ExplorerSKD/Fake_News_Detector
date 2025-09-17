export function Footer() {
  return (
    <footer className="relative z-20 w-full p-4 mt-auto">
      <div className="container mx-auto text-center text-white/60">
        <p>&copy; {new Date().getFullYear()} Veritas. All rights reserved.</p>
      </div>
    </footer>
  );
}
