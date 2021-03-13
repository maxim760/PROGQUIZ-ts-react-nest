import { LoginPage } from "../pages/Auth/Login/LoginPage";
import { ProfilePage } from "../pages/Profile/ProfilePage";
import { RegistrationPage } from "../pages/Auth/Registration/RegistrationPage";
import { TestPage } from "../pages/Test/TestPage";
import { TestListPage } from "../pages/TestList/TestListPage";
import { VerifyPage } from "../pages/Verify/VerifyPage";
import { ResultPage } from "../pages/Result/ResultPage";
import { CreatePage } from "../pages/Create/CreatePage";

export enum ROUTE_NAMES {
  MAIN= "/",
  TEST= "/test/",
  PROFILE= "/profile",
  REGISTRATION= "/registration",
  LOGIN="/login",
  VERIFY = "/verify/",
  RESULT = "/result/",
  CREATE = "/create/"

}

export const authRoutes = [
  { path: ROUTE_NAMES.MAIN, component: TestListPage },
  { path: `${ROUTE_NAMES.TEST}:id`, component: TestPage },
  { path: ROUTE_NAMES.PROFILE, component: ProfilePage },
  { path: ROUTE_NAMES.CREATE, component: CreatePage },
  { path: `${ROUTE_NAMES.RESULT}:user/:id`, component: ResultPage },
];

export const routes = [
  { path: ROUTE_NAMES.MAIN, component: TestListPage },
  { path: `${ROUTE_NAMES.TEST}:id`, component: TestPage },
  { path: ROUTE_NAMES.REGISTRATION, component: RegistrationPage },
  { path: ROUTE_NAMES.LOGIN, component: LoginPage },
  { path: `${ROUTE_NAMES.VERIFY}:hash`, component: VerifyPage },
  { path: `${ROUTE_NAMES.RESULT}:user/:id`, component: ResultPage },
];
