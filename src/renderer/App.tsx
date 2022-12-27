import { TweetsProvider } from './components/Tweets/TweetsContext';
import { Layout } from './components/Layout/Layout';
import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="bg-slate-900 min-h-screen">
      <div className="flex">
        <TweetsProvider>
          <Layout />
        </TweetsProvider>
      </div>
    </div>
  );
}
