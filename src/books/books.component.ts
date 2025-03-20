import { Component } from '@angular/core';
import { BookManagementService } from '../app/api/services/book-management.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-books',
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent {
  image: File | null = null;
  imageUrl: string | null = null;

  constructor(private bookManagementService: BookManagementService, private httpClient: HttpClient) {}

  // Při výběru souboru tlačítkem
  onFileSelected(event: any): void {
    var file: File = event.target.files[0];
    // Pokud je soubor nahraný
    if (file) {
      // Kontrola formátu
      if (file.type != 'image/jpeg') {
        // this.dialogService.openSnackBar('Obrázek musí mít JPG formát!');
        return;
      }
      // Přidání k přílohám
      this.image = file;
      this.imageUrl = URL.createObjectURL(file);
      // this.dialogService.openSnackBar('Obrázek ' + file.name + ' vybrán.');
    }
  }

  // Odstranění vybraného obrázku
  removeImage(): void {
    this.image = null;
    this.imageUrl = null;
  }

  // Vytvoření knihy
  createBook(): void {
    this.bookManagementService.createBook({body: {
      // TODO změnit
      authorId: 1,
      genreIds: [],
      isbn: 'TEST',
      name: 'TEST',
      price: 152,
      published: new Date().toISOString(),
      summary: 'TEST'
    }}).subscribe({
      next: (v) => {
        // TODO odstranit alert
        alert("Kniha vytvořena");
        // Pokud je nahrán obrázek
        if (this.image != null) {
          this.uploadImage(v.id);
        }
      },
      error: (e) => {
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }

  // Upload obrázku
  uploadImage(bookId: number): void {
    var formData = new FormData();
    formData.append('bookId', bookId.toString());
    formData.append('image', this.image!);
    this.httpClient.post(this.bookManagementService.rootUrl + '/api/book/management/bookImage', formData).subscribe({
      next: (_) => {
        // TODO odstranit alert
        alert("Obrázek nahrán");
      },
      error: (e) => {
        alert(JSON.stringify(e));
      },
      complete: () => { }
    });
  }
}
