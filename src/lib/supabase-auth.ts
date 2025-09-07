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

  // Get current session
  async getCurrentSession(): Promise<Session | null> {
    try {
      const { data } = await supabase.auth.getSession();
      return data.session;
    } catch (error) {
      console.error('Get session error:', error);
      return null;
    }
  }

  // Get current user
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