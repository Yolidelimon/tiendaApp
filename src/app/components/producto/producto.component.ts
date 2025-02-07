import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../../models/producto.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from "sweetalert2";
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-producto',
  standalone: false,
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {

@ViewChild ('modalContent') modalContent: any;
productos: Producto[]  = [];
isEdit: boolean = false;
nuevoProducto: Producto = {
  id: null,
  nombre: '',
  precio: null,
  descripcion: '',
  stock: null

};

  constructor(
    private productoService: ProductoService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.productoService.getProducto().subscribe(data => {
      this.productos = data;
    },
      (error: any) => {
        console.error('Error al obtener productos', error);
      });
  }

  openModal(producto?: Producto): void {
    if(producto) {
      this.isEdit = true;
      this.nuevoProducto = {...producto};
    } else {
      this.isEdit = false
      this.nuevoProducto = { id: null, nombre: '', precio: null, descripcion: '', stock: null };
    }
    const modalRef = this.modalService.open(this.modalContent, { ariaLabelledBy: 'modalCrearProductoLabel' });

    modalRef.result.finally(() => {
      const focusElement = document.getElementById('openModalButton');
      if (focusElement) {
        focusElement.focus();
      }
    });
  }

  createProducto() {
    this.productoService.postProducto(this.nuevoProducto).subscribe(data => {
      this.productos.push(data);
      Swal.fire({
        title: 'Producto creado',
        text: "Producto creado exitosamente",
        icon: 'success'
      });
      this.modalService.dismissAll();
    },
      (error: any) => {
        Swal.fire({
          title: 'Error!',
          text: 'Hubo un error al crear el producto: ' + error,
          icon: 'error'
        });
      });
  }
  updateProducto (): void {
    if (this.nuevoProducto.id !== null){
      this.productoService.putProducto(this.nuevoProducto).subscribe (resp =>{
        const index = this.productos.findIndex(a => a.id === this.nuevoProducto.id);
        if (index !== -1){
          this.productos[index] = resp;
        }
        Swal.fire ({
          title: 'Producto actualizado',
          text: "Producto Editado exitosamente",
          icon: 'success'
        });
        this.productos.sort();
        this.modalService.dismissAll();
      
      },(error: any ) =>{
        Swal.fire({
          title: 'Error!',
          text: 'Hubo un error al crear el producto: ' + error,
          icon: 'error'
      });
    });
  }else{

}}
deleteProducto(id: number) {
  Swal.fire({
    title: 'Eliminar producto',
    text: '¿Estás seguro que deseas eliminar el producto?',
    icon: 'question',
    showConfirmButton: true,
    showCancelButton: true
  }).then(resp => {
    if (resp.isConfirmed) {
      this.productoService.deleteProducto(id).subscribe(resp => {
        this.productos = this.productos.filter(a => a.id !== id);
        Swal.fire({
          title: 'Producto eliminado',
          text: "Producto eliminado exitosamente",
          icon: 'success'
        })
      }),
        (error: any) => {
          Swal.fire({
            title: 'Error!',
            text: 'Hubo un error al eliminar el producto: ' + error,
            icon: 'error'
          });
        }
    }
  })
}



}
