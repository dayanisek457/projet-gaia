import { supabase } from './s3-direct';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';

export interface AuthUser {
  email: string;
  id: string;
  role?: string;
}

class SupabaseAuthService {
  // Sign in with email and password
  async signIn(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { user: null, error: error.message };
      }

      if (data.user) {
        const authUser: AuthUser = {
          email: data.user.email || '',
          id: data.user.id,
          role: data.user.user_metadata?.role || 'user'
        };
        return { user: authUser, error: null };
      }

      return { user: null, error: 'Connexion échouée' };
    } catch (error) {
      console.error('Sign in error:', error);
      return { user: null, error: 'Erreur de connexion' };
    }
  }

  // Sign up with email and password
  async signUp(email: string, password: string): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign up error:', error);
        return { user: null, error: error.message };
      }

      if (data.user) {
        const authUser: AuthUser = {
          email: data.user.email || '',
          id: data.user.id,
          role: 'user'
        };
        return { user: authUser, error: null };
      }

      return { user: null, error: 'Inscription échouée' };
    } catch (error) {
      console.error('Sign up error:', error);
      return { user: null, error: 'Erreur d\'inscription' };
    }
  }

  // Sign out
  async signOut(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('Sign out error:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: 'Erreur de déconnexion' };
    }
  }

  // Get current session (uses cached data, fast and reliable)
  async getCurrentSession(): Promise<Session | null> {
    try {
      const { data } = await supabase.auth.getSession();
      return data.session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  // Get current user (makes network request, can be slow or hang)
  // Use getCurrentUserFromSession for fast access without network validation
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data } = await supabase.auth.getUser();
      
      if (data.user) {
        return {
          email: data.user.email || '',
          id: data.user.id,
          role: data.user.user_metadata?.role || 'user'
        };
      }
      
      return null;
    } catch (error) {
      console.error('Get user error:', error);
      return null;
    }
  }

  // Get user from session without network validation (fast, for tab visibility changes)
  // This uses cached session data and doesn't make network requests
  getUserFromSession(session: Session | null): AuthUser | null {
    if (!session?.user) {
      return null;
    }
    
    // Validate that we have at least an email or ID - an empty email could indicate invalid session
    if (!session.user.email && !session.user.id) {
      console.warn('Session user has no email or ID, treating as invalid');
      return null;
    }
    
    return {
      email: session.user.email || '',
      id: session.user.id,
      role: session.user.user_metadata?.role || 'user'
    };
  }

  // Get current user with timeout to prevent infinite loading
  async getCurrentUserWithTimeout(timeoutMs: number = 5000): Promise<AuthUser | null> {
    try {
      const timeoutPromise = new Promise<null>((resolve) => {
        setTimeout(() => resolve(null), timeoutMs);
      });
      
      const userPromise = this.getCurrentUser();
      
      const result = await Promise.race([userPromise, timeoutPromise]);
      return result;
    } catch (error) {
      console.error('Get user with timeout error:', error);
      return null;
    }
  }

  // Subscribe to auth state changes
  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }

  // Check if user is authenticated
  async isAuthenticated(): Promise<boolean> {
    const session = await this.getCurrentSession();
    return !!session;
  }

  // Reset password
  async resetPassword(email: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        console.error('Reset password error:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Reset password error:', error);
      return { error: 'Erreur lors de la réinitialisation' };
    }
  }

  // Update password
  async updatePassword(newPassword: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Update password error:', error);
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Update password error:', error);
      return { error: 'Erreur lors de la mise à jour du mot de passe' };
    }
  }
}

// Export singleton instance
export const authService = new SupabaseAuthService();