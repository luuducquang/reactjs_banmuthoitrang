import Footer from "../components/Footer";
import Header from "../components/Header";

function DefaultLayout({ children }: any) {
    return (
        <>
            <Header />
            {children}
            <Footer/>
        </>
    );
}

export default DefaultLayout;
