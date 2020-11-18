import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/Book.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  constructor() {}

  emitBooks() {
    this.booksSubject.next(this.books);
  }
  saveBooks() {
    firebase
      .database()
      .ref('/books')
      .set(this.books);
  }
  getBooks() {
    firebase
      .database()
      .ref('/books')
      .on('value', data => {
        this.books = data.val() ? data.val() : [];
        this.emitBooks();
      });
  }
  getSingleBook(id: number) {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref('/books/' + id)
        .once('value')
        .then(
          data => {
            resolve(data.val());
          },
          error => {
            reject(error);
          }
        );
    });
  }
  createNewBook(newwbook) {
    this.books.push(newwbook);
    this.saveBooks();
    this.emitBooks();
  }
  removeBook(book: Book) {
    const bookIndexToRemove = this.books.findIndex(bookEl => {
      if (bookEl === book) {
        return true;
      }
    });
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooks();
    this.emitBooks();
  }
  uploadFile(file: File) {
    return new Promise((resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase
        .storage()
        .ref()
        .child('images/' + almostUniqueFileName + file.name)
        .put(file);
      upload.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Loading...');
        },
        error => {
          console.log('error in loading ' + error);
          reject();
        },
        () => {
          upload.snapshot.ref.getDownloadURL().then(downloadUrl => {
            console.log('Upload successful! (' + downloadUrl + ')');
            resolve(downloadUrl);
          });
        }
      );
    });
  }
}
