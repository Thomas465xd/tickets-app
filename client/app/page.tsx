import Header from "@/components/home/Header";
import NavBar from "@/components/home/NavBar";
import Footer from "@/components/ui/Footer";

export default function Page() {
    return (
        <main className="flex-grow">
            <NavBar />
            <Header />
            <Footer />
        </main>
    )
}
