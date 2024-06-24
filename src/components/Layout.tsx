import { useState } from 'react';
import AuthModal from '../components/Login/AuthModal';
import '../styles/globals.css';

const Layout = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {children}
    </div>
  );
};

export default Layout;
