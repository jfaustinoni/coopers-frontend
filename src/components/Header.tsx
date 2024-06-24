import Image from "next/image";
import Logo from "../../public/Logo.svg";
import LogoutButton from "../components/Login/LogoutButton";
import AuthModal from "../components/Login/AuthModal";

interface HeaderProps {
  isLoggedIn: boolean;
  handleOpenModal: () => void;
  handleLogout: () => void;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleLogin: () => void;
}

export function Header({
  isLoggedIn,
  handleOpenModal,
  handleLogout,
  isModalOpen,
  handleCloseModal,
  handleLogin,
}: HeaderProps) {
  return (
    <header className="relative w-full h-12 flex items-center sm:z-20 lg:container lg:mx-auto lg:py-11">
      <div className="w-full max-w-screen-xl mx-auto px-3 flex items-center justify-between">
        <Image
          src={Logo}
          alt="Company Logo"
          className="logo-image w-32 md:w-40 lg:w-48"
        />
        <nav aria-label="Main Navigation">
          {isLoggedIn ? (
            <LogoutButton onLogout={handleLogout} />
          ) : (
            <>
              <button
                onClick={handleOpenModal}
                className="bg-black font-poppins font-bold text-white py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white hover:bg-gray-800 btn-login lg:px-9"
                aria-label="Log in to your account"
              >
                entrar
              </button>
              <AuthModal
                open={isModalOpen}
                onClose={handleCloseModal}
                onLogin={handleLogin}
              />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
