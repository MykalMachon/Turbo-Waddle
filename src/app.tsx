import 'preact/debug';
import UserCard from './components/sidebar/UserCard';
import Feed from './components/Feed';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
export function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="appLayout">
          <UserCard />
          <Feed />
        </div>
      </QueryClientProvider>
    </>
  );
}
