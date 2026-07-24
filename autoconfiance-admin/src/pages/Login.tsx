import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            toast.success('Connexion réussie');
            navigate('/admin');
        } else {
            toast.error('Mot de passe incorrect');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-center mb-6 font-display">Administration</h1>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <Input
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full"
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Se connecter
                    </Button>
                </form>
            </div>
        </div>
    );
}
