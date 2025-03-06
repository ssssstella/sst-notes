import { Button } from '@/components/ui/button';
import {LoaderCircle} from 'lucide-react';

export default function Loader({
  disabled = false,
  isLoading = false,
  className = '',
  ...props
}) {
  return (
    <Button disabled={disabled || isLoading} className={className} {...props}>
      {isLoading && <LoaderCircle />}
      {props.children}
    </Button>
  );
}
