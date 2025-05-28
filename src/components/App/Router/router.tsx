import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
} from "react-router-dom";
import paths from "./paths";
import GiveConsentPage from "pages/GiveConsentPage";
import ConsentsPage from "pages/ConsentsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Outlet />}>
      <Route path={paths.giveConsent.value} element={<GiveConsentPage />} />
      <Route path={paths.consents.value} element={<ConsentsPage />} />
      <Route path="*" element={<Navigate to={paths.giveConsent.value} />} />
    </Route>
  )
);

export default router;
