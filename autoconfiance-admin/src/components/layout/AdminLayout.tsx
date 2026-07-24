import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';

interface AdminLayoutProps {
  children?: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple Admin Header */}
      <header className="bg-charcoal text-ivory border-b border-border">
        <div className="container-luxury py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-lg font-display font-bold text-primary-foreground">DM</span>
              </div>
              <div>
                <h1 className="text-lg font-display font-bold">DRIVE IN MARRAKECH</h1>
                <p className="text-xs text-ivory/60">Administration</p>
              </div>
            </div>
            <a
              href="/"
              className="text-sm text-ivory/70 hover:text-ivory transition-colors"
            >
              ← Retour au site
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-8 pb-16">
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
