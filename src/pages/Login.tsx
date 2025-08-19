import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '@/components/AdminLogin';
import { supabase } from '@/lib/supabase';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in and redirect to admin
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/admin', { replace: true });
      }
    };

    checkUser();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate('/admin', { replace: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogin = (user: any) => {
    if (user) {
      navigate('/admin', { replace: true });
    }
  };

  return <AdminLogin onLogin={handleLogin} />;
};

export default Login;