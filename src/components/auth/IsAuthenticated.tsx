import { useQuery } from 'react-query';
import { FunctionComponent } from 'preact';
import { User } from '@supabase/supabase-js';

type IsAuthenticatedProps = {
  UnauthComponent?: FunctionComponent;
};

const IsAuthenticated: FunctionComponent<IsAuthenticatedProps> = ({
  children,
  UnauthComponent,
}) => {
  const { data, isLoading, error } = useQuery<User>('authState');
  if (isLoading) return <p>loading</p>;
  if (error) {
    console.error(error);
    return <p>something went wrong!</p>;
  }
  if (data) {
    return <>{children}</>;
  } else {
    return null;
  }
};

export default IsAuthenticated;
