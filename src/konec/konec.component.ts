import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CartService } from '../app/api/services/cart.service';
import { ModelsAddress, ModelsBook, ModelsDiscount } from '../app/api/models';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddressService } from '../app/api/services/address.service';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DiscountService } from '../app/api/services/discount.service';
import { AuthService } from '../app/shared/auth.service';
import { MatSliderModule } from '@angular/material/slider';
import { OrderService } from '../app/api/services/order.service';
@Component({
    selector: 'app-konec',
    imports: [
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatCheckboxModule,
        MatSliderModule
    ],
    templateUrl: './konec.component.html',
    styleUrl: './konec.component.css'
})
export class KonecComponent implements OnInit {
    books: ModelsBook[] = [];
    totalPrice: number = 0;
    loading: boolean = false;
    addresses: ModelsAddress[] = [];
    selectedAddress: ModelsAddress | '' = '';
    showAddressForm: boolean = false;

    // firstName = new FormControl<string>('', [Validators.required]);
    // lastName = new FormControl<string>('', [Validators.required]);
    street = new FormControl<string | null>(null, [Validators.required]);
    // streetNumber = new FormControl<string>('', [Validators.required]);
    city = new FormControl<string | null>(null, [Validators.required]);
    psc = new FormControl<number | null>(null, [Validators.required]);
    // phoneNumber = new FormControl<string>('', [Validators.required]);
    // email = new FormControl<string>('', [Validators.required]);

    // TODO vymyslet nějaké podmínky a validaci slev slevy
    useDiscount: boolean = false;
    discounts: ModelsDiscount[] = [];
    selectedDiscount: ModelsDiscount | '' = '';
    minDiscountPoints: number = 100;
    discountPointValue: number = this.minDiscountPoints;

    constructor(private router: Router, public cartService: CartService, private addressService: AddressService, private discountService: DiscountService, public authService: AuthService, private orderService: OrderService) { }

    ngOnInit(): void {
        this.loadBooks();
        this.loadAddresses();
    }

    // Načte knihy do košíku
    loadBooks() {
        this.loading = true;
        this.cartService.getAllBooksInCart().subscribe({
            next: (v) => {
                this.books = v;
                this.loadDiscounts(false);
            },
            error: (e) => {
                alert(JSON.stringify(e));
                console.error(e);
                this.loading = false;
            },
            complete: () => {
                this.loading = false;
                this.calculateTotalPrice();
            }
        });
    }

    // Odstraní knihu z košíku
    removeBook(bookId: number) {
        this.cartService.removeBookFromCart({ id: bookId }).subscribe({
            next: () => {},
            error: (e) => {
                alert(JSON.stringify(e));
                console.error(e);
                this.loadBooks();
            },
            complete: () => {
                this.loadBooks();
            }
        });
    }

    // Přesměruje na stránku s knihou
    bookCardClicked(bookId: number) {
        this.router.navigate(['/book-detail'], { queryParams: { id: bookId } });
    }

    // Načte adresy zákazníka
    loadAddresses() {
        this.addressService.getAllCustomerAddresses().subscribe({
            next: (v) => {
                this.addresses = v;
                if (this.addresses.length == 0) {
                    this.showAddressForm = true;
                } else {
                    this.selectedAddress = this.addresses[this.addresses.length - 1];
                    this.showAddressForm = false;
                }
            },
            error: (e) => {
                alert(JSON.stringify(e));
                console.error(e);
            },
            complete: () => { }
        });
    }

    dropdownChanged(): void {
        if (this.selectedAddress == '') {
            this.showAddressForm = true;
        } else {
            this.showAddressForm = false;
        }
    }

    // Načte slevy zákazníka
    loadDiscounts(selectLastDiscount: boolean): void {
        this.discountService.getAllCustomerDiscounts().subscribe({
            next: (v) => {
                this.discounts = v;
                if (this.discounts.length != 0 && selectLastDiscount) {
                    this.selectedDiscount = this.discounts[this.discounts.length - 1];
                    this.calculateTotalPrice();
                }
            },
            error: (e) => {
                alert(JSON.stringify(e));
                console.error(e);
            },
            complete: () => { }
        });
    }

    // Vytvoří novou slevu
    createDiscount(): void {
        this.discountService.createDiscount({
            body: {
                pointPrice: this.discountPointValue
            }
        }).subscribe({
            next: (_) => { },
            error: (e) => {
                alert(JSON.stringify(e));
                console.error(e);
            },
            complete: () => {
                this.loadDiscounts(true);
            }
        });
    }

    // Tlačítko objednat
    orderButton(): void {
        // Kontrola adresy
        if (this.selectedAddress == '') {
            if (this.street.valid && this.city.valid && this.psc.valid) {
                this.addressService.createAddress({
                    body: {
                        city: this.city.value!,
                        postCode: this.psc.value!,
                        street: this.street.value!
                    }
                }).subscribe({
                    next: () => {
                        this.loadAddresses();
                    },
                    error: (e) => {
                        alert(JSON.stringify(e));
                        console.error(e);
                    },
                    complete: () => {
                        this.order();
                    }
                });
            }
        } else {
            this.order();
        }
    }

    // Objednávka
    order(): void {
        if (this.selectedAddress != '') {
            this.orderService.createOrder({
                body: {
                    addressId: this.selectedAddress.id,
                    discountId: this.selectedDiscount ? this.selectedDiscount.id : null
                }
            }).subscribe({
                next: () => {
                    // TODO udělat pohled na dokončení objednávky nebo tak něco
                    this.router.navigate(['/order-success']);
                },
                error: (e) => {
                    alert(JSON.stringify(e));
                    console.error(e);
                },
                complete: () => { }
            });
        } else {
            alert('Nejprve vyberte adresu');
        }
    }

    useDiscountChanged(): void {
        if (this.useDiscount) {
            this.selectedDiscount = this.discounts[this.discounts.length - 1]; 
        } else {
            this.selectedDiscount = '';
        }
        this.calculateTotalPrice();
    }

    // Vypočítá cenu objednávky
    calculateTotalPrice(): void {
        this.totalPrice = this.books.reduce((x, book) => x + book.price, 0);
        if (this.selectedDiscount != '') {
            this.totalPrice -= this.selectedDiscount.price;
        }
    }
}
