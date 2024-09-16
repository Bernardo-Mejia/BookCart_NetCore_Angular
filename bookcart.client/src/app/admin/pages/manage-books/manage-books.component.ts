import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IBook } from '../../../home/interfaces/IBook.interface';
import { BookService } from '../../../home/services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { SnackbarService } from '../../../home/services/snack-bar.service';

@Component({
  selector: 'app-manage-books',
  templateUrl: './manage-books.component.html',
  styleUrl: './manage-books.component.css',
})
export class ManageBooksComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'category',
    'price',
    'operation',
  ];
  dataSource = new MatTableDataSource<IBook>();

  private unsubscribe$ = new Subject<void>();

  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  constructor(private dialog: MatDialog, private snackBarService: SnackbarService, private bookService: BookService) {}

  ngOnInit(): void {
    this.getAllBookData();
  }

  getAllBookData() {
    this.bookService
      .getAllBooks()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: IBook[]) => {
          this.dataSource.data = Object.values(data);
        },
        (error) => {
          console.log('Error ocurred while fetching book details : ', error);
        }
      );
  }

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  applyFilter(eventTarget: any) {
    const filterValue = eventTarget.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) { 
      this.dataSource.paginator.firstPage();
    }
  }

  deleteConfirm(id: number): void {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data: id,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((result) => {
        if (result === 1) {
          this.getAllBookData();
          this.snackBarService.showSnackBar('Data deleted successfully');
        } else {
          this.snackBarService.showSnackBar('Error occurred!! Try again');
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
