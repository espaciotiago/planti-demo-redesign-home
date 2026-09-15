import { PresentationProviders } from './src/presentation/app/PresentationProviders';
import { HomeDemoScreen } from './src/presentation/features/home/screens/HomeDemoScreen';

export default function App() {
  return (
    <PresentationProviders>
      <HomeDemoScreen />
    </PresentationProviders>
  );
}
