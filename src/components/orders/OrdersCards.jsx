import {
    ClipboardList,
    Clock3,
    Truck,
    CircleCheck,
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
            className="font-['Poppins'] group border border-bege hover:border-white  min-w-0 rounded-lg p-4 sm:p-5 cursor-pointer transition-colors duration-300"
            style={{
                backgroundColor: cardBg,
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
                    className=" flex h-11 w-11 shrink-0 items-center  justify-center rounded-lg transition-colors duration-300"
                    style={{ backgroundColor: iconBg }}
                >
                    <Icon
                        size={30}
                        style={{ color: iconColor }}
                        className="shrink-0 transition-colors duration-300 "
                    />
                </div>

                {/* Título e valor */}
                <div className="min-w-0 flex  flex-col ">
                    <p
                        className="mt-2 text-2xl font-semibold transition-colors duration-300 group-hover:!text-white"
                        style={{ color: valueColor }}
                    >
                        {value}
                    </p>
                    <p
                        className="text-sm font-semibold transition-colors duration-300 group-hover:!text-white"
                        style={{ color: titleColor }}
                    >
                        {title}
                    </p>


                </div>
            </div>

            {/* Porcentagem e descrição */}
            <div className="mt-4 flex flex-wrap  items-center gap-2 text-xs">
                <span
                    className="font-semibold transition-colors duration-300 group-hover:!text-white"
                    style={{ color: changeColor }}
                >
                    ↗ {change}
                </span>

                <span
                    className="transition-colors font-semibold duration-300 group-hover:!text-white"
                    style={{ color: descriptionColor }}
                >
                    Em relação ao mês anterior
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
            cardHoverBg: "#2563EB",
            iconColor: "#2563EB",
            iconBg: "#DBEAFE",

            titleColor: "#5a463b",
            valueColor: "#2563EB",
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
            cardHoverBg: "#B51B00",
            iconColor: "#B51B00",
            iconBg: "#FBE5DF",

            titleColor: "#5a463b",
            valueColor: "#B51B00",
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
            cardHoverBg: "oklch(76.9% 0.188 70.08)",
            iconColor: "oklch(76.9% 0.188 70.08)",
            iconBg: "oklch(96.2% 0.059 95.617)",

            titleColor: "#5a463b",
            valueColor: "oklch(76.9% 0.188 70.08)",
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
