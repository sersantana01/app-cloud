import { MatPaginatorIntl } from '@angular/material';

const espanolRangeLabel = (page: number, pageSize: number, length: number) => {
 if (length == 0 || pageSize == 0) { return `0 de ${length}`; }
  length = Math.max(length, 0);

 const startIndex = page * pageSize;

 // If the start index exceeds the list length, do not try and fix the end index to the end.
 const endIndex = startIndex < length ?
     Math.min(startIndex + pageSize, length) :
     startIndex + pageSize;

 return `${startIndex + 1} - ${endIndex} de ${length}`;
}


export function getEspanolPaginatorIntl() {
   const paginatorIntl = new MatPaginatorIntl();
  
   paginatorIntl.itemsPerPageLabel = 'Datos por página:';
   paginatorIntl.nextPageLabel = 'Página siguiente';
   paginatorIntl.previousPageLabel = 'Página anterior';
   paginatorIntl.firstPageLabel ="Inicio";
   paginatorIntl.lastPageLabel = "Fin";
   paginatorIntl.getRangeLabel = espanolRangeLabel;
  
   return paginatorIntl;
}
 export const MY_FORMATS = {
   parse: {
     dateInput: 'LL',
   },
   display: {
     dateInput: 'DD/MM/YYYY',
     monthYearLabel: 'MMM/YYYY',
     dateA11yLabel: 'LL',
     monthYearA11yLabel: 'MMMM YYYY',
   },
 }


