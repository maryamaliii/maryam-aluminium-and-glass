import Logo from "./Logo";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header 
      className="sticky top-0 z-50 bg-transparent shadow-sm"
      style={{
        backdropFilter: "blur(5px)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
}
