import { Component, OnInit } from '@angular/core';
import { SalelistService } from './salelist.service';
import Swal from 'sweetalert2';
import { error } from 'highcharts';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-saleslist',
  templateUrl: './saleslist.component.html',
  styleUrls: ['./saleslist.component.css']
})
export class SaleslistComponent implements OnInit {


  selectedOption: any;
  dropdownOptions: any[] = [];

  selectedProducts:any[]=[]
  arrayOfdata:any[]=[]

  currentValue: number = 0;
  statusmessage:any=''
  //activatedRoute: ActivatedRoute | null | undefined;

  increase(index: number) {
    this.arrayOfdata[index].number++;
    this.updateSelectedProducts()
  }

  decrease(index: number) {
    if (this.arrayOfdata[index].number > 0) {
      this.arrayOfdata[index].number--;
    }

    this.updateSelectedProducts()
  }




  constructor(private service:SalelistService,private router:Router,private activatedRoute: ActivatedRoute){}

  data:any;

  ngOnInit(): void {

    this.getproductdata()
    this.getstoreList()

  }



  updateSelectedProducts(): void {
    this.selectedProducts = this.arrayOfdata
      .filter(item => item.number > 0)
      .map(item => {
        return { productId: item.productId, quantity: item.number };
      });

    console.log('Selected Products:', this.selectedProducts);
  }
  getproductdata(){
    this.service.product().subscribe(res=>{
      for(let i=0; i<res.products.length;i++){
       // console.log("productId->",res.products[i]._id)
        this.arrayOfdata.push({
          productId:res.products[i]._id,
          plus:'+',
          number:0,
          minus:'-',
        })
      }
      let s = JSON.stringify(res);
      let p = JSON.parse(s)
      this.data = p.products
      console.warn(res);
    })

  }
  getstoreList(){
    this.service.getstores().subscribe(res=>{
      this.dropdownOptions=res.data
      // console.log("res--->", this.dropdownOptions)
    })
  }

  selectStore(store:any){
    this.selectedOption=store
    console.log("option selected-->",this.selectedOption)
  }

  assignProduct(){
    const  productToAssign={
      userId:this.selectedOption,
      products:this.selectedProducts
    }

    this.service.AssignProduct(productToAssign).subscribe(res=>{
      this.statusmessage=res.message
      console.log("res--->",res)
      Swal.fire('Done',this.statusmessage,'success')
      .then((result) => {
        if (result.isConfirmed) {
          this.arrayOfdata.forEach(item => {
            item.number = 0;
          });
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParamsHandling: 'preserve',
            fragment: 'reload'
          });
        }
      });
    },
    error=>{
      console.error('error during assigning product',error)
    }
    )
    //console.log("productToAssign--->",productToAssign)
  }




}
