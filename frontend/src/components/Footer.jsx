import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-white border-t border-gray-200 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo-tmb.png" 
                alt="TMB Logo" 
                className="h-5 sm:h-6 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
              <div className="text-center sm:text-left">
                <span className="text-xs sm:text-sm text-gray-600 block">
                  © {currentYear} TMB. Todos os direitos reservados.
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Sistema Online</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <span>v1.0.0</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between pt-3 border-t border-gray-100 space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <Link to="/" className="hover:text-primary-main transition-colors">
                Início
              </Link>
              <span>•</span>
              <span>Sistema de Gestão de Pedidos</span>
            </div>
            <div className="text-xs text-gray-400">
              <a href="https://github.com/jjuniordev/oms-challenge-api" target="_blank" rel="noopener noreferrer" className="hover:text-primary-main transition-colors">
                <span>Desenvolvido com ❤️ por Junior Nascimento</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
