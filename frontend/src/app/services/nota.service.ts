import { Injectable, inject, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Nota {
  _id?: string;
  titulo: string;
  contenido: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/notas';

  //almacenar el arreglo de notas
  notas: WritableSignal<Nota[]> = signal<Nota[]>([]);

  // obtener todas las notas y guardarlas en la señal
  cargarNotas(): void {
    this.http.get<Nota[]>(this.apiUrl).subscribe({
      next: (data) => this.notas.set(data),
      error: (err) => console.error('Error al cargar notas:', err),
    });
  }

  // crear la nota y actualizar la señal local sin recargar pagina
  agregarNota(nuevaNota: Nota): void {
    this.http.post<Nota>(this.apiUrl, nuevaNota).subscribe({
      next: (notaGuardada) => {
        this.notas.update((notasActuales) => [...notasActuales, notaGuardada]);
      },
      error: (err) => console.error('Error al agregar nota:', err),
    });
  }
}
