import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

interface AdminAuthProps {
  children: React.ReactNode;
}

export const AdminAuth = ({ children }: AdminAuthProps) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === 'admin123') {
      setIsAuthenticated(true);
      toast.success('Authentification réussie');
    } else {
      setError('Mot de passe incorrect');
      setPassword('');
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-gold" />
          </div>
          <CardTitle className="text-2xl font-display font-bold">
            Administration
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Entrez le mot de passe pour accéder au tableau de bord
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                required
                className={error ? 'border-destructive' : ''}
              />
              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
              Accéder
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
