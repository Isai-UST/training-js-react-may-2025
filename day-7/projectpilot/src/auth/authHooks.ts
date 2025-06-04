import {
  useMutation
} from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { authService } from './services/auth.service';
import type { User } from './User';

export function useLogin() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (user: User) => authService.login(user),
    onSuccess: () => {
        navigate('/projects');
        window.location.reload();
    }
  });
}

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (user: User) => authService.register(user),
    onSuccess: () => {
        navigate('/projects');
        window.location.reload();
    }
  });
}