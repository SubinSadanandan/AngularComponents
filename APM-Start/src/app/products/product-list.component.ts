import { Component, OnInit,AfterViewInit,ViewChild} from '@angular/core';

import { NgModel } from '@angular/forms';
import { CriteriaComponent } from '../shared/criteria/criteria.component';

import { IProduct } from './product';
import { ProductService } from './product.service';
import { ProductParameterService } from './product-parameter.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    //listFilter: string;
    //showImage: boolean;
    parentListFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    includeDetail: boolean = true;
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

   
    //@ViewChildren('filterElement,nameElement')
    //inputElementRefs: QueryList<ElementRef>;
    //@ViewChild(NgModel) filterInput: NgModel;

    private _listFilter: string;

    //get listFilter(): string {
    //  return this._listFilter;
    //}

    //set listFilter(value: string) {
    //  this._listFilter = value;
    //  this.performFilter(this.listFilter);
    //}


    filteredProducts: IProduct[];
    products: IProduct[];

    get showImage(): boolean {
      return this.productParameterService.showImage;
    }

    set showImage(value: boolean) {
      this.productParameterService.showImage = value;
    }

    constructor(private productService: ProductService,
      private productParameterService: ProductParameterService) { }

    ngAfterViewInit(): void {
      //this.filterElementRef.nativeElement.focus();

      //this.filterInput.valueChanges.subscribe(
      //  () => this.performFilter(this.listFilter)
      //);

      //this.filterElementRef.nativeElement.focus();
      this.parentListFilter = this.filterComponent.listFilter;
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
              this.products = products;
              this.filterComponent.listFilter =
                this.productParameterService.filterBy;
              //this.performFilter(this.parentListFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    //onFilterChange(filter: string): void {
    //  this.listFilter = filter;
    //  this.performFilter(this.listFilter);
    //}

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onValueChange(value: string): void {
      this.productParameterService.filterBy = value;
      this.performFilter(value);
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
