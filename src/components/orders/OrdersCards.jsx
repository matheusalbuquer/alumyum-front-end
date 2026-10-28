import {
    ClipboardList,
    Clock3,
    Truck,
    CircleCheck,
    TrendingUp,
} from "lucide-react";

function StatCard({
    title,
    value,
    icon: Icon,
    change,
    cardBg,
    cardHoverBg,
    iconColor,
    iconBg,
    titleColor,
    valueColor,
    changeColor,
    descriptionColor,


}) {
    return (
        <div
            className="font-['Poppins'] group border border-bege  min-w-0 rounded-xl p-4 sm:p-5 cursor-pointer transition duration-300  hover:-translate-y-1 hover:border-[#EBC4B8] hover:shadow-md"
            style={{
                backgroundColor: cardBg,
                borderColor: iconBg,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = cardHoverBg;
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = cardBg;
            }}
        >
            <div className="flex items-start gap-3 sm:gap-5">
                {/* Ícone */}
                <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FCEAE7] text-[#B51B00]"

                    style={{ backgroundColor: iconBg }}
                >
                    <Icon
                        size={25}
                        style={{ color: iconColor }}
                        className="shrink-0 transition-colors duration-300 "
                    />
                </div>

                {/* Título e valor */}
                <div className="min-w-0 flex  flex-col ">
                    <h2
                        className="mt-2 md:text-xl sm:ext-xs font-bold transition-colors duration-300 group-hover:!text-white"
                        style={{ color: valueColor }}
                    >
                        {value}
                    </h2>
                    <p
                        className="text-sm font-semibold transition-colors duration-300 group-hover:!text-white"
                        style={{ color: titleColor }}
                    >
                        {title}
                    </p>


                </div>
            </div>

            {/* Porcentagem e descrição */}
            <div className="mt-3 flex flex-wrap  items-center gap-2 text-xs">
                <span
                    className="font-semibold transition-colors duration-300 group-hover:!text-white"
                    style={{ color: changeColor }}
                >
                    <TrendingUp size={15} />
                </span>

                <span
                    className="transition-colors font-semibold duration-300 group-hover:!text-white"
                    style={{ color: descriptionColor }}
                >
                    {change}  Em relação ao mês anterior
                </span>
            </div>
        </div>
    );
}

export default function OrderCards() {
    const cards = [
        {
            title: "Total",
            value: "128",
            icon: ClipboardList,
            change: "+12%",
            //colors
            cardBg: "#fff",
            cardHoverBg: "#6B21A8",
            iconColor: "#6B21A8",
            iconBg: "#F3E8FF",

            titleColor: "#5a463b",
            valueColor: "#6B21A8",
            changeColor: "#047857",
            descriptionColor: "#a99c8e",
            hoverTextColor: "#FFFFFF",

        },
        {
            title: "Em preparação",
            value: "12",
            icon: Clock3,
            change: "+3%",
            //colors
            cardBg: "white",
            cardHoverBg: "#FE9A00",
            iconColor: "#FE9A00",
            iconBg: "#FEF3C6",

            titleColor: "#5a463b",
            valueColor: "#FE9A00",
            changeColor: "#047857",
            descriptionColor: "#a99c8e",
            hoverTextColor: "#FFFFFF",


        },
        {
            title: "Enviados",
            value: "24",
            icon: Truck,
            change: "+8%",
            //colors
            cardBg: "white",
            cardHoverBg: "#2563EB ",
            iconColor: "#2563EB ",
            iconBg: "#DBEAFE",

            titleColor: "#5a463b",
            valueColor: "#2563EB ",
            changeColor: "#047857",
            descriptionColor: "#a99c8e",
            hoverTextColor: "#FFFFFF",

        },
        {
            title: "Concluídos",
            value: "92",
            icon: CircleCheck,
            change: "+15%",
            //colors
            cardBg: "white",
            cardHoverBg: "#047857",
            iconColor: "#047857",
            iconBg: "#D1FAE5",

            titleColor: "#5a463b",
            valueColor: "#047857",
            changeColor: "#047857",
            descriptionColor: "#a99c8e",
            hoverTextColor: "#FFFFFF",

        },
    ];

    return (
        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
            {cards.map((card) => (
                <StatCard key={card.title} {...card} />
            ))}
        </section>
    );
}