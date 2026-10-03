export const BAG_STORAGE_KEY = "atelier:bag:v1";

function productMap(products) {
  return new Map(products.map((product) => [product.id, product]));
}

function normalizeQuantity(value, stock) {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return 0;
  return Math.min(parsed, stock);
}

export function sanitizeBag(value, products) {
  if (!Array.isArray(value)) return [];

  const byId = productMap(products);
  const merged = new Map();

  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;

    const productId = String(raw.productId || "");
    const product = byId.get(productId);
    if (!product) continue;

    const quantity = normalizeQuantity(raw.quantity, product.stock);
    if (!quantity) continue;

    const current = merged.get(productId) || 0;
    merged.set(
      productId,
      Math.min(current + quantity, product.stock)
    );
  }

  return [...merged.entries()].map(([productId, quantity]) => ({
    productId,
    quantity
  }));
}

export function addToBag(current, productId, products) {
  const safe = sanitizeBag(current, products);
  const product = products.find((item) => item.id === productId);
  if (!product) return safe;

  const line = safe.find((item) => item.productId === productId);

  if (!line) {
    return [...safe, { productId, quantity: 1 }];
  }

  return safe.map((item) =>
    item.productId === productId
      ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
      : item
  );
}

export function setBagQuantity(current, productId, quantity, products) {
  const safe = sanitizeBag(current, products);
  const product = products.find((item) => item.id === productId);
  if (!product) return safe;

  const nextQuantity = normalizeQuantity(quantity, product.stock);

  if (!nextQuantity) {
    return safe.filter((item) => item.productId !== productId);
  }

  const exists = safe.some((item) => item.productId === productId);

  if (!exists) {
    return [...safe, { productId, quantity: nextQuantity }];
  }

  return safe.map((item) =>
    item.productId === productId
      ? { ...item, quantity: nextQuantity }
      : item
  );
}

export function removeFromBag(current, productId, products) {
  return sanitizeBag(current, products).filter(
    (item) => item.productId !== productId
  );
}

export function bagSummary(bag, products, policy) {
  const safe = sanitizeBag(bag, products);
  const byId = productMap(products);

  const subtotalCents = safe.reduce((total, line) => {
    const product = byId.get(line.productId);
    return total + product.priceCents * line.quantity;
  }, 0);

  const itemCount = safe.reduce((total, line) => total + line.quantity, 0);
  const lineCount = safe.length;

  const shippingCents =
    subtotalCents === 0 ||
    subtotalCents >= policy.freeShippingThresholdCents
      ? 0
      : policy.standardShippingCents;

  const remainingForFreeShippingCents = Math.max(
    policy.freeShippingThresholdCents - subtotalCents,
    0
  );

  return {
    lineCount,
    itemCount,
    subtotalCents,
    shippingCents,
    totalCents: subtotalCents + shippingCents,
    remainingForFreeShippingCents
  };
}

export function formatMoney(cents) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}
