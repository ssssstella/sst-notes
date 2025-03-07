import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuthContext } from '@/lib/authContext';
import { onError } from '@/lib/errorHandle';
import {
  confirmSignUp,
  resendSignUpCode,
  signIn,
  signUp
} from 'aws-amplify/auth';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

interface SignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ConfirmationForm {
  email: string;
  password: string;
  confirmationCode: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useAuthContext();
  const [newUser, setNewUser] = useState<null | string>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
    },
  });

  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    setIsLoading(true);
    try {
      await signUp({
        username: data.email,
        password: data.password,
      });
      setNewUser(data.email);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'User already exists') {
          await resendSignUpCode({ username: data.email });
          setNewUser(data.email);
        }
      } else {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onConfirmationSubmit: SubmitHandler<ConfirmationForm> = async (
    data
  ) => {
    setIsLoading(true);
    try {
      await confirmSignUp({
        username: data.email,
        confirmationCode: data.confirmationCode,
      });
      await signIn({ username: data.email, password: data.password });
      setIsAuthenticated(true);
      navigate('/');
      reset();
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  function ConfirmationForm() {
    return (
      <form
        onSubmit={handleSubmit(onConfirmationSubmit)}
        className="w-xs mx-auto py-12 space-y-6"
      >
        <div className="flex flex-col space-y-2">
          <Label htmlFor="confirmationCode">Confirmation Code</Label>
          <Input
            id="confirmationCode"
            type="text"
            placeholder="your confirmation code"
            {...register('confirmationCode', {
              required: 'This is required',
              minLength: { value: 6, message: 'Min length is 6' },
            })}
          />
          <p className="text-sm text-foreground">
            Please check your email for the code.
          </p>
          <p className="text-sm text-destructive">
            {errors.confirmationCode?.message}
          </p>
        </div>
        <Loader
          isLoading={isLoading}
          disabled={!isValid}
          size="lg"
          type="submit"
          className="w-full cursor-pointer"
        >
          Verify
        </Loader>
      </form>
    );
  }

  function SignupForm() {
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
        <div className="flex flex-col space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="confirm your password"
            {...register('confirmPassword', {
              required: 'This is required',
              validate: (confirmPassword: string) => {
                if (watch('password') !== confirmPassword) {
                  return 'Your passwords do not match';
                }
              },
            })}
          />
          <p className="text-sm text-destructive">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <Loader
          isLoading={isLoading}
          disabled={!isValid}
          size="lg"
          type="submit"
          className="w-full cursor-pointer"
        >
          Signup
        </Loader>
      </form>
    );
  }

  return <>{newUser === null ? <SignupForm /> : <ConfirmationForm />}</>;
}
