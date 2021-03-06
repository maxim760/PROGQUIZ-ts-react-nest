import { ProfilePage } from "../pages/Profile/ProfilePage";
import { TestPage } from "../pages/Test/TestPage";
import { TestListPage } from "../pages/TestList/TestListPage";

export const routes = [
  {path: "/", component: TestListPage},
  { path: "/test/:id", component: TestPage },
  { path: "/profile", component: ProfilePage}
]