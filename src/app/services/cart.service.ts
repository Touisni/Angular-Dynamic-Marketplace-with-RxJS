import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MarketplaceItemType } from '../types/marketplace.type';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartItems = new BehaviorSubject<Array<{ item: MarketplaceItemType, quantity: number }>>([]);

  constructor() { }

  getCartItems() {
    return this._cartItems;
  }

  addItem(item: MarketplaceItemType, quantity = 1) {
    const currentCartItems = this._cartItems.getValue();
    const existingItem = currentCartItems.find(i => i.item.id === item.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentCartItems.push({ item, quantity });
    }

    this._cartItems.next([...currentCartItems]);
  }

  removeItem(item: MarketplaceItemType) {
    const currentCartItems = this._cartItems.getValue();
    const updatedCartItems = currentCartItems.filter(i => i.item.id !== item.id);
    this._cartItems.next(updatedCartItems);
  }

  updateItemQuantity(item: MarketplaceItemType, quantity: number) {
    const currentCartItems = this._cartItems.getValue();
    const updatedCartItems = currentCartItems.map(cartItem => {
      return (cartItem.item.id === item.id) ? { ...cartItem, quantity } : cartItem;
    });

    this._cartItems.next([...updatedCartItems]);
  }
}
