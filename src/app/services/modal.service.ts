import {ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector, Type} from '@angular/core';
import {ModalContainerComponent} from '../modules/modal/modal-container/modal-container.component';
import {ModalConfig} from '../modules/modal/modal-config';
import {ModalInjector} from '../modules/modal/modal-injector';
import {ModalRef} from '../modules/modal/modal-ref';
import {v4 as uuidv4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  /*
  arrayModalComponentRef - масив в якому будуть зберігатися по idModalComponentRef (унікальний ID) modalComponentRef,
   щоб можна було відкривати декілька модальних вікон і закривати конкретне модальне вікно.
   */
  private arrayModalComponentRef: Array<ComponentRef<ModalContainerComponent>> = [];
  private idModalComponentRef = '';
  private idArray = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector
  ) {
  }

  openModal(componentType: Type<any>, modalConfig?: ModalConfig): ModalRef {
    const modalRef = this.appendModalComponentToBody(modalConfig);
    this.arrayModalComponentRef[this.idModalComponentRef].instance.childComponentType = componentType;
    this.arrayModalComponentRef[this.idModalComponentRef].instance.idModal = this.idModalComponentRef;
    return modalRef;
  }

  private appendModalComponentToBody(modalConfig: ModalConfig): ModalRef {
    /* Сетаємо ModalConfig i ModalRef у WeakMap і пізніше пристворенні екземпляра компонента ModalComponent,
* за допомою нашого інжектора (ModalInjector) реєструємо як залежність*/
    const map = new WeakMap();
    map.set(ModalConfig, modalConfig);
    // Створюємо ModalRef.
    const modalRef = new ModalRef();
    map.set(ModalRef, modalRef);

    // TODO Це мені тут не подобається. Потрібно винисти окремо!!!
    const sub = modalRef.afterClosed.subscribe((id) => {
      // Закриваємо модальне вікно.
      this.removeModalComponentFromBody(id);
      sub.unsubscribe();
    });


    const modalComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalContainerComponent);
    const modalComponentRef = modalComponentFactory.create(new ModalInjector(this.injector, map));

    // Нам потрібно вставити компонент в DOM.
    //  В нас нема ViewContainerRef, який містиь посилання на конкретний контейнер тому потрібно знайти кореневий елемент і приєднати туди.
    //  Для цього в нас є ApplicationRef - містить силку на наш додаток.

    // Host view - створює View компонета.
    // Embedded view - створює View шаблона.
    // Добавляємо наш View компонента до angular, визиваючи метод attachView.
    this.applicationRef.attachView(modalComponentRef.hostView);

    // Дістаємо кореневий DOM-елемент компонента ModalContainerComponent.
    const domElement = (modalComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

    // Вставляємо domElement нашого компонента в body.
    // В body, тому що модальне вікно буде по верх всіх остальних, а body точно буде завжди, бо він перший.
    document.body.appendChild(domElement);
    // this.modalComponentRef = modalComponentRef;

    // Генеруємо унікальний ID.
    this.generateModalComponentRefID();
    // Зберігаємо modalComponentRef в масив під унікальним ID.
    this.arrayModalComponentRef[this.idModalComponentRef] = modalComponentRef;
    return modalRef;
  }

  // Метод який відкріпляє та удаляє компонент при його закритті та видаляє ID.
  private removeModalComponentFromBody(id: string): void {
    this.applicationRef.detachView(this.arrayModalComponentRef[id].hostView);
    this.arrayModalComponentRef[id].destroy();
    delete this.arrayModalComponentRef[id];
    const index = this.idArray.indexOf(id);
    this.idArray.splice(index, 1);
  }

  private generateModalComponentRefID(): void {
    const strID = `${uuidv4()}-${uuidv4()}-${uuidv4()}${uuidv4()}`;
    while (this.idArray.includes(strID)) {
      this.generateModalComponentRefID();
    }
    this.idArray.push(strID);
    this.idModalComponentRef = strID;

  }


}
