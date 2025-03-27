export interface ProductEntity {
  id: string;
  nombre: string;
  precio_compra: number;
  stock: number;
  categoryId: string;
}

export interface CategoryEntity{
  id: string;
  name: string;
}