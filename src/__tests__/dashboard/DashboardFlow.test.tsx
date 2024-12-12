import { render, screen, waitFor, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/auth/AuthContext';
import Dashboard from '@/pages/Dashboard';
import { supabase } from '@/integrations/supabase/client';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import { toast } from 'sonner';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
      signOut: vi.fn()
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn()
    }))
  }
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
  }
}));

describe('Dashboard Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Mock successful session
    (supabase.auth.getSession as any).mockResolvedValue({
      data: {
        session: {
          user: { id: 'test-user-id', email: 'test@example.com' },
          access_token: 'test-token',
          refresh_token: 'test-refresh-token'
        }
      },
      error: null
    });
  });

  test('renders dashboard with valid session', async () => {
    // Mock profile data
    (supabase.from as any)().single.mockResolvedValue({
      data: { id: 'test-user-id', email: 'test@example.com' },
      error: null
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Credits & Services/i)).toBeInTheDocument();
    });
  });

  test('redirects to auth page on session expiry', async () => {
    // Mock session expiry
    let authChangeCallback: Function;
    (supabase.auth.onAuthStateChange as any).mockImplementation((callback) => {
      authChangeCallback = callback;
      return { data: { subscription: { unsubscribe: vi.fn() } } };
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    // Simulate session expiry
    await act(async () => {
      authChangeCallback('SIGNED_OUT');
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/auth');
      expect(toast.error).toHaveBeenCalledWith('Session expired. Please sign in again.');
    });
  });

  test('maintains session with valid refresh token', async () => {
    // Mock successful token refresh
    (supabase.auth.getSession as any).mockResolvedValue({
      data: {
        session: {
          user: { id: 'test-user-id', email: 'test@example.com' },
          access_token: 'new-test-token',
          refresh_token: 'new-test-refresh-token'
        }
      },
      error: null
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Credits & Services/i)).toBeInTheDocument();
    });

    // Verify session persistence
    expect(mockNavigate).not.toHaveBeenCalledWith('/auth');
  });

  test('handles network errors gracefully', async () => {
    // Mock network error
    (supabase.from as any)().single.mockRejectedValue(new Error('Network error'));

    render(
      <BrowserRouter>
        <AuthProvider>
          <Dashboard />
        </AuthProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error loading dashboard. Please try again.');
    });
  });
});