import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/lib/authContext';
import { onError } from '@/lib/errorHandle';
import { signIn, signOut } from 'aws-amplify/auth';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuthContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setIsLoading(true);
    try {
      await signIn({ username: data.email, password: data.password });
      setIsAuthenticated(true);
      reset();
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'There is already a signed in user.') {
          await signOut();
        }
      } else {
        onError(error);
      }

      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-xs mx-auto py-12 space-y-6"
    >
      <div className="flex flex-col space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your email"
          {...register('email', { required: 'This is required' })}
        />
        <p className="text-sm text-destructive">{errors.email?.message}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="your password"
          {...register('password', {
            required: 'This is required',
            minLength: { value: 6, message: 'Min length is 6' },
          })}
        />
        <p className="text-sm text-destructive">{errors.password?.message}</p>
      </div>

      <Loader
        isLoading={isLoading}
        disabled={!isValid}
        size="lg"
        type="submit"
        className="w-full cursor-pointer"
      >
        Login
      </Loader>
    </form>
  );
}
