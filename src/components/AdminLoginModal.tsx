import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle, Lock, User, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'kapandulaadmin';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }: AdminLoginModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const usernameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      setUsername('');
      setPassword('');
      window.setTimeout(() => usernameRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim().toLowerCase() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      onLoginSuccess();
      return;
    }
    setError('Credenciais inválidas. Utilize admin / kapandulaadmin.');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[20000] bg-black-deep/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-xl rounded-3xl border border-gold/30 bg-black-card/95 shadow-2xl p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white-warm"
          aria-label="Fechar"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-gold text-xs uppercase tracking-[0.3em] font-bold">
              <Lock className="w-4 h-4" /> Painel Administrativo
            </div>
            <h2 className="text-2xl font-bold text-white-warm">Acesso Seguro da Equipa</h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Introduza as credenciais para aceder ao portal administrativo. Se estiver a testar, utilize a dica abaixo.
            </p>
            <p className="text-xs text-neutral-500 italic">Dica de teste: admin / kapandulaadmin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-white-warm text-sm font-semibold">
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] mb-2">Utilizador</span>
              <div className="relative rounded-2xl border border-neutral-800 bg-black-deep/80 px-4 py-3 focus-within:border-gold transition-all">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  ref={usernameRef}
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full bg-transparent pl-10 text-white-warm outline-none placeholder:text-neutral-500"
                  placeholder="admin"
                  autoComplete="username"
                />
              </div>
            </label>

            <label className="block text-white-warm text-sm font-semibold">
              <span className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] mb-2">Palavra-passe</span>
              <div className="relative rounded-2xl border border-neutral-800 bg-black-deep/80 px-4 py-3 focus-within:border-gold transition-all">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-transparent pl-10 text-white-warm outline-none placeholder:text-neutral-500"
                  placeholder="Kapandula Password"
                  autoComplete="current-password"
                />
              </div>
            </label>

            {error && (
              <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 items-stretch">
              <button
                type="submit"
                className="flex-1 bg-gold text-black-deep font-bold uppercase tracking-[0.2em] rounded-2xl px-5 py-3 transition-all hover:bg-[#ffdf7f]"
              >
                Entrar no Painel
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-neutral-800 text-neutral-300 rounded-2xl px-5 py-3 hover:border-gold hover:text-white-warm transition-all"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
