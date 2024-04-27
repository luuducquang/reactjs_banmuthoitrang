import Header from "../components/Header";

function DefaultLayout({ children }: any) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}

export default DefaultLayout;
