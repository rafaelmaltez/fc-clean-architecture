export default interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;
  changeName(newName: string): void
  changePrice(newPrice: number): void;
}
