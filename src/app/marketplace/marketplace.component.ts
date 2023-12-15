import { Component } from '@angular/core';
import { MarketplaceItemListComponent } from './marketplace-item-list/marketplace-item-list.component';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [MarketplaceItemListComponent],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent {

}
