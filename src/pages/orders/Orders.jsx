import Sidebar from '../../components/sidebar/Sidebar'
import OrdersHeader from '../../components/orders/OrdersHeader'
import OrdersCards from '../../components/orders/OrdersCards'
import OrdersList from '../../components/orders/OrdersList'
function Orders() {
    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="min-w-0 flex-1 overflow-y-auto p-6 md:p-8">
                <div className=' mx-auto max-w-7xl space-y-8'>
                    <OrdersHeader />
                    <OrdersCards />
                    <OrdersList />
                </div>
            </main>
        </div>
    )
}

export default Orders
