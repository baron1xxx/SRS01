import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Host} from '../../../../../enum/host.enum';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Menu} from '../../../../../models/Menu';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../../../../../services/menu.service';
import {switchMap} from 'rxjs/operators';
import {ModalService} from '../../../../../services/modal.service';
import {UpdateAvatarComponent} from '../../update-avatar/update-avatar.component';
import {ServicesRout} from '../../../../../enum/services-rout.enum';

@Component({
  selector: 'app-menu-detail',
  templateUrl: './menu-detail.component.html',
  styleUrls: ['./menu-detail.component.css']
})
export class MenuDetailComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();

  private avatarHost = `${Host.API_HOST}/images/restaurants`;

  private errorMessage: string;
  private successMessage: string;

  private selectFile: File = null;
  editMenu: FormGroup;

  private menu: Menu;

  constructor(
    private menuService: MenuService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService
  ) {
  }

  ngOnInit() {
    this.editMenu = new FormGroup({
      name: new FormControl(null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-z.A-ZА-ЩЬЮЯҐЄІЇа-щьюяґєії\\s]+$')
        ])
    });

    this.menuService.getMenuStatusListener()
      .pipe(
        switchMap(() => {
          return this.activatedRoute.params;
        }),
        switchMap(({id}: any) => {
          return this.menuService.getByID(id);
        })
      ).subscribe((menu: Menu) => {
      this.menu = menu;
      this.editMenu.setValue({
        name: menu.name,
      });
    });
  }

  ngOnDestroy(): void {
  }

  updateMenu() {
    console.log('Update menu');

  }

  openModalUpdateAvatarForm() {
    this.modalService.openModal(UpdateAvatarComponent, {
      data: {
        serviceRout: ServicesRout.MENU,
        serviceRoutId: this.menu.id
      }
    });

  }
}
