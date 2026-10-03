import look01 from "../assets/products/look-01.png";
import look02 from "../assets/products/look-02.png";
import look03 from "../assets/products/look-03.png";
import look04 from "../assets/products/look-04.png";
import look05 from "../assets/products/look-05.png";

export const products = Object.freeze([
  {
    id: "studio-look-01",
    name: "Studio Look 01",
    category: "editorial",
    priceCents: 8400,
    stock: 4,
    image: look01,
    alt: "Catalog image for Studio Look 01"
  },
  {
    id: "studio-look-02",
    name: "Studio Look 02",
    category: "daily",
    priceCents: 7200,
    stock: 6,
    image: look02,
    alt: "Catalog image for Studio Look 02"
  },
  {
    id: "studio-look-03",
    name: "Studio Look 03",
    category: "editorial",
    priceCents: 9600,
    stock: 3,
    image: look03,
    alt: "Catalog image for Studio Look 03"
  },
  {
    id: "studio-look-04",
    name: "Studio Look 04",
    category: "occasion",
    priceCents: 11200,
    stock: 2,
    image: look04,
    alt: "Catalog image for Studio Look 04"
  },
  {
    id: "studio-look-05",
    name: "Studio Look 05",
    category: "daily",
    priceCents: 6800,
    stock: 5,
    image: look05,
    alt: "Catalog image for Studio Look 05"
  }
]);

export const commercePolicy = Object.freeze({
  freeShippingThresholdCents: 15000,
  standardShippingCents: 1200
});
