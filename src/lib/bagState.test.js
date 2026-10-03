import { describe, expect, it } from "vitest";
import { commercePolicy, products } from "../data/products.js";
import {
  addToBag,
  bagSummary,
  formatMoney,
  removeFromBag,
  sanitizeBag,
  setBagQuantity
} from "./bagState.js";

describe("ATELIER bag state policy", () => {
  it("recovers non-array persisted state", () => {
    expect(sanitizeBag({ productId: "studio-look-01" }, products)).toEqual([]);
  });

  it("removes unknown product ids", () => {
    expect(
      sanitizeBag([{ productId: "missing", quantity: 2 }], products)
    ).toEqual([]);
  });

  it("removes zero and negative quantities", () => {
    expect(
      sanitizeBag([
        { productId: "studio-look-01", quantity: 0 },
        { productId: "studio-look-02", quantity: -2 }
      ], products)
    ).toEqual([]);
  });

  it("caps persisted quantity at stock", () => {
    expect(
      sanitizeBag([{ productId: "studio-look-04", quantity: 99 }], products)
    ).toEqual([{ productId: "studio-look-04", quantity: 2 }]);
  });

  it("merges duplicate persisted lines", () => {
    expect(
      sanitizeBag([
        { productId: "studio-look-01", quantity: 1 },
        { productId: "studio-look-01", quantity: 2 }
      ], products)
    ).toEqual([{ productId: "studio-look-01", quantity: 3 }]);
  });

  it("caps merged duplicate lines at stock", () => {
    expect(
      sanitizeBag([
        { productId: "studio-look-03", quantity: 2 },
        { productId: "studio-look-03", quantity: 2 }
      ], products)
    ).toEqual([{ productId: "studio-look-03", quantity: 3 }]);
  });

  it("adds a new product line", () => {
    expect(addToBag([], "studio-look-02", products)).toEqual([
      { productId: "studio-look-02", quantity: 1 }
    ]);
  });

  it("increments an existing line", () => {
    expect(
      addToBag([{ productId: "studio-look-02", quantity: 1 }], "studio-look-02", products)
    ).toEqual([{ productId: "studio-look-02", quantity: 2 }]);
  });

  it("does not increment beyond stock", () => {
    expect(
      addToBag([{ productId: "studio-look-04", quantity: 2 }], "studio-look-04", products)
    ).toEqual([{ productId: "studio-look-04", quantity: 2 }]);
  });

  it("ignores add attempts for unknown products", () => {
    expect(addToBag([], "missing", products)).toEqual([]);
  });

  it("sets a quantity on an existing line", () => {
    expect(
      setBagQuantity([{ productId: "studio-look-01", quantity: 1 }], "studio-look-01", 4, products)
    ).toEqual([{ productId: "studio-look-01", quantity: 4 }]);
  });

  it("caps a set quantity at stock", () => {
    expect(
      setBagQuantity([], "studio-look-04", 9, products)
    ).toEqual([{ productId: "studio-look-04", quantity: 2 }]);
  });

  it("removes a line when quantity becomes zero", () => {
    expect(
      setBagQuantity([{ productId: "studio-look-01", quantity: 2 }], "studio-look-01", 0, products)
    ).toEqual([]);
  });

  it("removes one product without affecting another", () => {
    expect(
      removeFromBag([
        { productId: "studio-look-01", quantity: 1 },
        { productId: "studio-look-02", quantity: 2 }
      ], "studio-look-01", products)
    ).toEqual([{ productId: "studio-look-02", quantity: 2 }]);
  });

  it("calculates empty bag totals", () => {
    expect(bagSummary([], products, commercePolicy)).toEqual({
      lineCount: 0,
      itemCount: 0,
      subtotalCents: 0,
      shippingCents: 0,
      totalCents: 0,
      remainingForFreeShippingCents: 15000
    });
  });

  it("applies standard shipping below threshold", () => {
    expect(
      bagSummary([{ productId: "studio-look-02", quantity: 1 }], products, commercePolicy)
    ).toMatchObject({
      subtotalCents: 7200,
      shippingCents: 1200,
      totalCents: 8400,
      remainingForFreeShippingCents: 7800
    });
  });

  it("makes shipping free at the threshold", () => {
    expect(
      bagSummary([
        { productId: "studio-look-01", quantity: 1 },
        { productId: "studio-look-02", quantity: 1 }
      ], products, commercePolicy)
    ).toMatchObject({
      subtotalCents: 15600,
      shippingCents: 0,
      totalCents: 15600,
      remainingForFreeShippingCents: 0
    });
  });

  it("counts lines separately from total item quantity", () => {
    expect(
      bagSummary([
        { productId: "studio-look-01", quantity: 2 },
        { productId: "studio-look-02", quantity: 3 }
      ], products, commercePolicy)
    ).toMatchObject({
      lineCount: 2,
      itemCount: 5
    });
  });

  it("formats integer cents as USD", () => {
    expect(formatMoney(8400)).toBe("$84.00");
  });
});
