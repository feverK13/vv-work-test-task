import { BrowserRouter, Route, Routes } from 'react-router';
import { Layout } from '@/components/layout/layout';
import { HomePage } from '@/pages/home';
import { PartnerPage } from '@/pages/partner';
import { ContactsPage } from '@/pages/contacts';
import { NotFoundPage } from '@/pages/not-found';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="partners/:slug" element={<PartnerPage />} />
          <Route path="контакти" element={<ContactsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
