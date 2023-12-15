import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ElementRef } from '@angular/core';
import { CartService } from '../services/cart.service';
import { MarketplaceItemType } from '../types/marketplace.type';
import { Subscription } from 'rxjs';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartItems: { item: MarketplaceItemType, quantity: number }[] = [];
  cartItemsSub!: Subscription;
  
  constructor(
    public cartService: CartService,
  ) {}

  removeItemFromCart(item: { item: MarketplaceItemType, quantity: number }): void {
    this.cartService.removeItem(item.item);
  }

  updateQuantity(item: { item: MarketplaceItemType, quantity: number }, newQuantity: number): void {
    if (newQuantity >= 0) {
      this.cartService.updateItemQuantity(item.item, newQuantity);
    }
  }

  ngOnInit(): void {
    this.cartItemsSub = this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
    });
  }

  ngOnDestroy(): void {
    this.cartItemsSub.unsubscribe();
  }
}

