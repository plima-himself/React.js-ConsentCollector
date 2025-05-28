import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from "react-router-dom";
import paths from "./paths";
import GiveConsentPage from "pages/GiveConsentPage";
import ConsentsPage from "pages/ConsentsPage";
import AppLayout from "./AppLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />}>
      <Route path={paths.giveConsent.value} element={<GiveConsentPage />} />
      <Route path={paths.consents.value} element={<ConsentsPage />} />
      <Route path="*" element={<Navigate to={paths.giveConsent.value} />} />
    </Route>
  )
);

export default router;
