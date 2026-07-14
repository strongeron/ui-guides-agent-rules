import { useState, useRef } from 'react';

export function ErrorPlacementGood() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!email.includes('@')) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) {
        nameRef.current?.focus();
      } else if (newErrors.email) {
        emailRef.current?.focus();
      }
    } else {
      alert('Submitted!');
    }
  };

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="good-error-name" className="block text-sm font-medium text-foreground mb-1">
            Name
          </label>
          <input
            ref={nameRef}
            id="good-error-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
              errors.name ? 'border-error/50' : 'border-border'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-error mt-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="good-error-email" className="block text-sm font-medium text-foreground mb-1">
            Email
          </label>
          <input
            ref={emailRef}
            id="good-error-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring ${
              errors.email ? 'border-error/50' : 'border-border'
            }`}
          />
          {errors.email && (
            <p className="text-xs text-error mt-1">{errors.email}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Submit
        </button>
      </form>
      <p className="text-xs text-success mt-4">
        Errors appear inline. First error gets focus.
      </p>
    </div>
  );
}
