import {Component, OnInit} from '@angular/core';
import {ModalRef} from '../../../modal/modal-ref';
import {ModalConfig} from '../../../modal/modal-config';
import {MenuService} from '../../../../services/menu.service';
import {ServicesRout} from '../../../../enum/services-rout.enum';
import {API_Response} from '../../../../models/API_Response';
import {UpdateAvatarMenuGuard} from '../../../../services/guards/canDeactivate/menu/update-avatar-menu.guard';

@Component({
  selector: 'app-update-avatar',
  templateUrl: './update-avatar.component.html',
  styleUrls: ['./update-avatar.component.css']
})
export class UpdateAvatarComponent implements OnInit {
  public selectFile: File;
  private errorMessage = '';

  constructor(
    private modalRef: ModalRef,
    private modalConfig: ModalConfig,
    private menuService: MenuService,
    private updateAvatarMenuGuard: UpdateAvatarMenuGuard,
  ) {
  }

  ngOnInit() {
  }

  closeModal(): void {
    if (this.updateAvatarMenuGuard.canDeactivate(this)) {
      this.modalRef.close();
    }
  }

  updateAvatar() {
    const avatarFormData = new FormData();
    avatarFormData.append('avatar', this.selectFile);

    switch (this.modalConfig.data.serviceRout) {
      case ServicesRout.MENU:
        this.updateAvatarMenu(this.modalConfig.data.serviceRoutId, avatarFormData);
        break;
    }


  }

  UploadFile(event): void {
    this.selectFile = event.target.files[0];
  }

  updateAvatarMenu(menuId: number, avatarFormData: FormData): void {
    this.menuService.updateAvatar(menuId, avatarFormData).subscribe((data: API_Response) => {
      if (data.success) {
        this.modalRef.close();
      }
    },
      e => {
        console.log(e.error);
        this.errorMessage = e.error.msg.message || e.error.msg;
      });
  }
}
