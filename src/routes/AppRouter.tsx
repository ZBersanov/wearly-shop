import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
//layouts
const MainLayout = lazy(() => import("@layouts/MainLayout/MainLayout"));
//pages
const Home = lazy(() => import("@pages/Home"));
const Categories = lazy(() => import("@pages/Categories"));
const Products = lazy(() => import("@pages/Products"));
const AboutUs = lazy(() => import("@pages/AboutUs"));
const Login = lazy(() => import("@pages/Login"));
const Register = lazy(() => import("@pages/Register"));
const Cart = lazy(() => import("@pages/Cart"));
const WishList = lazy(() => import("@pages/WishList"));
import Error from "@pages/Error";
import PageSuspense from "@components/feedback/PageSuspense/PageSuspense";
import { LottieHandler } from "@components/feedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense
        fallback={
          <div style={{ marginTop: "13%" }}>
            <LottieHandler type="loading" message="Идет загрузка..." />
          </div>
        }
      >
        <MainLayout />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <PageSuspense>
            <Home />
          </PageSuspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <PageSuspense>
            <Cart />
          </PageSuspense>
        ),
      },
      {
        path: "/wishlist",
        element: (
          <PageSuspense>
            <WishList />
          </PageSuspense>
        ),
      },
      {
        path: "categories",
        element: (
          <PageSuspense>
            <Categories />
          </PageSuspense>
        ),
      },
      {
        path: "categories/products/:prefix",
        element: (
          <PageSuspense>
            <Products />
          </PageSuspense>
        ),
        loader: ({ params }) => {
          if (
            typeof params.prefix !== "string" ||
            !/^[a-z]+$/i.test(params.prefix)
          ) {
            throw new Response("Bad Request", {
              statusText: "Category not found",
              status: 400,
            });
          }
          return true;
        },
      },
      {
        path: "aboutUs",
        element: (
          <PageSuspense>
            <AboutUs />
          </PageSuspense>
        ),
      },
      {
        path: "login",
        element: (
          <PageSuspense>
            <Login />
          </PageSuspense>
        ),
      },
      {
        path: "register",
        element: (
          <PageSuspense>
            <Register />
          </PageSuspense>
        ),
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
