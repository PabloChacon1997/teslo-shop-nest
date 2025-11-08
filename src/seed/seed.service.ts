import { Injectable } from '@nestjs/common';
import { ProductsService } from 'src/products/products.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly productService: ProductsService) {}
  async runSeed() {
    await this.insertNewProducts();
    return 'Seeed executed';
  }

  private async insertNewProducts() {
    await this.productService.deleteAllProducts();
    const products = initialData.products;
    const insertPromises: any = [];
    console.log({ products });

    // products.forEach((product) => {
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    //   insertPromises.push(this.productService.create(product));
    // });

    await Promise.all(insertPromises);
    return true;
  }
}
