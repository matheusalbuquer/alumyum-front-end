
import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [itens, setItens] = useState([]);
    const [lojaSlug, setLojaSlug] = useState(null);

    const adicionarAoCarrinho = (produto, slug) => {
        if (lojaSlug && lojaSlug !== slug) {
            alert("Seu carrinho possui produtos de outra loja.");
            return;
        }

        setLojaSlug(slug);

        setItens((atuais) => {
            const existente = atuais.find(
                (item) => item.id === produto.id
            );

            if (existente) {
                if (existente.quantidade >= Number(produto.estoque)) {
                    alert("Estoque máximo atingido.");
                    return atuais;
                }

                return atuais.map((item) =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                );
            }

            if (Number(produto.estoque) <= 0) return atuais;

            return [...atuais, { ...produto, quantidade: 1 }];
        });
    };

    const removerDoCarrinho = (produtoId) => {
        setItens((atuais) =>
            atuais.filter((item) => item.id !== produtoId)
        );
    };

    const alterarQuantidade = (produtoId, quantidade) => {
        setItens((atuais) =>
            atuais.map((item) => {
                if (item.id !== produtoId) return item;

                const novaQuantidade = Math.max(
                    1,
                    Math.min(Number(quantidade), Number(item.estoque))
                );

                return { ...item, quantidade: novaQuantidade };
            })
        );
    };

    const limparCarrinho = () => {
        setItens([]);
        setLojaSlug(null);
    };

    const total = itens.reduce(
        (soma, item) => soma + Number(item.preco) * item.quantidade,
        0
    );

    return (
        <CartContext.Provider
            value={{
                itens,
                lojaSlug,
                total,
                adicionarAoCarrinho,
                removerDoCarrinho,
                alterarQuantidade,
                limparCarrinho,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCarrinho() {
    const contexto = useContext(CartContext);

    if (!contexto) {
        throw new Error("useCarrinho deve ser usado dentro de CartProvider");
    }

    return contexto;
}
