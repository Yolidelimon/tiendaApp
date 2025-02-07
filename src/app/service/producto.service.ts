import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Producto } from "../models/producto.models";


@Injectable({
    providedIn: 'root'
})
export class ProductoService {
    private apiUrl = 'http://localhost:8080/productos/';

    constructor (
    private http: HttpClient) {}
    getProducto (): Observable <Producto[]>{
        return this.http.get<Producto[]>(this.apiUrl)
    }

    postProducto(producto:Producto):Observable<Producto>{
        return this.http.post<Producto>(this.apiUrl,producto)
    }

    deleteProducto(id: number): Observable<Producto>{
        return this.http.delete<Producto>(`${this.apiUrl}${id}`);
    }

    putProducto(producto:Producto):Observable<Producto>{
        return this.http.put<Producto>(`${this.apiUrl}${producto.id}`, producto);
        
    }
}

