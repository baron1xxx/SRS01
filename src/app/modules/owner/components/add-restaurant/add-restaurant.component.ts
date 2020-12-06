import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RestaurantService} from '../../../../services/restaurant.service';
import {Subject} from 'rxjs';
import {debounceTime, switchMap, takeUntil, tap} from 'rxjs/operators';
import {AddressService} from '../../../../services/address.service';
import {Region} from '../../../../models/Region';
import {City} from '../../../../models/City';
import {Street} from '../../../../models/Street';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  private errorMessage: string;
  private successMessage: string;

  private selectFile: File = null;

  private addRestaurant: FormGroup;

  private regions: Array<Region>;
  private selectedRegion = true;
  private region: Region;

  private cities: Array<City>;
  private selectedCity = true;
  private city: City;

  private streets: Array<Street>;
  private selectedStreet = true;
  private street: Street;


  constructor(
    private restaurantService: RestaurantService,
    private addressService: AddressService,
  ) {
  }

  ngOnInit() {

    this.addRestaurant = new FormGroup({
      name: new FormControl(null,
        [
          // Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(20),
          // Validators.pattern('^[a-zA-Z\\s]+$')
        ]),
      description: new FormControl(null,
        [
          // Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(20),
          // Validators.pattern('^[a-zA-Z\\s]+$')

        ]),
      tel: new FormControl(null,
        [
          // Validators.required,
          // Validators.pattern('^\\(?[\\d]{3}\\)?[\\s-]?[\\d]{3}[\\s-]?[\\d]{4}$')
        ]),
      region: new FormControl(null,
        [
          // Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(20),
          // Validators.pattern('^[a-zA-Z\\s]+$')
        ]),
      city: new FormControl(null,
        [
          // Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(20),
          // Validators.pattern('^[a-zA-Z\\s]+$')
        ]),
      street: new FormControl(null,
        [
          // Validators.required,
          // Validators.minLength(3),
          // Validators.maxLength(20),
          // Validators.pattern('^[a-zA-Z\\s]+$')
        ]),
      houseNumber: new FormControl(null,
        [
          // Validators.required,
          // Validators.minLength(1),
          // Validators.maxLength(5),
          // Validators.pattern('^[a-zA-Z0-9\\s]+$')
        ]),
      avatar: new FormControl(null,
        [
          // Validators.required,
        ])
    });

    this.getRegion();
    this.getCity();
    this.getStreet();
  }

  createRestaurant(): void {
    console.log(this.addRestaurant.value);
    const formData = new FormData();
    // Ітеруючись по властивостям обєкта addRestaurant: FormGroup, append-им їх у об'єкт FormData.
    Object.keys(this.addRestaurant.value).forEach(key => {
      formData.append(key, this.addRestaurant.value[key]);
    });
    this.restaurantService.create(formData).subscribe((restaurant) => {
        if (restaurant) {
          this.successMessage = 'Restaurant successfully created';
          this.errorMessage = '';
          this.addRestaurant.reset();
        }
      },
      (e) => {
        console.log(e.error);
        this.errorMessage = e.error.msg.message || e.error.msg;
      });
  }

  getRegion(): void {
    this.addRestaurant.get('region').valueChanges
      .pipe(
        tap(() => this.selectedRegion = true),
        debounceTime(200),
        switchMap((region) => {
          return this.addressService.getRegion(region);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((regions: Array<Region>) => {
        this.regions = regions;
      });
  }

  getCity(): void {
    this.addRestaurant.get('city').valueChanges
      .pipe(
        tap(() => this.selectedCity = true),
        debounceTime(200),
        switchMap((city) => {
          return this.addressService.getCity(this.region.id, city);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((cities: Array<City>) => {
        this.cities = cities;
      });
  }

  getStreet(): void {
    this.addRestaurant.get('street').valueChanges
      .pipe(
        tap(() => this.selectedStreet = true),
        debounceTime(200),
        switchMap((street) => {
          return this.addressService.getStreet(this.region.id, this.city.id, street);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((streets: Array<Street>) => {
        this.streets = streets;
      });
  }

  // При виборі файла сетеєм його в об'єкт addRestaurant: FormGroup.
  UploadFile(event): void {
    this.selectFile = event.target.files[0];
    this.addRestaurant.patchValue({avatar: this.selectFile});
  }

  // TODO mimeTypeValidator()!!!

  selectRegion(region: Region) {
    this.addRestaurant.patchValue({region: region.region});
    this.region = region;
    this.selectedRegion = false;
  }

  selectCity(city: City) {
    this.addRestaurant.patchValue({city: city.city});
    this.city = city;
    this.selectedCity = false;
  }

  selectStreet(street: Street) {
    this.addRestaurant.patchValue({street: street.street});
    this.street = street;
    this.selectedStreet = false;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
