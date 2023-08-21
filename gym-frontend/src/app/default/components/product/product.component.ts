import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductcategriesComponent } from './productcategries/productcategries.component';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ProductService } from './product.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  selectedFile: File | null = null;
  productnameFormControl = new FormControl('', [Validators.required]);
  categoryFormControl = new FormControl('', [Validators.required]);
  productcostFormControl = new FormControl('', [Validators.required]);
  productpriceFormControl = new FormControl('', [Validators.required]);
  taxFormControl = new FormControl('', [Validators.required]);
  taxmethodFormControl = new FormControl('', [Validators.required]);
  productPriceFormControl = new FormControl('', [Validators.required]);
  productQntFormControl = new FormControl('', [Validators.required]);
  productCostFormControl = new FormControl('', [Validators.required]);
  category: any;
  subcategory: any;
  brand: any;
  SelectedUser: any;
  statusMsg:any;
  matcher = new MyErrorStateMatcher();


  selectedcategary: any = '';
  subCategoryvr: any = '';
  selectedBrand: any = '';

  productForm!: FormGroup;
  selectedImage!: File;
data: any;


  constructor(public dialog: MatDialog, private productService: ProductService, private formBuilder: FormBuilder,private router:Router) {

    // this.productForm = this.formBuilder.group({
    //   productName: '',
    // });
  }
  formModule = new FormGroup({
    productName: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    subCategory: new FormControl("", [Validators.required]),
    brandId: new FormControl("", [Validators.required]),
    productCost: new FormControl("", [Validators.required]),
    productPrice: new FormControl("", [Validators.required]),
    tax: new FormControl("", [Validators.required]),
    taxMethod: new FormControl("", [Validators.required]),
    productQuantity: new FormControl("", [Validators.required]),
    productDescription: new FormControl("", [Validators.required]),
    productImage: new FormControl("", [Validators.required]),
  })


  // onImageSelected(event: any): void {
  //   this.selectedImage = event.target.files[0];
  // }

  addProductdata() {
    const formdata = new FormData();

    for (const controlName in this.formModule.controls) {
      if (this.formModule.controls.hasOwnProperty(controlName)) {
        const control = this.formModule.get(controlName);

        // Check if control value is not null or undefined
        if (control?.value !== null && control?.value !== undefined) {
          formdata.append(controlName, control.value);
        }
      }
    }

    formdata.forEach((value, key) => {
      console.log(key, value);
    });
    this.productService.getAddproduct(formdata).subscribe( {
      next: (user: any) =>  {
        this.statusMsg=user.message;
      },
      complete: () => {
        Swal.fire('Done',this.statusMsg,'success')
        .then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/jhjhkjhkjh']);
          }
        });
      },
      error: (err) => {
        var e=err
        var d = JSON.stringify(e);
        var x = JSON.parse(d);
        var s = JSON.stringify(x);

        Swal.fire('Oops','Something wrong "'+s+'"','error' );
      }
    });
  }

  ngOnInit(): void {
    this.getdata()
    this.getCategory();
    // this.getSubcategorie();

    // tabItems
    const tabItems = document.querySelectorAll('.btncontainer .btn');
    const tabContentItems = document.querySelectorAll('.tabcontent');

    function selectItem(this: any, e: any) {
      removeBorder();
      removeShow();
      this.classList.add('active');
      const tabContentItem = document.querySelector(`#${this.id}-content`);
      tabContentItem?.classList.add('show');
    }

    function removeBorder() {
      tabItems.forEach(item => {
        item.classList.remove('active');
      });
    }

    function removeShow() {
      tabContentItems.forEach(item => {
        item.classList.remove('show');
      });
    }

    tabItems.forEach(item => {
      item.addEventListener('click', selectItem);
    });
    // tabItems
  }


  openDialog() {
    this.dialog.open(ProductcategriesComponent, {
      height: '450px',
      width: '500px',
      data: {
        animal: 'panda',
      },
    });
  }

  getCategory() {
    this.productService.category().subscribe(res => {
      var d = JSON.stringify(res);
      var Scheme = JSON.parse(d);
      this.category = Scheme.categories;
    })
  }

  onCategorySelected() {
    // console.log("category selected--->",this.selectedcategary)
    this.productService.subcategory(this.selectedcategary).subscribe(res => {
      console.log("res-->", res)
      var d = JSON.stringify(res);
      var parse = JSON.parse(d);
      this.subcategory = parse.subcategories;
    })
  }

  subCategorymethod(selectedsubCategory: any) {
    console.log("selected sub categories--->", selectedsubCategory)
    console.log("brandIds---->", selectedsubCategory.brandIds)

    let val = {
      brandIds: selectedsubCategory.brandIds
    }

    this.productService.getBrand(val).subscribe(res => {
      console.log("bran res-->", res)
      var d = JSON.stringify(res);
      var parse = JSON.parse(d);
      this.brand = parse.data;
    })
  }

  disableSelect = new FormControl(false);

  displayedColumns: string[] = ['productName', 'productCost', 'productPrice', 'tax', 'taxMethod', 'productQuantity', 'productDescription'];
  dataSource = new MatTableDataSource();

  @ViewChild('paginator') paginator!: MatPaginator
  @ViewChild('MatSort') sort!: MatSort
  userlist:any;
  reporttList:any;
  getdata(){
    this.productService.getalldata().subscribe(res=>{
      // this.userlist = res;
      // this.dataSource = new MatTableDataSource(this.userlist)

      var d = JSON.stringify(res);
      this.reporttList = JSON.parse(d);
      var code = this.reporttList.message;
      if (code == "all products") {
        this.dataSource = new MatTableDataSource(this.reporttList.products)
        this.dataSource.paginator = this.paginator
        this.dataSource.sort = this.sort
      }
    })



  }

  onFileChange(event:Event){
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  uploadFile(){
    console.log("selected file--->",this.selectedFile)
    if (this.selectedFile) {
      this.productService.uploadBulkProducts(this.selectedFile).subscribe(
        response => {

          this.statusMsg=response.message
          console.log('Bulk upload and API call successful', response);
          Swal.fire('Done',this.statusMsg,'success')
          .then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['ProductComponent']);
            }
          });
          // Clear the selected file after successful upload
          this.selectedFile = null;
        },
        error => {
          console.error('Error during bulk upload and API call', error);
          // Handle error if needed
        }
      );
    }
  }


}
