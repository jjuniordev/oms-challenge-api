import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const getBreadcrumb = () => {
    if (location.pathname === '/') return 'Pedidos';
    if (location.pathname.includes('/edit')) return 'Editar Pedido';
    if (location.pathname.includes('/order/')) return 'Detalhes do Pedido';
    return 'Pedidos';
  };

  return (
    <header className="bg-neutral-white shadow-md border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <img 
              src="/logo-tmb.png" 
              alt="TMB Logo" 
              className="h-8 w-auto"
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-neutral-black leading-tight">
                TMB Sistema
              </span>
              <span className="text-xs text-gray-500 hidden sm:block">
                Gestão de Pedidos
              </span>
            </div>
          </Link>
          
          <div className="hidden sm:flex items-center space-x-6">
            <nav className="flex items-center space-x-1 text-sm text-gray-500">
              <Link to="/" className="hover:text-primary-main transition-colors">
                Início
              </Link>
              {location.pathname !== '/' && (
                <>
                  <span>/</span>
                  <span className="text-neutral-black font-medium">{getBreadcrumb()}</span>
                </>
              )}
            </nav>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="sm:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-6 h-6 text-neutral-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {isMobileMenuOpen && (
          <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`font-medium transition-colors px-3 py-2 rounded-lg ${
                  isActive('/') 
                    ? 'text-neutral-white bg-primary-main' 
                    : 'text-neutral-black hover:text-primary-main hover:bg-gray-50'
                }`}
              >
                📋 Gerenciar Pedidos
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
