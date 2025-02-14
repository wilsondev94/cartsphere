declare type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  quantity: number;
  price: number;
  selectedImg: SelectedImgType;
};

declare type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};
