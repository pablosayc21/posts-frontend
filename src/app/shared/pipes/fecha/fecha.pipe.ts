import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoFecha',
  standalone: true
})
export class FechaPipe implements PipeTransform {

  transform(value: string | null): string {
    if (!value) return "";
    const fecha = new Date(value);
    const dia = this.pad(fecha.getDate());
    const mes = this.pad(fecha.getMonth() + 1);
    const anio = fecha.getFullYear();
    const horas = this.pad(fecha.getHours());
    const minutos = this.pad(fecha.getMinutes());
    return `${dia}/${mes}/${anio} ${horas}:${minutos}`
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
  }

}
