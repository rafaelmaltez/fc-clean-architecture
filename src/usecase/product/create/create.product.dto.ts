export interface CreateProductInputDto {
  name: string;
  price: number;
  type: string;
}

export interface CreateProductOutputDto {
  id: string;
  name: string;
  price: number;
}