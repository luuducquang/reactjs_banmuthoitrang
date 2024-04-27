import React from "react";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";

import { publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout";


function App() {
    return (
        <div className="App">
            {publicRoutes.map((route, index) => {
                const Page = route.component;

                let Layout: any = DefaultLayout;
                if (route.layout) {
                    Layout = route.layout;
                } else if (route.layout === null) {
                    Layout = Fragment;
                }

                return (
                    <Routes key={index}>
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    </Routes>
                );
            })}
        </div>
    );
}

export default App;