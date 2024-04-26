import { atom } from 'recoil';

export const cartState = atom({
  key: 'cartState',
  default: {},
});

export const totalPriceCartState = atom({
  key: 'totalPriceCartState',
  default: 0,
});