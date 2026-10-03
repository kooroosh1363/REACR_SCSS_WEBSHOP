import { useMemo, useState } from "react";
import { commercePolicy, products } from "./data/products.js";
import {
  BAG_STORAGE_KEY,
  addToBag,
  bagSummary,
  formatMoney,
  removeFromBag,
  sanitizeBag,
  setBagQuantity
} from "./lib/bagState.js";

function readBag() {
  try {
    return sanitizeBag(
      JSON.parse(localStorage.getItem(BAG_STORAGE_KEY) || "[]"),
      products
    );
  } catch {
    return [];
  }
}

export default function App() {
  const [bag, setBagState] = useState(readBag);

  const summary = useMemo(
    () => bagSummary(bag, products, commercePolicy),
    [bag]
  );

  function setBag(next) {
    const safe = sanitizeBag(next, products);
    setBagState(safe);
    localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify(safe));
  }

  function add(productId) {
    setBag(addToBag(bag, productId, products));
  }

  function setQuantity(productId, quantity) {
    setBag(setBagQuantity(bag, productId, quantity, products));
  }

  function remove(productId) {
    setBag(removeFromBag(bag, productId, products));
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="layout header-row">
          <a className="brand" href="#catalog">ATELIER</a>
          <div className="bag-status" aria-label="Shopping bag item count">
            {summary.itemCount} item{summary.itemCount === 1 ? "" : "s"}
          </div>
        </div>
      </header>

      <main>
        <section className="hero layout">
          <p className="eyebrow">React · SCSS · commerce state</p>
          <h1>Commerce behavior first. Checkout fiction removed.</h1>
          <p className="hero-copy">
            ATELIER turns a static webshop mockup into a focused shopping-bag state system with
            stock-bounded quantities, local persistence recovery, deterministic totals, and a real SCSS architecture.
          </p>
          <div className="scope-note">
            <strong>Scope boundary</strong>
            <p>
              This is a front-end bag simulation. It does not process payments, reserve inventory,
              authenticate users, calculate tax, or submit orders to a backend.
            </p>
          </div>
        </section>

        <section id="catalog" className="catalog layout" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Catalog</p>
              <h2 id="catalog-title">Five original visual assets, structured as testable commerce data.</h2>
            </div>
          </div>

          <div className="product-grid">
            {products.map((product) => {
              const line = bag.find((item) => item.productId === product.id);
              const atStockLimit = line?.quantity === product.stock;

              return (
                <article className="product-card" key={product.id}>
                  <div className="product-image">
                    <img src={product.image} alt={product.alt} loading="lazy" />
                    <span>{product.category}</span>
                  </div>
                  <div className="product-copy">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.stock} units in demo stock</p>
                    </div>
                    <strong>{formatMoney(product.priceCents)}</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => add(product.id)}
                    disabled={atStockLimit}
                  >
                    {atStockLimit ? "Stock limit reached" : line ? "Add one more" : "Add to bag"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bag-section layout" aria-labelledby="bag-title">
          <div className="bag-panel">
            <div className="bag-heading">
              <div>
                <p className="eyebrow">Local bag</p>
                <h2 id="bag-title">Bounded quantities. Recoverable state.</h2>
              </div>
              <p>{summary.lineCount} product line{summary.lineCount === 1 ? "" : "s"}</p>
            </div>

            {bag.length ? (
              <div className="bag-lines">
                {bag.map((line) => {
                  const product = products.find((item) => item.id === line.productId);
                  return (
                    <article className="bag-line" key={line.productId}>
                      <div>
                        <strong>{product.name}</strong>
                        <span>{formatMoney(product.priceCents)} each</span>
                      </div>
                      <label>
                        <span>Quantity</span>
                        <input
                          type="number"
                          min="0"
                          max={product.stock}
                          value={line.quantity}
                          onChange={(event) =>
                            setQuantity(product.id, event.target.value)
                          }
                        />
                      </label>
                      <strong>{formatMoney(product.priceCents * line.quantity)}</strong>
                      <button type="button" onClick={() => remove(product.id)}>
                        Remove
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="empty-state">
                <strong>Your local demo bag is empty.</strong>
                <p>Add a catalog item to exercise the state engine.</p>
              </div>
            )}

            <div className="summary-grid">
              <div><span>Items</span><strong>{summary.itemCount}</strong></div>
              <div><span>Subtotal</span><strong>{formatMoney(summary.subtotalCents)}</strong></div>
              <div><span>Shipping</span><strong>{summary.shippingCents ? formatMoney(summary.shippingCents) : "Free"}</strong></div>
              <div><span>Demo total</span><strong>{formatMoney(summary.totalCents)}</strong></div>
            </div>

            {summary.subtotalCents > 0 && summary.remainingForFreeShippingCents > 0 && (
              <p className="shipping-note">
                Add {formatMoney(summary.remainingForFreeShippingCents)} more to reach the demo free-shipping threshold.
              </p>
            )}

            <p className="persistence-note">
              Bag state is stored only in this browser under <code>{BAG_STORAGE_KEY}</code> and is sanitized on load.
            </p>
          </div>
        </section>

        <section className="engineering layout">
          <div>
            <p className="eyebrow">SCSS system</p>
            <h2>Styling has architecture too.</h2>
          </div>
          <div className="engineering-grid">
            <article><span>01</span><h3>Tokens</h3><p>Color, spacing, radius, and typography decisions live in a dedicated token layer.</p></article>
            <article><span>02</span><h3>Mixins</h3><p>Reusable focus and surface behavior are expressed once instead of copied across components.</p></article>
            <article><span>03</span><h3>State rules</h3><p>Commerce rules stay in pure JavaScript; SCSS only represents the resulting interface state.</p></article>
          </div>
        </section>
      </main>

      <footer className="site-footer layout">
        <strong>ATELIER</strong>
        <span>Commerce bag state & SCSS system</span>
      </footer>
    </div>
  );
}
