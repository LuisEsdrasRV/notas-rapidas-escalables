import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotaService } from './services/nota.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  template: `
    <div class="container">
      <h1>Notas Rápidas</h1>

      <form class="nota-form" (ngSubmit)="guardarNota()">
        <input
          type="text"
          name="titulo"
          [(ngModel)]="titulo"
          placeholder="Título de la nota"
          required
        />
        <textarea
          name="contenido"
          [(ngModel)]="contenido"
          placeholder="Contenido de la nota (puedes usar Enter para saltos de línea)"
          rows="4"
          required
        ></textarea>
        <button type="submit">Guardar</button>
      </form>

      <div class="notas-grid">
        @for (nota of notaService.notas(); track nota._id || $index) {
          <div class="nota-card">
            <h3>{{ nota.titulo }}</h3>
            <p>{{ nota.contenido }}</p>
          </div>
        } @empty {
          <p class="empty-msg">No hay notas registradas aún.</p>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 850px;
        margin: 0 auto;
        padding: 2.5rem 1rem;
        font-family: system-ui, -apple-system, sans-serif;
      }

      h1 {
        text-align: center;
        color: #f8fafc;
        margin-bottom: 2rem;
        font-size: 2.25rem;
        letter-spacing: 0.5px;
      }

      .nota-form {
        display: flex;
        flex-direction: column;
        gap: 0.85rem;
        max-width: 500px;
        margin: 0 auto 2.5rem auto;
        background-color: #334155;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      }

      .nota-form input,
      .nota-form textarea {
        width: 100%;
        padding: 0.75rem 0.9rem;
        border: 1px solid #475569;
        border-radius: 6px;
        font-size: 1rem;
        font-family: inherit;
        background-color: #0f172a;
        color: #f8fafc;
        resize: vertical;
      }

      .nota-form input::placeholder,
      .nota-form textarea::placeholder {
        color: #94a3b8;
      }

      .nota-form input:focus,
      .nota-form textarea:focus {
        outline: 2px solid #38bdf8;
        border-color: transparent;
      }

      .nota-form button {
        padding: 0.75rem 1.25rem;
        background-color: #10b981;
        color: #ffffff;
        border: none;
        border-radius: 6px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .nota-form button:hover {
        background-color: #059669;
      }

      .notas-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 1.25rem;
      }

      .nota-card {
        background-color: #fef08a;
        padding: 1.25rem;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      }

      .nota-card h3 {
        margin: 0 0 0.6rem 0;
        color: #1e293b;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        padding-bottom: 0.4rem;
      }

      .nota-card p {
        margin: 0;
        color: #334155;
        white-space: pre-wrap;
        word-break: break-word;
        line-height: 1.5;
      }

      .empty-msg {
        text-align: center;
        color: #94a3b8;
        grid-column: 1 / -1;
      }
    `,
  ],
})
export class App implements OnInit {
  notaService = inject(NotaService);

  titulo = '';
  contenido = '';

  ngOnInit(): void {
    this.notaService.cargarNotas();
  }

  guardarNota(): void {
    if (!this.titulo.trim() || !this.contenido.trim()) return;

    this.notaService.agregarNota({
      titulo: this.titulo.trim(),
      contenido: this.contenido.trim(),
    });

    this.titulo = '';
    this.contenido = '';
  }
}
