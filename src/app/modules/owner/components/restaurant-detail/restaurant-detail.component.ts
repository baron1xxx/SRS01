import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Restaurant} from '../../../../models/Restaurant';
import {Host} from '../../../../enum/host.enum';
import {Subject} from 'rxjs';
import {Region} from '../../../../models/Region';
import {City} from '../../../../models/City';
import {Street} from '../../../../models/Street';
import {RestaurantService} from '../../../../services/restaurant.service';
import {AddressService} from '../../../../services/address.service';
import {ActivatedRoute} from '@angular/router';
import {debounceTime, switchMap, takeUntil, tap} from 'rxjs/operators';
import {API_Response} from '../../../../models/API_Response';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  public isUpdated = false;
  private openModal = false;

  public editRestaurant: FormGroup;
  private restaurant: Restaurant;
  private avatarHost = `${Host.API_HOST}/images/restaurants`;

  private errorMessage: string;
  private successMessage: string;

  private selectFile: File = null;

  private regions: Array<Region>;
  private selectedRegion = false;

  private cities: Array<City>;
  private selectedCity = false;


  private streets: Array<Street>;
  private selectedStreet = false;


  constructor(
    private restaurantService: RestaurantService,
    private addressService: AddressService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.editRestaurant = new FormGroup({
      name: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії\\s]+$')
        ]),
      description: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії\\s]+$')

        ]),
      tel: new FormControl(null,
        [
          Validators.required,
          Validators.pattern('^\\(?[\\d]{3}\\)?[\\s-]?[\\d]{3}[\\s-]?[\\d]{4}$')
        ]),
      region: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії\\s]+$')
        ]),
      city: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії\\s]+$')
        ]),
      street: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії\\s]+$')
        ]),
      houseNumber: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(5),
          Validators.pattern('^[a-z.A-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії0-9\\s]+$')
        ])
    });

    this.restaurantService.getRestaurantStatusListener()
      .pipe(
        switchMap(() => {
          return this.activatedRoute.params;
        }),
        switchMap(({id}: any) => {
          return this.restaurantService.getByID(id);
        })
      ).subscribe((restaurant: Restaurant) => {
      this.restaurant = restaurant;
      this.editRestaurant.setValue({
        name: restaurant.name,
        description: restaurant.description,
        tel: restaurant.tel,
        region: restaurant.address.region.region,
        city: restaurant.address.city.city,
        street: restaurant.address.street.street,
        houseNumber: restaurant.address.houseNumber.houseNumber
      });
    });

    this.getRegion();
    this.getCity();
    this.getStreet();
  }

  updateRestaurant(): void {
    console.log(this.editRestaurant.value);
    this.restaurantService.update(this.restaurant.id, this.editRestaurant.value).subscribe((data: API_Response) => {
        if (data.success) {
          this.isUpdated = true;
          this.successMessage = 'Restaurant successfully update';
          this.errorMessage = '';
        }
      },
      (e) => {
        console.log(e.error);
        this.errorMessage = e.error.msg.message || e.error.msg;
      });
  }

  updateRestaurantAvatar(): void {
    console.log(this.selectFile);
    const avatarFormData = new FormData();
    avatarFormData.append('avatar', this.selectFile);
    this.restaurantService.updateAvatar(this.restaurant.id, avatarFormData).subscribe((data: API_Response) => {
        if (data.success) {
          this.openModal = false;
        }
      },
      (e) => {
        console.log(e.error);
        this.errorMessage = e.error.msg.message || e.error.msg;
      });
  }


  getRegion(): void {
    this.editRestaurant.get('region').valueChanges
      .pipe(
        tap(() => {
          if (this.editRestaurant.get('region').dirty) {
            this.selectedRegion = true;
          }
          // console.log(this.editRestaurant.get('region').touched);
          // console.log('touched focus');
          // console.log(this.editRestaurant.get('region').untouched);
          // console.log('untouched not focus');
          // console.log(this.editRestaurant.get('region').dirty);
          // console.log('Initial value in the input field HAS BEEN changed');
          // console.log(this.editRestaurant.get('region').pristine);
          // console.log('Initial value in the input field HAS NOT BEEN changed');
        }),
        debounceTime(200),
        switchMap((region) => {
          return this.addressService.getRegion(region);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((regions: Array<Region>) => {
        console.log(regions);
        this.regions = regions;
      });
  }


  getCity(): void {
    this.editRestaurant.get('city').valueChanges
      .pipe(
        tap(() => {
          if (this.editRestaurant.get('city').dirty) {
            this.selectedCity = true;
          }
        }),
        debounceTime(200),
        switchMap((city) => {
          return this.addressService.getCity(this.restaurant.address.region.id, city);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((cities: Array<City>) => {
        console.log(cities);
        this.cities = cities;
      });
  }

  getStreet(): void {
    this.editRestaurant.get('street').valueChanges
      .pipe(
        tap(() => {
          if (this.editRestaurant.get('street').dirty) {
            this.selectedStreet = true;
          }
        }),
        debounceTime(200),
        switchMap((street) => {
          return this.addressService.getStreet(this.restaurant.address.region.id, this.restaurant.address.city.id, street);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((streets: Array<Street>) => {
        this.streets = streets;
      });
  }

  openModalUpdateAvatarForm(): void {
    this.openModal = true;
  }

  closeModalUpdateAvatarForm(): void {
    this.openModal = false;
  }

  selectRegion(region: Region): void {
    this.editRestaurant.patchValue({region: region.region});
    this.selectedRegion = false;
  }

  selectCity(city: City): void {
    this.editRestaurant.patchValue({city: city.city});
    this.selectedCity = false;
  }

  selectStreet(street: Street): void {
    this.editRestaurant.patchValue({street: street.street});
    this.selectedStreet = false;
  }

  UploadFile(event): void {
    this.selectFile = event.target.files[0];
    console.log(this.selectFile);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
