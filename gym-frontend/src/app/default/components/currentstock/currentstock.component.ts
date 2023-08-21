import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  minamount: number;
  maxamount: number;
  panno: number;
  aadharno: number;
  city: string;
  state: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H',minamount:10,maxamount:100,panno:56454564,aadharno:879872133,city: 'Delhi',state: 'New Delhi',},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He',minamount:10,maxamount:100,panno:56454564,aadharno:879872133,city: 'Delhi',state: 'New Delhi',},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li',minamount:10,maxamount:100,panno:56454564,aadharno:879872133,city: 'Delhi',state: 'New Delhi',},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be',minamount:10,maxamount:100,panno:56454564,aadharno:879872133,city: 'Delhi',state: 'New Delhi',},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B',minamount:10,maxamount:100,panno:56454564,aadharno:879872133,city: 'Delhi',state: 'New Delhi',},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C',minamount:10,maxamount:100,panno:56454564,aadharno:879872133,city: 'Delhi',state: 'New Delhi',},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N',minamount:10,maxamount:100,panno:56454564,aadharno:879872133,city: 'Delhi',state: 'New Delhi',},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O',minamount:10,maxamount:100,panno:56454564,aadharno:879872133,city: 'Delhi',state: 'New Delhi',},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F',minamount:10,maxamount:100,panno:56454564,aadharno:879872133,city: 'Delhi',state: 'New Delhi',},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne',minamount:10,maxamount:100,panno:56454564,aadharno:879872133,city: 'Delhi',state: 'New Delhi',},
];
@Component({
  selector: 'app-currentstock',
  templateUrl: './currentstock.component.html',
  styleUrls: ['./currentstock.component.css']
})
export class CurrentstockComponent {

  
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','minamount','maxamount','panno','aadharno','city','state','action'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}
