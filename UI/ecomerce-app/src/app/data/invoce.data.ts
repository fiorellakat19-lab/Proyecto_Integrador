import { Invoice } from "../models/invoce";

export const invoiceData: any={
 id:1,
 name:'Componentes de pc',
 numero: 'F001-001' ,
 cliente:{
      cliente_nombre: 'Manuel',
      cliente_ubicacion: 'Perú',
      cliente_direccion: 'Calle Los Pinos'
 },
  empresa:{
    empresa_nombre: 'DMC',
    empresa_ruc: 8888113
  },
  items:[
    {
      id:1,
      product:'CPU Intel Core',
      price:599,
      quantity:1

    },
    {
      id:2,
      product:'RAM DDR4',
      price:399,
      quantity:2


    },
     {
      id:3,
      product:'Storage SSD',
      price:899,
      quantity:3
    },
  ]

}
