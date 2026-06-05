"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "256771753680";

const menu = [
  {
    category: "Breakfast",
    items: [
      {
        name: "Lite Breakfast",
        description: "Toast, eggs, sausages, tea or coffee.",
        price: 25000,
      },
      {
        name: "Full English Breakfast",
        description: "Bread, bacon, eggs, sausages, fruit, tea/coffee and juice.",
        price: 30000,
      },
    ],
  },
  {
    category: "Tasty Bites",
    items: [
      {
        name: "Samosas",
        description: "Beef or vegetable.",
        price: 8000,
      },
      {
        name: "French Fries",
        description: "Crispy golden chips.",
        price: 10000,
      },
    ],
  },
  {
    category: "Drinks",
    items: [
      {
        name: "Soda 300ml",
        description: "Assorted soft drinks.",
        price: 4000,
      },
      {
        name: "Water 500ml",
        description: "Bottled water.",
        price: 3000,
      },
    ],
  },
];

export default function Zone7OrderingPage() {
  const [cart, setCart] = useState([]);
  const [table, setTable] = useState("");
  const [notes, setNotes] = useState("");
  const [search, setSearch] = useState("");

  const addItem = (item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem.name === item.name);

      if (existing) {
        return prev.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, qty: 1 }];
    });
  };

  const changeQty = (name, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.name === name ? { ...item, qty: item.qty + amount } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredMenu = menu
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        const q = search.toLowerCase();

        return (
          section.category.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
        );
      }),
    }))
    .filter(
      (section) =>
        section.category.toLowerCase().includes(search.toLowerCase()) ||
        section.items.length > 0
    );

  const sendOrder = () => {
    if (!table.trim()) {
      alert("Please enter your table number first.");
      return;
    }

    if (cart.length === 0) {
      alert("Please add at least one item.");
      return;
    }

    const orderText = cart
      .map(
        (item) =>
          `${item.qty}× ${item.name} — UGX ${(
            item.price * item.qty
          ).toLocaleString()}`
      )
      .join("%0A");

    const message =
      `🍽️ New Zone 7 Order%0A%0A` +
      `Table: ${table}%0A%0A` +
      `${orderText}%0A%0A` +
      `Total: UGX ${total.toLocaleString()}%0A%0A` +
      (notes ? `Notes: ${notes}%0A%0A` : "") +
      `Powered by Spotora`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <main className="min-h-screen bg-black text-white pb-40">
      <section className="px-5 py-8 text-center border-b border-yellow-600/30 bg-gradient-to-b from-zinc-950 to-black">
        <div className="mx-auto mb-5 h-24 w-24 rounded-full border border-yellow-500/50 bg-zinc-900 flex items-center justify-center overflow-hidden">
          <img
            src="/zone7-logo.png"
            alt="Zone 7 Logo"
            className="h-full w-full object-contain p-2"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="text-yellow-400 text-xs font-bold">
            LOGO
          </span>
        </div>

        <h1 className="text-5xl font-black tracking-widest text-yellow-400">
          ZONE 7
        </h1>

        <p className="mt-2 text-sm tracking-[0.3em] text-gray-300">
          FOOD · DRINKS · EVENTS
        </p>

        <p className="mt-5 text-yellow-300 font-semibold">
          QR Ordering by Spotora
        </p>
      </section>

      <section className="px-5 py-6 bg-zinc-950 sticky top-0 z-20 border-b border-yellow-600/30">
        <label className="block text-yellow-400 font-bold mb-2">
          Enter Table Number
        </label>

        <input
          value={table}
          onChange={(e) => setTable(e.target.value)}
          placeholder="Example: Table 12"
          className="w-full rounded-xl px-4 py-4 bg-black border border-yellow-500 text-white outline-none"
        />

        <div className="mt-4">
          <label className="block text-yellow-400 font-bold mb-2">
            Search Menu
          </label>

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food, drinks, category, ingredients..."
            className="w-full rounded-xl px-4 py-4 bg-black border border-zinc-700 text-white outline-none"
          />
        </div>
      </section>

      <section className="px-5 py-6">
        {filteredMenu.map((section) => (
          <div key={section.category} className="mb-8">
            <h2 className="text-2xl font-black text-yellow-400 mb-4">
              {section.category}
            </h2>

            <div className="space-y-3">
              {section.items.map((item) => (
                <div
                  key={`${section.category}-${item.name}-${item.price}`}
                  className="flex items-center justify-between gap-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-4 shadow-lg"
                >
                  <div className="pr-2">
                    <h3 className="font-bold">{item.name}</h3>

                    {item.description && (
                      <p className="text-gray-400 text-sm mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    <p className="text-yellow-300 text-sm mt-2">
                      UGX {item.price.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => addItem(item)}
                    className="bg-yellow-500 text-black font-black px-4 py-2 rounded-xl shrink-0"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="fixed bottom-0 left-0 right-0 bg-zinc-950 border-t border-yellow-600/40 p-4">
        <div className="max-h-44 overflow-y-auto mb-3">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-sm">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center mb-2"
              >
                <span className="text-sm">
                  {item.qty}× {item.name}
                </span>

                <div className="flex gap-2 items-center">
                  <button
                    onClick={() => changeQty(item.name, -1)}
                    className="px-2 bg-zinc-800 rounded"
                  >
                    −
                  </button>

                  <button
                    onClick={() => changeQty(item.name, 1)}
                    className="px-2 bg-zinc-800 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Optional notes e.g. no onions, takeaway..."
          className="w-full mb-3 rounded-xl px-3 py-2 bg-black border border-zinc-700 text-white text-sm"
        />

        <button
          onClick={sendOrder}
          className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl"
        >
          Send Order · UGX {total.toLocaleString()}
        </button>
      </section>
    </main>
  );
}
