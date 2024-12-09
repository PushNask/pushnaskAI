import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import AuthScreen from '@/pages/AuthScreen';
import { supabase } from '@/integrations/supabase/client';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { toast } from 'sonner';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getSession: vi.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: vi.fn().mockImplementation((callback) => {
        return { data: { subscription: { unsubscribe: vi.fn() } } };
      })
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

// Mock toast notifications
vi.mock('sonner', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

describe('Authentication Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should handle successful login with profile', async () => {
    // Mock successful authentication
    (supabase.auth.signInWithPassword as any).mockResolvedValueOnce({
      data: { user: { id: '123', email: 'test@example.com' } },
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

    // Verify navigation and success toast
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/ai-advisor');
      expect(toast.success).toHaveBeenCalledWith('Welcome back!');
    });
  });

  test('should handle login with missing profile', async () => {
    // Mock successful authentication but no profile
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
      expect(toast.success).toHaveBeenCalledWith('Please complete your profile setup');
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
      expect(toast.error).toHaveBeenCalledWith('Invalid email or password. Please try again.');
    });
  });

  test('should handle successful sign up', async () => {
    // Mock successful sign up
    (supabase.auth.signUp as any).mockResolvedValueOnce({
      data: { user: { id: '123', email: 'test@example.com' } },
      error: null,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <AuthScreen />
        </AuthProvider>
      </BrowserRouter>
    );

    // Switch to sign up mode
    fireEvent.click(screen.getByText(/create account/i));

    // Fill in sign up form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'Password123!' },
    });

    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));

    // Verify success message
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Please check your email to confirm your account!');
    });
  });
});