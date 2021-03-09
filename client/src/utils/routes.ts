import { LoginPage } from "../pages/Login/LoginPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";
import { RegistrationPage } from "../pages/Registration.tsx/RegistrationPage";
import { TestPage } from "../pages/Test/TestPage";
import { TestListPage } from "../pages/TestList/TestListPage";
import { VerifyPage } from "../pages/Verify/VerifyPage";

export enum ROUTE_NAMES {
  MAIN= "/",
  TEST= "/test/",
  PROFILE= "/profile",
  REGISTRATION= "/registration",
  LOGIN="/login",
  VERIFY="/verify/",

}

export const authRoutes = [
  { path: ROUTE_NAMES.MAIN, component: TestListPage },
  { path: `${ROUTE_NAMES.TEST}:id`, component: TestPage },
  { path: ROUTE_NAMES.PROFILE, component: ProfilePage },
];

export const routes = [
  { path: ROUTE_NAMES.MAIN, component: TestListPage },
  { path: `${ROUTE_NAMES.TEST}:id`, component: TestPage },
  { path: ROUTE_NAMES.REGISTRATION, component: RegistrationPage },
  { path: ROUTE_NAMES.LOGIN, component: LoginPage },
  { path: `${ROUTE_NAMES.VERIFY}:hash`, component: VerifyPage },
];
