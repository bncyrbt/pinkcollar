export const SidebarNavigation = () => {
  return (
    <aside className="w-20 flex flex-col items-center justify-start gap-5 py-4 ">
      <div className="h-12 w-12 rounded-full border-1 border-black"></div>
      <NavIcon icon="👤" label="Profile" />
      <NavIcon icon="🔍" label="Explore" />
      <NavIcon icon="👕" label="Garments" />
      <NavIcon icon="⚙️" label="Settings" />
    </aside>
  );
};

const NavIcon = ({ icon, label }: { icon: string; label: string }) => {
  return (
    <button
      className="w-12 h-12 rounded-md flex items-center justify-center border border-black hover:bg-muted transition"
      title={label}
    >
      <span className="text-xl">{icon}</span>
    </button>
  );
};
