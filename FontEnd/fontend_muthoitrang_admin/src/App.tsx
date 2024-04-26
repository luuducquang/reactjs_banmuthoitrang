import React, { Fragment, useEffect, useState } from "react";
import DefaultLayout from "./layouts/DefaultLayout";
import { Route, Routes, useNavigate } from "react-router-dom";
import { privateRoutes, publicRoutes } from "./routes";
import "bootstrap/dist/css/bootstrap.css";

function App() {
    const navigate = useNavigate();
    const [userChecked, setUserChecked] = useState(false);

    useEffect(() => {
        const stringUser = localStorage.getItem("user");
        if (stringUser === null) {
            setUserChecked(false);
            navigate("/login");
        } else {
            setUserChecked(true);
        }
    }, [navigate]);
    return (
        <>
            {userChecked ? (
                <Routes>
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout: any = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            ) : (
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout: any = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            )}
        </>
    );
}

export default App;
