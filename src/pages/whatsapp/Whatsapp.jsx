import Sidebar from "../../components/sidebar/Sidebar";
import WhatsappConect from "../../components/whatsapp/WhatsappConect";
import WhatsappHeader from "../../components/whatsapp/WhatsappHeader"


function Whatsapp() {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="min-w-0 flex-1 overflow-y-auto p-6 md:p-8">
                <div>
                    <WhatsappHeader />
                </div>
                <WhatsappConect />
            </main>

        </div>

    );
}

export default Whatsapp;

