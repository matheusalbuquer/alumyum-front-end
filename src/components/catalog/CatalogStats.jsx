
export const stats = [
    {
        label: "Total",
        value: "24",
        description: "Produtos cadastrados",
        icone: "product",
        crescimento: "10%",
        //colors
        corHover: "hover:bg-[#6B21A8]",
        borda: "border-[#F3E8FF]",
        iconeFundo: "text-[#6B21A8]",
        iconeTexto: "bg-[#F3E8FF]",
        textoHover: "group-hover:text-white",

    },
    {
        label: "Produtos Ativos",
        value: "20",
        description: "Disponíveis no catálogo",
        icone: "check",
        crescimento: "10%",
        //colors
        corHover: "hover:bg-[#047857]",
        borda: "border-[#D1FAE5]",
        iconeFundo: "text-[#047857]",
        iconeTexto: "bg-[#D1FAE5]",
        textoHover: "group-hover:text-white",

    },
    {
        label: "Categorias",
        value: "5",
        description: "Categorias cadastradas",
        icone: "category",
        crescimento: "10%",
        //colors
        corHover: "hover:bg-[#2563EB]",
        borda: "border-[#DBEAFE]",
        iconeFundo: "text-[#2563EB]",
        iconeTexto: "bg-[#DBEAFE]",
        textoHover: "group-hover:text-white",


    },
];

import {
  FileText,
  DollarSign,
  ShoppingBag,
  Shirt,
  CircleCheck,
  Package,
  Funnel,
  TrendingUp,
  TrendingUp as ArrowUp,
} from "lucide-react";



const icones = {
  file: FileText,
  dollar: DollarSign,
  bag: ShoppingBag,
  shirt: Shirt,
  check: CircleCheck,
  trend: TrendingUp,
  product: Package,
  category: Funnel
}

export default function CatalogStats() {
  return (
    <section className="font-['Poppins']  grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

      {stats.map((stat) => {
        const Icon = icones[stat.icone];

        return (
          <article
            key={stat.label}
            className={`group  min-w-0 cursor-pointer rounded-xl border  bg-white p-4 sm:p-5  transition duration-300 hover:-translate-y-1 hover:border-[#EBC4B8] hover:shadow-md
            ${stat.corHover || ""}
            ${stat.borda || ""}
            `}
          >

            <div className=' flex items-center gap-4'>
              <div className={`
              flex h-12 w-12 shrink-0 items-center justify-center rounded-full  transition-colors duration-300
               ${stat.iconeFundo || ""}
                  ${stat.iconeTexto || ""}
                `}

              >
                <Icon size={25} />
              </div >
              <div>
                <h2 className={`
                mt-3 md:text-xl sm:text-xs  font-bold group  transition-colors duration-300
                ${stat.textoHover || ""}
                  ${stat.iconeFundo || ""}
                // `} >
                  {stat.value}
                </h2>
                <p className={`flex align-center justify-start text-sm font-semibold text-marrom-1  transition-colors duration-300
                   ${stat.textoHover || ""}`}>
                  {stat.label}
                </p>
              </div>
            </div>



            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className={`flex items-center gap-1 font-bold text-[#218653] transition-colors duration-300
                ${stat.textoHover || ""}`}>
                <ArrowUp size={15} />
                {stat.crescimento}

              </span>
              <span className={`text-bege-2 font-semibold transition-colors duration-300
                ${stat.textoHover || ""}`}>
                {stat.description}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
}