import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  product = {
    productName: '',
    price: '',
    category: '',
    shortDesc: '',
    description: '',
  };
  file: string = '';
  select(e: any) {
    this.file = e.target.files[0];
  }
  constructor(
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  async createProduct() {
    let formData = new FormData();
    formData.append('file', this.file);
    formData.append('upload_preset', 'upload');
    await fetch('https://api.cloudinary.com/v1_1/dnw7or6mq/image/upload', {
      method: 'post',
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        const url = data.url;
        const newProduct = {
          ...this.product,
          imgUrl: url,
        };
        this.productService.createProduct(JSON.stringify(newProduct)).subscribe(
          (res) => {
            this.toastr.success('New product added');
            this.router.navigate(['/home']);
          },
          (err) => {
            console.log(err);
          }
        );
      });
  }
}
