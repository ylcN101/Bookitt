export const getAllShopsMapper = (shops: any) =>
  shops.map((shop: any) => ({
    name: shop.name,
  }))

export const getShopMapper = (shop: any) => ({
  name: shop.name,
  location: shop.location,
  logo: shop.logo,
})
