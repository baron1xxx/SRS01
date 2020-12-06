import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnDestroy,
  OnInit,
  Type,
  ViewChild
} from '@angular/core';
import {InsertionDirective} from '../insertion.directive';
import {ModalRef} from '../modal-ref';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.css']
})
export class ModalContainerComponent implements OnInit, AfterViewInit, OnDestroy {

  public componentRef: ComponentRef<any>;
  public childComponentType: Type<any>;
  public idModal: string;

  @ViewChild(InsertionDirective, {static: false}) insertionPoint: InsertionDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private changeDetectorRef: ChangeDetectorRef,
    private modalRef: ModalRef,
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.loadChildComponent(this.childComponentType);
    this.changeDetectorRef.detectChanges();
  }

  loadChildComponent(componentType: Type<any>): void {
    // Створюємо фабрику дочірнько компонента.
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentType);

    // Очищаємо viewContainerRef.
    const viewContainerRef = this.insertionPoint.viewContainerRef;
    viewContainerRef.clear();

    // Створюємо компонент і вставляємо його DOM.
    this.componentRef = viewContainerRef.createComponent(componentFactory);
  }

  onDialogClicked(event: MouseEvent): void {
    // Зупиняє всплиття події (в нас це клік)
    event.stopPropagation();
  }

  onOverlayClicked(id: string): void {
    this.modalRef.close(id);
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }


}
