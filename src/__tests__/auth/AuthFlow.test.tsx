import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import AuthScreen from '@/pages/AuthScreen';
import { supabase } from '@/integrations/supabase/client';
import { vi } from 'vitest';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(),
        })),
      })),
    })),
  },
}));

// Mock navigation
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Authentication Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should handle successful login with profile', async () => {
    // Mock successful authentication
    (supabase.auth.signInWithPassword as any).mockResolvedValueOnce({
      data: { user: { id: '123' } },
      error: null,
    });

    // Mock successful profile fetch
    (supabase.from as any)().select().eq().single.mockResolvedValueOnce({
      data: { id: '123', email: 'test@example.com' },
      error: null,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AuthScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    // Fill in login form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Verify navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/ai-advisor');
    });
  });

  test('should handle login with missing profile', async () => {
    // Mock successful authentication
    (supabase.auth.signInWithPassword as any).mockResolvedValueOnce({
      data: { user: { id: '123' } },
      error: null,
    });

    // Mock profile fetch with no results
    (supabase.from as any)().select().eq().single.mockResolvedValueOnce({
      data: null,
      error: null,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AuthScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    // Fill in login form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Verify navigation to profile setup
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/profile/setup');
    });
  });

  test('should handle invalid credentials', async () => {
    // Mock failed authentication
    (supabase.auth.signInWithPassword as any).mockResolvedValueOnce({
      data: { user: null },
      error: { message: 'Invalid login credentials' },
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AuthScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    // Fill in login form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpassword' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    // Verify error message
    await waitFor(() => {
      expect(screen.getByText(/Invalid email or password/i)).toBeInTheDocument();
    });
  });
});