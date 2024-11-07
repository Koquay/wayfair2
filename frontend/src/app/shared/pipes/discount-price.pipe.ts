import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discountPrice',
  standalone: true
})
export class DiscountPricePipe implements PipeTransform {

  transform(price: number, discount:number): unknown {
    let discountPrice = price - (discount/100 * price)

    return '$' + discountPrice.toFixed(2);
}

}
