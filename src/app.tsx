import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AuthWrapper from './components/auth/AuthWrapper';
import UserPanel from './components/sidebar/user/UserPanel';
import SupabaseProvider from './components/supabase/Supabase';
import HomePage from './pages/Home';
import UserPage from './pages/User';
const queryClient = new QueryClient();

export function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SupabaseProvider>
          <AuthWrapper>
            <Router>
              <div className="appLayout">
                <UserPanel />
                <Switch>
                  <Route path="/users/:userId">
                    <UserPage />
                  </Route>
                  <Route path="/">
                    <HomePage />
                  </Route>
                </Switch>
              </div>
            </Router>
          </AuthWrapper>
        </SupabaseProvider>
      </QueryClientProvider>
    </>
  );
}
