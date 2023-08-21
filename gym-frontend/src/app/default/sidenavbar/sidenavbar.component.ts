import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sidenavbar',
  templateUrl: './sidenavbar.component.html',
  styleUrls: ['./sidenavbar.component.css']
})
export class SidenavbarComponent implements OnInit{

  constructor(private router:Router){}


  ngOnInit(): void {
    $(document).ready(function() {
      $('.data').click(function(this:any) {
        var nestedData = $(this).next('.nestedata');
        var dropdown = $(this).find('.dropdown');
    
        // Close Item 2 if it is open
        $('.data').not(this).next('.nestedata').slideUp();
        $('.data').not(this).find('.dropdown').removeClass('rotate');
    
        // Toggle visibility and rotation of current item
        nestedData.slideToggle();
        dropdown.toggleClass('rotate');
      });
    });
    $(document).ready(function() {
      $('.box').click(function(this:any) {
        var nestedData = $(this).next('.nestedata');
        var dropdown = $(this).find('.dropdown');
    
        // Close Item 2 if it is open
        $('.data').not(this).next('.nestedata').slideUp();
        $('.data').not(this).find('.dropdown').removeClass('rotate');
    
        // Toggle visibility and rotation of current item
        nestedData.slideToggle();
        dropdown.toggleClass('rotate');
      });
    });


    let signout = document.querySelector('.signout');
  

    signout?.addEventListener('click',()=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logged out!'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('CurrentLoginUser');
        this.router.navigate(['/'])
      }
    })


  
    })

    
  }


  





}
